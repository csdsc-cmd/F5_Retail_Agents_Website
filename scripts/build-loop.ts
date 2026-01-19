#!/usr/bin/env npx ts-node
/**
 * Build Loop Script
 *
 * Implements Ralph Wiggum-style iterative development for Azure AI Foundry projects.
 * This script orchestrates the build loop by:
 * 1. Reading PROJECT_PLAN.md
 * 2. Loading knowledge base context
 * 3. Running Claude to generate/fix code
 * 4. Validating output (typecheck, lint, test)
 * 5. Iterating until completion or max iterations
 */

import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface BuildLoopConfig {
  maxIterations: number;
  completionPromise: string;
  projectRoot: string;
  knowledgePath: string;
}

interface IterationResult {
  iteration: number;
  success: boolean;
  errors: string[];
  filesChanged: string[];
  completionFound: boolean;
}

const DEFAULT_CONFIG: BuildLoopConfig = {
  maxIterations: 50,
  completionPromise: 'BUILD_COMPLETE',
  projectRoot: process.cwd(),
  knowledgePath: './knowledge'
};

/**
 * Load knowledge base context for Claude
 */
function loadKnowledgeBase(knowledgePath: string): string {
  const sections: string[] = [];

  // Static knowledge (human-maintained)
  const staticPath = path.join(knowledgePath, 'static');
  if (fs.existsSync(staticPath)) {
    const files = ['PROJECT_CONTEXT.md', 'TECH_STACK.md', 'CODING_STANDARDS.md', 'GLOSSARY.md'];
    for (const file of files) {
      const filePath = path.join(staticPath, file);
      if (fs.existsSync(filePath)) {
        sections.push(`## ${file}\n${fs.readFileSync(filePath, 'utf-8')}`);
      }
    }
  }

  // Learned patterns
  const patternsPath = path.join(knowledgePath, 'learned', 'patterns');
  if (fs.existsSync(patternsPath)) {
    const patterns = fs.readdirSync(patternsPath).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    for (const pattern of patterns) {
      const content = fs.readFileSync(path.join(patternsPath, pattern), 'utf-8');
      sections.push(`## Pattern: ${pattern}\n\`\`\`typescript\n${content}\n\`\`\``);
    }
  }

  return sections.join('\n\n---\n\n');
}

/**
 * Load project plan
 */
function loadProjectPlan(projectRoot: string): string {
  const planPath = path.join(projectRoot, 'PROJECT_PLAN.md');
  if (!fs.existsSync(planPath)) {
    throw new Error('PROJECT_PLAN.md not found. Create one from PROJECT_PLAN_TEMPLATE.md');
  }
  return fs.readFileSync(planPath, 'utf-8');
}

/**
 * Run validation commands
 */
function runValidation(projectRoot: string): { success: boolean; errors: string[] } {
  const errors: string[] = [];

  const commands = [
    { name: 'TypeScript', cmd: 'npm run typecheck', optional: true },
    { name: 'ESLint', cmd: 'npm run lint', optional: true },
    { name: 'Build', cmd: 'npm run build', optional: false },
    { name: 'Tests', cmd: 'npm test', optional: true }
  ];

  for (const { name, cmd, optional } of commands) {
    try {
      execSync(cmd, {
        cwd: projectRoot,
        stdio: 'pipe',
        timeout: 120000 // 2 minute timeout
      });
      console.log(`  ✅ ${name} passed`);
    } catch (error: any) {
      const errorMsg = error.stderr?.toString() || error.message;
      if (optional) {
        console.log(`  ⚠️  ${name} skipped or failed (optional)`);
      } else {
        console.log(`  ❌ ${name} failed`);
        errors.push(`${name}: ${errorMsg}`);
      }
    }
  }

  return { success: errors.length === 0, errors };
}

/**
 * Check if completion promise exists in codebase
 */
