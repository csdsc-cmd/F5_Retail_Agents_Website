/**
 * Knowledge Loader Utility
 * 
 * Loads relevant knowledge from the knowledge base for agent context injection.
 * Agents call this before generating/reviewing code to get project context,
 * lessons learned, and approved patterns.
 */

const fs = require('fs').promises;
const path = require('path');

const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');

class KnowledgeLoader {
  constructor() {
    this.config = null;
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Load the knowledge config file
   */
  async loadConfig() {
    if (this.config) return this.config;
    
    try {
      const configPath = path.join(KNOWLEDGE_DIR, 'config.json');
      const content = await fs.readFile(configPath, 'utf-8');
      this.config = JSON.parse(content);
      return this.config;
    } catch (error) {
      console.error('Error loading knowledge config:', error.message);
      // Return default config if file doesn't exist
      return {
        staticFiles: [
          'static/PROJECT_CONTEXT.md',
          'static/TECH_STACK.md',
          'static/CODING_STANDARDS.md'
        ],
        relevanceMapping: {
          general: {
            lessons: ['security.md', 'architecture.md'],
            patterns: ['error-handling.js']
          }
        }
      };
    }
  }

  /**
   * Read a file with caching
   */
  async readFile(filePath) {
    const fullPath = path.join(KNOWLEDGE_DIR, filePath);
    const cacheKey = fullPath;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.time < this.cacheExpiry) {
      return cached.content;
    }
    
    try {
      const content = await fs.readFile(fullPath, 'utf-8');
      this.cache.set(cacheKey, { content, time: Date.now() });
      return content;
    } catch (error) {
      console.warn(`Knowledge file not found: ${filePath}`);
      return null;
    }
  }

  /**
   * Load all static knowledge files (always included)
   */
  async loadStaticKnowledge() {
    const config = await this.loadConfig();
    const sections = [];
    
    for (const filePath of config.staticFiles) {
      const content = await this.readFile(filePath);
      if (content) {
        // Extract filename for section header
        const fileName = path.basename(filePath, '.md');
        sections.push(`### ${this.formatTitle(fileName)}\n\n${content}`);
      }
    }
    
    return sections.join('\n\n---\n\n');
  }

  /**
   * Load lessons relevant to a task type
   */
  async loadRelevantLessons(taskType = 'general') {
    const config = await this.loadConfig();
    const mapping = config.relevanceMapping[taskType] || config.relevanceMapping.general;
    
    if (!mapping || !mapping.lessons) {
      return '';
    }
    
    const sections = [];
    
    for (const lessonFile of mapping.lessons) {
      const content = await this.readFile(`learned/lessons/${lessonFile}`);
      if (content && !content.includes('No lessons yet')) {
        const domain = path.basename(lessonFile, '.md');
        sections.push(`#### ${this.formatTitle(domain)} Lessons\n\n${this.extractLessons(content)}`);
      }
    }
    
    if (sections.length === 0) {
      return '*No lessons learned yet for this domain.*';
    }
    
    return sections.join('\n\n');
  }

  /**
   * Load code patterns relevant to a task type
   */
  async loadPatterns(taskType = 'general') {
    const config = await this.loadConfig();
    const mapping = config.relevanceMapping[taskType] || config.relevanceMapping.general;
    
    if (!mapping || !mapping.patterns) {
      return '';
    }
    
    const maxPatterns = config.maxPatternsToInclude || 3;
    const sections = [];
    
    for (const patternFile of mapping.patterns.slice(0, maxPatterns)) {
      const content = await this.readFile(`learned/patterns/${patternFile}`);
      if (content) {
        const patternName = path.basename(patternFile);
        sections.push(`#### Pattern: ${patternName}\n\n\`\`\`javascript\n${this.trimPattern(content)}\n\`\`\``);
      }
    }
    
    if (sections.length === 0) {
      return '*No patterns defined yet.*';
    }
    
    return sections.join('\n\n');
  }

  /**
   * Load architecture decisions
   */
  async loadDecisions() {
    const content = await this.readFile('learned/decisions.md');
    if (!content || content.includes('No decisions recorded yet')) {
      return '*No architecture decisions recorded yet.*';
    }
    return this.extractDecisions(content);
  }

