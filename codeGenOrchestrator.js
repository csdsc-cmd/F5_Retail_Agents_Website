import dotenv from "dotenv";
dotenv.config();

import { codeGeneratorAgent } from "./agents/codeGeneratorAgent.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_PATH = "/Users/drewalexander/Desktop/pest-control-scheduler";
const PLAN_PATH = path.join(__dirname, "PROJECT_PLAN.md");

async function parseTasksFromPlan() {
  try {
    const planContent = await fs.readFile(PLAN_PATH, "utf-8");
    
    const tasks = [];
    const lines = planContent.split('\n');
    
    let currentPhase = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Detect phase
      if (line.match(/^## Phase \d+:/)) {
        currentPhase = line.replace('##', '').trim();
      }
      
      // Detect task
      if (line.match(/^### ✅ Task \d+:/)) {
        const taskTitle = line.replace(/### ✅ Task \d+:/, '').trim();
        
        // Extract task description and files
        let description = '';
        let filesToCreate = [];
        let filesToModify = [];
        
        // Look ahead for task details
        for (let j = i + 1; j < Math.min(i + 50, lines.length); j++) {
          const nextLine = lines[j];
          
          // Stop at next task
          if (nextLine.match(/^### ✅ Task \d+:/)) break;
          
          // Collect files to create
          if (nextLine.includes('**Files to Create:**')) {
            for (let k = j + 1; k < lines.length; k++) {
              if (lines[k].match(/^- `/)) {
                const file = lines[k].match(/`([^`]+)`/)?.[1];
                if (file) filesToCreate.push(file);
              } else if (lines[k].match(/^\*\*|^###/)) {
                break;
              }
            }
          }
          
          // Collect files to modify
          if (nextLine.includes('**Files to Modify:**')) {
            for (let k = j + 1; k < lines.length; k++) {
              if (lines[k].match(/^- `/)) {
                const file = lines[k].match(/`([^`]+)`/)?.[1];
                if (file) filesToModify.push(file);
              } else if (lines[k].match(/^\*\*|^###/)) {
                break;
              }
            }
          }
          
          // Collect actions
          if (nextLine.includes('**Actions:**')) {
            for (let k = j + 1; k < lines.length; k++) {
              if (lines[k].startsWith('- ')) {
                description += lines[k].replace(/^- /, '') + '\n';
              } else if (lines[k].match(/^\*\*|^###/)) {
                break;
              }
            }
          }
        }
        
        // Add tasks for each file
        const allFiles = [...filesToCreate, ...filesToModify];
        allFiles.forEach(filePath => {
          let fileType = 'javascript';
          if (filePath.endsWith('.jsx')) fileType = 'react';
          else if (filePath.endsWith('.css')) fileType = 'css';
          else if (filePath.endsWith('.ts')) fileType = 'typescript';
          else if (filePath.endsWith('.tsx')) fileType = 'react-typescript';
          else if (filePath.includes('/models/')) fileType = 'model';
          else if (filePath.includes('/routes/')) fileType = 'route';
          else if (filePath.includes('/controllers/')) fileType = 'controller';
          
          tasks.push({
            phase: currentPhase,
            title: taskTitle,
            description,
            filePath,
            fileType,
            action: filesToCreate.includes(filePath) ? 'create' : 'modify'
          });
        });
      }
    }
    
    return tasks;
  } catch (error) {
    console.error('Error parsing plan:', error.message);
    return [];
  }
}

async function generateCode(task) {
  console.log(`\n📝 ${task.action === 'create' ? 'Creating' : 'Modifying'}: ${task.filePath}`);
  
  const taskPrompt = `
${task.title}

${task.description}

File: ${task.filePath}
Action: ${task.action}
Phase: ${task.phase}
`;

  try {
    const code = await codeGeneratorAgent(taskPrompt, `Pest Control Scheduler - ${task.phase}`, task.fileType);
    
    // Save to project
    const fullPath = path.join(PROJECT_PATH, task.filePath);
    const dir = path.dirname(fullPath);
    
    // Create directory if needed
    await fs.mkdir(dir, { recursive: true });
    
    // Write file
    await fs.writeFile(fullPath, code, 'utf-8');
    
    console.log(`   ✅ Saved to ${task.filePath}`);
    return { success: true, file: task.filePath };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { success: false, file: task.filePath, error: error.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args[0]; // 'list', 'phase', 'all', 'task'
  const filter = args[1]; // phase name or task number
  
  console.log(`
╔══════════════════════════════════════════════╗
║                                              ║
║        💻 CODE GENERATOR ORCHESTRATOR 💻      ║
║                                              ║
╚══════════════════════════════════════════════╝
`);

  // Load tasks
  console.log('📖 Loading PROJECT_PLAN.md...');
  const tasks = await parseTasksFromPlan();
  
  if (tasks.length === 0) {
    console.error('❌ No tasks found in PROJECT_PLAN.md');
    console.error('   Make sure PROJECT_PLAN.md exists in the claude-agents directory');
    process.exit(1);
  }
  
  console.log(`   ✅ Found ${tasks.length} file generation tasks\n`);
  
  if (mode === 'list') {
    // List all phases
    const phases = [...new Set(tasks.map(t => t.phase))];
    console.log('📋 Available Phases:\n');
    phases.forEach((phase, i) => {
      const phaseTasks = tasks.filter(t => t.phase === phase);
      console.log(`${i + 1}. ${phase} (${phaseTasks.length} files)`);
    });
    return;
  }
  
  // Filter tasks
  let tasksToGenerate = tasks;
  
  if (mode === 'phase' && filter) {
    tasksToGenerate = tasks.filter(t => 
      t.phase.toLowerCase().includes(filter.toLowerCase()) ||
      t.title.toLowerCase().includes(filter.toLowerCase()) ||
      t.filePath.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (tasksToGenerate.length === 0) {
      console.log(`❌ No tasks found matching "${filter}"`);
      console.log('\nAvailable phases:');
      const phases = [...new Set(tasks.map(t => t.phase))];
      phases.forEach(phase => console.log(`  - ${phase}`));
      return;
    }
    
    console.log(`🎯 Filtered to ${tasksToGenerate.length} files for "${filter}"\n`);
  } else if (mode === 'all') {
    console.log(`🎯 Generating ALL ${tasksToGenerate.length} files\n`);
  } else if (!mode) {
    console.log('Usage:');
    console.log('  node codeGenOrchestrator.js list');
    console.log('  node codeGenOrchestrator.js phase "Frontend"');
    console.log('  node codeGenOrchestrator.js all');
    return;
  }
  
  // Show what will be generated
  console.log('Files to generate:');
  tasksToGenerate.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.action === 'create' ? '✨' : '📝'} ${t.filePath}`);
  });
  console.log('');
  
  // Generate code
  console.log(`🚀 Starting code generation...\n`);
  
  const results = [];
  for (let i = 0; i < tasksToGenerate.length; i++) {
    const task = tasksToGenerate[i];
    console.log(`[${i + 1}/${tasksToGenerate.length}]`);
    
    const result = await generateCode(task);
    results.push(result);
    
    // Small delay to avoid rate limits
    if (i < tasksToGenerate.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Summary
  console.log(`\n
╔══════════════════════════════════════════════╗
║          📊 GENERATION COMPLETE 📊           ║
╚══════════════════════════════════════════════╝
`);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Success: ${successful} files`);
  console.log(`❌ Failed: ${failed} files\n`);
  
  if (successful > 0) {
    console.log('📁 Generated Files:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   ✅ ${r.file}`);
    });
  }
  
  if (failed > 0) {
    console.log('\n❌ Failed Files:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ❌ ${r.file}: ${r.error}`);
    });
  }
  
  console.log('\n✨ Next steps:');
  console.log('   1. Review the generated files');
  console.log('   2. Test the changes');
  console.log('   3. Run the application\n');
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
