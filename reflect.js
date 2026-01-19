#!/usr/bin/env node

/**
 * Reflect CLI
 * 
 * Analyze QA pipeline sessions and extract learnings.
 * 
 * Usage:
 *   node reflect.js                    # Reflect on last session
 *   node reflect.js --session <file>   # Reflect on specific log file
 *   node reflect.js --status           # Show knowledge base status
 *   node reflect.js --on               # Enable auto-reflect after pipelines
 *   node reflect.js --off              # Disable auto-reflect
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { reflectAgent } from './agents/reflectAgent.js';
import { knowledgeLoader } from './utils/knowledgeLoader.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_DIR = path.join(__dirname, 'knowledge');
const CONFIG_FILE = path.join(KNOWLEDGE_DIR, 'config.json');
const DEFAULT_LOG = path.join(__dirname, 'qa_pipeline.log');
const CHECKPOINT_DIR = path.join(__dirname, '.checkpoints');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    command: 'reflect', // default
    sessionFile: null,
    verbose: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--session' || arg === '-s') {
      options.command = 'reflect';
      options.sessionFile = args[++i];
    } else if (arg === '--status') {
      options.command = 'status';
    } else if (arg === '--on') {
      options.command = 'enable';
    } else if (arg === '--off') {
      options.command = 'disable';
    } else if (arg === '--help' || arg === '-h') {
      options.command = 'help';
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    }
  }

  return options;
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
🧠 Reflect CLI - Learn from QA sessions

Usage:
  node reflect.js                    Reflect on last QA session
  node reflect.js --session <file>   Reflect on specific log file
  node reflect.js --status           Show knowledge base status
  node reflect.js --on               Enable auto-reflect
  node reflect.js --off              Disable auto-reflect
  node reflect.js --help             Show this help

Options:
  --session, -s <file>   Path to QA pipeline log file
  --verbose, -v          Show detailed output
  --help, -h             Show help

Examples:
  node reflect.js                    # Analyze qa_pipeline.log
  node reflect.js --status           # See knowledge stats
  node reflect.js --session logs/qa_pipeline_20250106.log
`);
}

/**
 * Show knowledge base status
 */