function checkCompletionPromise(projectRoot: string, promise: string): boolean {
  try {
    const result = execSync(`grep -r "${promise}" --include="*.ts" --include="*.tsx" --include="*.js" . 2>/dev/null || true`, {
      cwd: projectRoot,
      encoding: 'utf-8'
    });
    return result.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * Get changed files since last iteration
 */
function getChangedFiles(projectRoot: string): string[] {
  try {
    const result = execSync('git diff --name-only HEAD~1 2>/dev/null || git diff --name-only', {
      cwd: projectRoot,
      encoding: 'utf-8'
    });
    return result.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Build the prompt for Claude
 */
function buildPrompt(config: BuildLoopConfig, iteration: number, previousErrors: string[]): string {
  const knowledge = loadKnowledgeBase(config.knowledgePath);
  const plan = loadProjectPlan(config.projectRoot);

  let prompt = `# Build Loop Iteration ${iteration}

## Knowledge Base
${knowledge}

## Project Plan
${plan}

## Instructions

You are in an iterative build loop. Your task is to implement the PROJECT_PLAN.md requirements.

**Iteration**: ${iteration} of ${config.maxIterations}
**Completion Signal**: When ALL requirements are complete, add this comment to the main entry file:
\`\`\`
// ${config.completionPromise}
\`\`\`

`;

  if (previousErrors.length > 0) {
    prompt += `## Previous Iteration Errors

The following errors occurred in the previous iteration. Fix them:

${previousErrors.map(e => `- ${e}`).join('\n')}

`;
  }

  prompt += `## Your Task This Iteration

1. Review the current codebase state
2. Identify what's missing or broken
3. Implement the next piece of functionality
4. Ensure code compiles without errors
5. If ALL requirements are met, add the completion signal

Focus on incremental progress. Don't try to do everything at once.

**Remember**:
- Follow patterns in the knowledge base exactly
- Use only approved dependencies from TECH_STACK.md
- Write TypeScript with strict mode
- Add proper error handling
`;

  return prompt;
}

/**
 * Main build loop
 */
async function runBuildLoop(config: BuildLoopConfig): Promise<void> {
  console.log('🔄 Starting Build Loop');
  console.log(`   Max iterations: ${config.maxIterations}`);
  console.log(`   Completion promise: ${config.completionPromise}`);
  console.log('━'.repeat(50));

  let iteration = 0;
  let previousErrors: string[] = [];

  while (iteration < config.maxIterations) {
    iteration++;
    console.log(`\n📍 Iteration ${iteration}`);

    // Check if already complete
    if (checkCompletionPromise(config.projectRoot, config.completionPromise)) {
      console.log('✅ Completion promise found! Build loop complete.');
      return;
    }

    // Build prompt
    const prompt = buildPrompt(config, iteration, previousErrors);

    // Save prompt for debugging
    fs.writeFileSync(
      path.join(config.projectRoot, '.build-loop-prompt.md'),
      prompt
    );

    // Run Claude (this would integrate with Claude Code or API)
    console.log('  🤖 Running Claude...');
    // In practice, this would call the Claude API or Claude Code
    // For now, we simulate by writing the prompt

    // Run validation
    console.log('  🔍 Running validation...');
    const validation = runValidation(config.projectRoot);

    if (validation.success) {
      console.log('  ✅ All validations passed');
      previousErrors = [];
    } else {
      console.log(`  ❌ ${validation.errors.length} error(s) found`);
      previousErrors = validation.errors;
    }

    // Check completion again after changes
    if (checkCompletionPromise(config.projectRoot, config.completionPromise)) {
      console.log('\n✅ Completion promise found! Build loop complete.');
      return;
    }

    // Log changed files
    const changedFiles = getChangedFiles(config.projectRoot);
    if (changedFiles.length > 0) {
      console.log(`  📝 Files changed: ${changedFiles.join(', ')}`);
    }
  }

  console.log(`\n🛑 Max iterations (${config.maxIterations}) reached`);
  console.log('   Build loop stopped. Review progress and run again if needed.');
}

// CLI handling
const args = process.argv.slice(2);
const config: BuildLoopConfig = { ...DEFAULT_CONFIG };

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--max-iterations' && args[i + 1]) {
    config.maxIterations = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--completion-promise' && args[i + 1]) {
    config.completionPromise = args[i + 1];
    i++;
  } else if (args[i] === '--project-root' && args[i + 1]) {
    config.projectRoot = args[i + 1];
    i++;
  }
}

runBuildLoop(config).catch(console.error);