  /**
   * Main method: Load all knowledge for a task
   * 
   * @param {string} taskType - Type of task: 'frontend', 'backend', 'database', 'api', 'general'
   * @param {object} options - Additional options
   * @returns {string} Formatted knowledge for prompt injection
   */
  async loadKnowledge(taskType = 'general', options = {}) {
    const {
      includePatterns = true,
      includeDecisions = false,
      maxLength = 8000, // Prevent context overflow
    } = options;

    const sections = [];

    // Always load static knowledge
    const staticKnowledge = await this.loadStaticKnowledge();
    sections.push(`## Project Knowledge Base\n\n${staticKnowledge}`);

    // Load relevant lessons
    const lessons = await this.loadRelevantLessons(taskType);
    if (lessons) {
      sections.push(`## Lessons Learned (${taskType})\n\n${lessons}`);
    }

    // Optionally load patterns
    if (includePatterns) {
      const patterns = await this.loadPatterns(taskType);
      if (patterns) {
        sections.push(`## Approved Code Patterns\n\n${patterns}`);
      }
    }

    // Optionally load decisions
    if (includeDecisions) {
      const decisions = await this.loadDecisions();
      if (decisions) {
        sections.push(`## Architecture Decisions\n\n${decisions}`);
      }
    }

    let knowledge = sections.join('\n\n---\n\n');

    // Trim if too long
    if (knowledge.length > maxLength) {
      knowledge = knowledge.substring(0, maxLength) + '\n\n*[Knowledge truncated due to length]*';
    }

    return knowledge;
  }

  /**
   * Detect task type from file path
   */
  detectTaskType(filePath) {
    if (!filePath) return 'general';
    
    const normalized = filePath.toLowerCase();
    
    if (normalized.includes('frontend') || normalized.includes('component') || normalized.includes('.jsx')) {
      return 'frontend';
    }
    if (normalized.includes('model') || normalized.includes('migration') || normalized.includes('schema')) {
      return 'database';
    }
    if (normalized.includes('route') || normalized.includes('controller') || normalized.includes('api')) {
      return 'api';
    }
    if (normalized.includes('backend') || normalized.includes('server')) {
      return 'backend';
    }
    
    return 'general';
  }

  /**
   * Quick loader: Auto-detect task type from file path
   */
  async loadForFile(filePath, options = {}) {
    const taskType = this.detectTaskType(filePath);
    return this.loadKnowledge(taskType, options);
  }

  // ============================================
  // Helper Methods
  // ============================================

  formatTitle(str) {
    return str
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  extractLessons(content) {
    // Extract just the lessons section, skip the header/format description
    const lessonsMatch = content.match(/## Lessons\n\n([\s\S]*?)(?=\n<!--|\n---|\n\*Last|$)/);
    if (lessonsMatch) {
      const lessons = lessonsMatch[1].trim();
      if (lessons && !lessons.includes('No lessons yet')) {
        return lessons;
      }
    }
    return null;
  }

  extractDecisions(content) {
    // Extract just the decisions section
    const decisionsMatch = content.match(/## Decisions\n\n([\s\S]*?)(?=\n---|\n\*Last|$)/);
    if (decisionsMatch) {
      return decisionsMatch[1].trim();
    }
    return content;
  }

  trimPattern(content) {
    // Remove the header comment, keep the code
    const lines = content.split('\n');
    const codeStart = lines.findIndex(line => !line.startsWith(' *') && !line.startsWith('/*') && !line.startsWith('*/') && line.trim());
    if (codeStart > 0) {
      return lines.slice(codeStart).join('\n').trim();
    }
    return content.trim();
  }

  /**
   * Clear the cache (useful for testing or after knowledge updates)
   */
  clearCache() {
    this.cache.clear();
    this.config = null;
  }
}

// Export singleton instance
const knowledgeLoader = new KnowledgeLoader();

module.exports = {
  KnowledgeLoader,
  knowledgeLoader,
  
  // Convenience functions
  loadKnowledge: (taskType, options) => knowledgeLoader.loadKnowledge(taskType, options),
  loadForFile: (filePath, options) => knowledgeLoader.loadForFile(filePath, options),
  detectTaskType: (filePath) => knowledgeLoader.detectTaskType(filePath),
  clearKnowledgeCache: () => knowledgeLoader.clearCache(),
};