async function showStatus() {
  console.log('\n📚 KNOWLEDGE BASE STATUS\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Get stats
  const stats = await knowledgeLoader.getStats();
  
  console.log('📁 Files:');
  console.log(`   Static (human-maintained): ${stats.staticFiles}`);
  console.log(`   Lesson files: ${stats.lessonFiles}`);
  console.log(`   Pattern files: ${stats.patternFiles}`);
  console.log('');
  
  console.log('📝 Content:');
  console.log(`   Total lessons learned: ${stats.totalLessons}`);
  console.log(`   Architecture decisions: ${stats.totalDecisions}`);
  console.log('');

  // Check config
  try {
    const config = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf-8'));
    const reflectEnabled = config.reflect?.enabled !== false;
    
    console.log('⚙️  Configuration:');
    console.log(`   Auto-reflect: ${reflectEnabled ? '✅ Enabled' : '❌ Disabled'}`);
    console.log(`   Mode: ${config.reflect?.mode || 'balanced'}`);
    console.log(`   Auto-approve: ${(config.reflect?.autoApprove || ['high']).join(', ')}`);
  } catch (error) {
    console.log('⚙️  Configuration: Using defaults');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Enable auto-reflect
 */
async function enableAutoReflect() {
  try {
    const config = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf-8'));
    config.reflect = config.reflect || {};
    config.reflect.enabled = true;
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('✅ Auto-reflect enabled');
    console.log('   Learnings will be extracted after each QA pipeline run.');
  } catch (error) {
    console.error('❌ Failed to update config:', error.message);
  }
}

/**
 * Disable auto-reflect
 */
async function disableAutoReflect() {
  try {
    const config = JSON.parse(await fs.readFile(CONFIG_FILE, 'utf-8'));
    config.reflect = config.reflect || {};
    config.reflect.enabled = false;
    await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log('✅ Auto-reflect disabled');
    console.log('   Run "node reflect.js" manually to extract learnings.');
  } catch (error) {
    console.error('❌ Failed to update config:', error.message);
  }
}

/**
 * Parse QA pipeline log to extract session data
 */
async function parseLogFile(logPath) {
  try {
    const content = await fs.readFile(logPath, 'utf-8');
    
    // Extract task results from log
    const tasks = [];
    const taskMatches = content.matchAll(/TASK (\d+)\/(\d+): (.+?)(?=TASK \d|$)/gs);
    
    for (const match of taskMatches) {
      const taskContent = match[0];
      const taskPath = match[3].trim();
      
      // Determine if passed
      const passed = taskContent.includes('Quality Gate: PASSED') || 
                     taskContent.includes('Saving approved code');
      
      // Count iterations
      const iterations = (taskContent.match(/QA PIPELINE - Iteration/g) || []).length;
      
      // Extract scores
      const scoreMatch = taskContent.match(/Overall Score: ([\d.]+)%/);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
      
      tasks.push({
        taskPath,
        passed,
        iterations: iterations || 1,
        scores: score ? { overall: score } : {},
        issues: []
      });
    }

    return {
      tasks,
      qaLogs: content,
      duration: null
    };
  } catch (error) {
    console.error(`Failed to parse log file: ${error.message}`);
    return null;
  }
}

/**
 * Try to load session data from checkpoint
 */
async function loadFromCheckpoint() {
  try {
    const checkpointPath = path.join(CHECKPOINT_DIR, 'qa-pipeline.json');
    const content = await fs.readFile(checkpointPath, 'utf-8');
    const checkpoint = JSON.parse(content);
    
    if (checkpoint.results && checkpoint.results.length > 0) {
      return {
        tasks: checkpoint.results,
        qaLogs: '',
        duration: null
      };
    }
  } catch (error) {
    // No checkpoint available
  }
  return null;
}

/**
 * Main reflect function
 */
async function reflect(options) {
  console.log('\n🧠 Starting reflection...\n');

  // Try to get session data
  let sessionData = null;

  // First try specified log file
  if (options.sessionFile) {
    console.log(`📄 Loading session from: ${options.sessionFile}`);
    sessionData = await parseLogFile(options.sessionFile);
  }
  
  // Try default log file
  if (!sessionData) {
    try {
      await fs.access(DEFAULT_LOG);
      console.log(`📄 Loading session from: qa_pipeline.log`);
      sessionData = await parseLogFile(DEFAULT_LOG);
    } catch (error) {
      // File doesn't exist
    }
  }

  // Try checkpoint
  if (!sessionData) {
    console.log('📌 Checking checkpoint...');
    sessionData = await loadFromCheckpoint();
  }

  if (!sessionData || sessionData.tasks.length === 0) {
    console.log('\n❌ No session data found.');
    console.log('   Run a QA pipeline first, or specify a log file with --session');
    return;
  }

  console.log(`\n✅ Found ${sessionData.tasks.length} tasks to analyze\n`);

  // Analyze the session
  const reflection = await reflectAgent.analyzeSession(sessionData);

  if (reflection.proposedUpdates.length === 0) {
    console.log('ℹ️  No new learnings extracted from this session.');
    console.log('   This could mean:');
    console.log('   • Code passed QA on first try (no corrections to learn from)');
    console.log('   • Lessons already exist in the knowledge base');
    return;
  }

  // Show approval UI
  await reflectAgent.showApprovalUI(reflection);
}

/**
 * Main
 */
async function main() {
  const options = parseArgs();

  switch (options.command) {
    case 'help':
      showHelp();
      break;
    case 'status':
      await showStatus();
      break;
    case 'enable':
      await enableAutoReflect();
      break;
    case 'disable':
      await disableAutoReflect();
      break;
    case 'reflect':
    default:
      await reflect(options);
      break;
  }
}

main().catch(console.error);
