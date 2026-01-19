/**
 * Reflect Agent
 * 
 * Analyzes QA pipeline sessions to extract learnings.
 * Updates the knowledge base with new lessons.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');

// Confidence levels for learnings
const CONFIDENCE = {
  HIGH: 'high',     // Explicit corrections, QA failures that got fixed
  MEDIUM: 'medium', // Patterns that worked well, passed first try
  LOW: 'low'        // Observations, minor warnings
};

// Domain categories for lessons
const DOMAINS = {
  security: 'security',
  architecture: 'architecture', 
  frontend: 'frontend',
  backend: 'backend',
  database: 'database'
};

export class ReflectAgent {
  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  /**
   * Main entry point - analyze a session and extract learnings
   */
  async analyzeSession(sessionData) {
    const { tasks, qaLogs, duration } = sessionData;
    
    // Build a summary of what happened
    const sessionSummary = this.buildSessionSummary(tasks);
    
    // Use Claude to extract learnings from the session
    const learnings = await this.extractLearnings(sessionSummary, qaLogs);
    
    // Categorize learnings by domain
    const categorized = this.categorizeLearnings(learnings);
    
    // Check for conflicts with existing knowledge
    const conflicts = await this.detectConflicts(categorized);
    
    return {
      summary: sessionSummary,
      learnings: categorized,
      conflicts,
      proposedUpdates: this.generateUpdates(categorized)
    };
  }

  /**
   * Build a summary of the session from task results
   */
  buildSessionSummary(tasks) {
    const summary = {
      totalTasks: tasks.length,
      passedFirstTry: 0,
      requiredRework: 0,
      failedAllAttempts: 0,
      corrections: [],
      successes: []
    };

    for (const task of tasks) {
      if (task.passed) {
        if (task.iterations === 1) {
          summary.passedFirstTry++;
          summary.successes.push({
            file: task.taskPath,
            scores: task.scores,
            iteration: 1
          });
        } else {
          summary.requiredRework++;
          summary.corrections.push({
            file: task.taskPath,
            iterations: task.iterations,
            scores: task.scores,
            issues: task.issues || []
          });
        }
      } else {
        summary.failedAllAttempts++;
      }
    }

    return summary;
  }

  /**
   * Use Claude to extract learnings from the session
   */
  async extractLearnings(sessionSummary, qaLogs) {
    const prompt = `Analyze this QA pipeline session and extract learnings.

## SESSION SUMMARY
- Total tasks: ${sessionSummary.totalTasks}
- Passed first try: ${sessionSummary.passedFirstTry}
- Required rework: ${sessionSummary.requiredRework}
- Failed all attempts: ${sessionSummary.failedAllAttempts}

## CORRECTIONS MADE (code was fixed after QA failed)
${JSON.stringify(sessionSummary.corrections, null, 2)}

## SUCCESSES (passed first try)
${JSON.stringify(sessionSummary.successes, null, 2)}

## QA LOGS
${qaLogs || 'No detailed logs available'}

---

Extract learnings from this session. For each learning:
1. Determine if it's a mistake to avoid (❌) or a pattern to follow (✅)
2. Assign confidence: HIGH (explicit fix), MEDIUM (pattern worked), LOW (observation)
3. Categorize: security, architecture, frontend, backend, or database
4. Write a clear, actionable rule

OUTPUT FORMAT (JSON only):
{
  "learnings": [
    {
      "type": "avoid|follow",
      "confidence": "high|medium|low",
      "domain": "security|architecture|frontend|backend|database",
      "title": "Short title (e.g., 'SQL Injection Risk')",
      "rule": "What to do or not do",
      "reason": "Why this matters",
      "example": "Code example if applicable (optional)",
      "source": "Which file/task this came from"
    }
  ]
}

Return ONLY valid JSON. Focus on actionable, specific learnings. Avoid generic advice.`;

    try {
      const response = await this.client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 3000,
        system: "You are a learning extraction specialist. Analyze development sessions and extract specific, actionable lessons. Return ONLY valid JSON.",
        messages: [{ role: "user", content: prompt }]
      });

      const text = response.content[0].text.trim();
      
      // Parse JSON response
      try {
        const result = JSON.parse(text);
        return result.learnings || [];
      } catch {
        // Try to extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return result.learnings || [];
        }
        return [];
      }
    } catch (error) {
      console.error('Failed to extract learnings:', error.message);
      return [];
    }
  }

  /**
   * Categorize learnings by domain
   */
  categorizeLearnings(learnings) {
    const categorized = {
      high: [],
      medium: [],
      low: []
    };

    for (const learning of learnings) {
      const confidence = learning.confidence || CONFIDENCE.LOW;
      if (categorized[confidence]) {
        categorized[confidence].push(learning);
      } else {
        categorized.low.push(learning);
      }
    }

    return categorized;
  }

  /**
   * Check for conflicts with existing knowledge
   */
  async detectConflicts(categorized) {
    const conflicts = [];
    const allLearnings = [
      ...categorized.high,
      ...categorized.medium,
      ...categorized.low
    ];

    for (const learning of allLearnings) {
      const domain = learning.domain || 'backend';
      const lessonFile = path.join(KNOWLEDGE_DIR, 'learned', 'lessons', `${domain}.md`);
      
      try {
        const existing = await fs.readFile(lessonFile, 'utf-8');
        
        // Check if similar lesson exists (simple keyword match)
        const title = learning.title.toLowerCase();
        if (existing.toLowerCase().includes(title)) {
          conflicts.push({
            learning,
            existingFile: `lessons/${domain}.md`,
            reason: 'Similar lesson may already exist'
          });
        }
      } catch {
        // File doesn't exist, no conflict
      }
    }

    return conflicts;
  }

  /**
   * Generate proposed updates to knowledge files
   */
  generateUpdates(categorized) {
    const updates = [];

    const allLearnings = [
      ...categorized.high.map(l => ({ ...l, confidence: 'high' })),
      ...categorized.medium.map(l => ({ ...l, confidence: 'medium' })),
      ...categorized.low.map(l => ({ ...l, confidence: 'low' }))
    ];

    for (const learning of allLearnings) {
      const domain = learning.domain || 'backend';
      const icon = learning.type === 'avoid' ? '❌' : '✅';
      
      const content = `
## ${icon} ${learning.title}
**Rule:** ${learning.rule}
**Reason:** ${learning.reason}
${learning.example ? `**Example:** \`${learning.example}\`` : ''}
**Learned:** ${new Date().toISOString().split('T')[0]} from ${learning.source || 'QA session'}
`;

      updates.push({
        file: `learned/lessons/${domain}.md`,
        content: content.trim(),
        learning,
        confidence: learning.confidence
      });
    }

    return updates;
  }

  /**
   * Apply learnings to knowledge files
   */
  async applyLearnings(reflection, options = {}) {
    const { autoApprove = ['high'], skipConfirm = false } = options;
    const applied = [];
    const skipped = [];

    for (const update of reflection.proposedUpdates) {
      const shouldAuto = autoApprove.includes(update.confidence);
      
      if (shouldAuto || skipConfirm) {
        // Auto-apply
        await this.appendToLessonFile(update.file, update.content);
        applied.push(update);
      } else {
        skipped.push(update);
      }
    }

    return { applied, skipped };
  }

  /**
   * Append content to a lesson file
   */
  async appendToLessonFile(relativeFile, content) {
    const filePath = path.join(KNOWLEDGE_DIR, relativeFile);
    
    try {
      let existing = await fs.readFile(filePath, 'utf-8');
      
      // Remove the "No lessons yet" placeholder if present
      existing = existing.replace(/\*No lessons yet\.[^*]*\*/, '');
      
      // Append new content before any comments at the end
      const commentStart = existing.lastIndexOf('<!--');
      if (commentStart > -1) {
        existing = existing.slice(0, commentStart).trim();
      }
      
      const updated = existing.trim() + '\n\n' + content + '\n';
      await fs.writeFile(filePath, updated, 'utf-8');
      
      return true;
    } catch (error) {
      console.error(`Failed to update ${relativeFile}:`, error.message);
      return false;
    }
  }

  /**
   * Show approval UI for learnings
   */
  async showApprovalUI(reflection) {
    const { learnings, proposedUpdates, conflicts } = reflection;
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                  🧠 SESSION REFLECTION                    ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');
    
    console.log(`📊 Session Summary:`);
    console.log(`   Total learnings extracted: ${proposedUpdates.length}`);
    console.log(`   High confidence: ${learnings.high.length}`);
    console.log(`   Medium confidence: ${learnings.medium.length}`);
    console.log(`   Low confidence: ${learnings.low.length}`);
    console.log('');

    // Show high confidence learnings
    if (learnings.high.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔴 HIGH CONFIDENCE (will be auto-applied)\n');
      
      for (let i = 0; i < learnings.high.length; i++) {
        const l = learnings.high[i];
        const icon = l.type === 'avoid' ? '❌' : '✅';
        console.log(`  ${i + 1}. [${l.domain.toUpperCase()}] ${icon} ${l.title}`);
        console.log(`     Rule: ${l.rule}`);
        console.log(`     Source: ${l.source || 'QA session'}`);
        console.log('');
      }
    }

    // Show medium confidence learnings
    if (learnings.medium.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🟡 MEDIUM CONFIDENCE (requires approval)\n');
      
      for (let i = 0; i < learnings.medium.length; i++) {
        const l = learnings.medium[i];
        const icon = l.type === 'avoid' ? '❌' : '✅';
        console.log(`  ${i + 1}. [${l.domain.toUpperCase()}] ${icon} ${l.title}`);
        console.log(`     Rule: ${l.rule}`);
        console.log(`     Source: ${l.source || 'QA session'}`);
        console.log('');
      }
    }

    // Show low confidence learnings
    if (learnings.low.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🟢 LOW CONFIDENCE (logged only)\n');
      
      for (let i = 0; i < learnings.low.length; i++) {
        const l = learnings.low[i];
        console.log(`  ${i + 1}. [${l.domain.toUpperCase()}] ${l.title}`);
      }
      console.log('');
    }

    // Show conflicts
    if (conflicts.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('⚠️  POTENTIAL CONFLICTS\n');
      
      for (const c of conflicts) {
        console.log(`  • "${c.learning.title}" may conflict with ${c.existingFile}`);
        console.log(`    Reason: ${c.reason}`);
      }
      console.log('');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Actions:');
    console.log('  [Y] Apply high confidence + approved medium');
    console.log('  [H] Apply only high confidence');
    console.log('  [A] Apply all (including low)');
    console.log('  [N] Skip all');
    console.log('');

    // Get user input
    const answer = await this.prompt('Choice: ');
    
    let applied = [];
    let skipped = [];
    
    switch (answer.toUpperCase()) {
      case 'Y':
        // Apply high auto, ask for medium
        const highResult = await this.applyLearnings(reflection, { 
          autoApprove: ['high'],
          skipConfirm: true 
        });
        applied = highResult.applied;
        
        // Ask about each medium
        for (const update of reflection.proposedUpdates.filter(u => u.confidence === 'medium')) {
          const approve = await this.prompt(`Apply "${update.learning.title}"? [y/n]: `);
          if (approve.toLowerCase() === 'y') {
            await this.appendToLessonFile(update.file, update.content);
            applied.push(update);
          } else {
            skipped.push(update);
          }
        }
        break;
        
      case 'H':
        const result = await this.applyLearnings(reflection, { 
          autoApprove: ['high'],
          skipConfirm: true 
        });
        applied = result.applied;
        skipped = result.skipped;
        break;
        
      case 'A':
        const allResult = await this.applyLearnings(reflection, { 
          autoApprove: ['high', 'medium', 'low'],
          skipConfirm: true 
        });
        applied = allResult.applied;
        break;
        
      case 'N':
      default:
        skipped = reflection.proposedUpdates;
        break;
    }

    // Show result
    console.log('\n✅ Reflection complete:');
    console.log(`   Applied: ${applied.length} learnings`);
    console.log(`   Skipped: ${skipped.length} learnings`);
    
    if (applied.length > 0) {
      console.log('\n   Updated files:');
      const files = [...new Set(applied.map(a => a.file))];
      for (const file of files) {
        console.log(`   • knowledge/${file}`);
      }
    }

    return { applied, skipped };
  }

  /**
   * Simple prompt helper
   */
  prompt(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    return new Promise(resolve => {
      rl.question(question, answer => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

// Export singleton
export const reflectAgent = new ReflectAgent();
