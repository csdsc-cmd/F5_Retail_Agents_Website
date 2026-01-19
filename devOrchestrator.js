import { codeReviewAgent } from "./agents/codeReviewAgent.js";
import { featureAgent } from "./agents/featureAgent.js";
import { bugFixAgent } from "./agents/bugFixAgent.js";
import { architectureAgent } from "./agents/architectureAgent.js";
import { testingAgent } from "./agents/testingAgent.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

const PROJECT_PATH = "/Users/drewalexander/Desktop/pest-control-scheduler";

// Helper to read file content
async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    return `Error reading file: ${error.message}`;
  }
}

// Helper to get project structure
async function getProjectStructure(dir, prefix = "", depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return "";
  
  let structure = "";
  try {
    const items = await fs.readdir(dir, { withFileTypes: true });
    
    for (const item of items) {
      // Skip node_modules and .git
      if (item.name === "node_modules" || item.name === ".git") continue;
      
      structure += `${prefix}${item.isDirectory() ? "📁" : "📄"} ${item.name}\n`;
      
      if (item.isDirectory() && depth < maxDepth) {
        const subDir = path.join(dir, item.name);
        structure += await getProjectStructure(subDir, prefix + "  ", depth + 1, maxDepth);
      }
    }
  } catch (error) {
    structure += `${prefix}Error: ${error.message}\n`;
  }
  
  return structure;
}

// === WORKFLOW 1: Code Review ===
async function reviewCodeWorkflow(filePath) {
  console.log("🔍 Starting Code Review Workflow...\n");
  
  const fullPath = path.join(PROJECT_PATH, filePath);
  const code = await readFile(fullPath);
  
  console.log("Running Code Review Agent...");
  const review = await codeReviewAgent(code, filePath);
  
  console.log("\n=== CODE REVIEW RESULTS ===\n");
  console.log(review);
  
  return review;
}

// === WORKFLOW 2: Feature Implementation ===
async function featureImplementationWorkflow(featureDescription) {
  console.log("🚀 Starting Feature Implementation Workflow...\n");
  
  console.log("Analyzing Project Architecture...");
  const structure = await getProjectStructure(PROJECT_PATH);
  
  console.log("\nGenerating Feature Implementation Plan...");
  const implementation = await featureAgent(featureDescription, structure);
  
  console.log("\n=== FEATURE IMPLEMENTATION PLAN ===\n");
  console.log(implementation);
  
  return implementation;
}

// === WORKFLOW 3: Bug Fix ===
async function bugFixWorkflow(bugDescription, relevantFilePath) {
  console.log("🐛 Starting Bug Fix Workflow...\n");
  
  const fullPath = path.join(PROJECT_PATH, relevantFilePath);
  const code = await readFile(fullPath);
  
  console.log("Analyzing Bug...");
  const fix = await bugFixAgent(bugDescription, code);
  
  console.log("\n=== BUG FIX SOLUTION ===\n");
  console.log(fix);
  
  return fix;
}

// === WORKFLOW 4: Architecture Analysis ===
async function architectureAnalysisWorkflow(analysisGoal) {
  console.log("🏗️ Starting Architecture Analysis Workflow...\n");
  
  console.log("Mapping Project Structure...");
  const structure = await getProjectStructure(PROJECT_PATH);
  
  console.log("\nAnalyzing Architecture...");
  const analysis = await architectureAgent(structure, analysisGoal);
  
  console.log("\n=== ARCHITECTURE ANALYSIS ===\n");
  console.log(analysis);
  
  return analysis;
}

// === WORKFLOW 5: Generate Tests ===
async function testGenerationWorkflow(filePath) {
  console.log("🧪 Starting Test Generation Workflow...\n");
  
  const fullPath = path.join(PROJECT_PATH, filePath);
  const code = await readFile(fullPath);
  
  console.log("Generating Tests...");
  const tests = await testingAgent(code);
  
  console.log("\n=== GENERATED TESTS ===\n");
  console.log(tests);
  
  return tests;
}

// === WORKFLOW 6: Full Analysis (Multi-Agent) ===
async function fullAnalysisWorkflow(filePath) {
  console.log("🎯 Starting Full Analysis Workflow...\n");
  
  const fullPath = path.join(PROJECT_PATH, filePath);
  const code = await readFile(fullPath);
  
  console.log("1️⃣ Running Code Review...");
  const review = await codeReviewAgent(code, filePath);
  
  console.log("\n2️⃣ Generating Tests...");
  const tests = await testingAgent(code);
  
  console.log("\n=== FULL ANALYSIS RESULTS ===\n");
  console.log("📋 CODE REVIEW:\n", review);
  console.log("\n🧪 SUGGESTED TESTS:\n", tests);
  
  return { review, tests };
}

// === CLI Interface ===
const workflow = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (workflow) {
  case "review":
    if (!arg1) {
      console.log("Usage: node devOrchestrator.js review <file-path>");
      console.log("Example: node devOrchestrator.js review backend/server.js");
    } else {
      reviewCodeWorkflow(arg1);
    }
    break;
    
  case "feature":
    if (!arg1) {
      console.log("Usage: node devOrchestrator.js feature '<description>'");
      console.log('Example: node devOrchestrator.js feature "Add export to CSV functionality"');
    } else {
      featureImplementationWorkflow(arg1);
    }
    break;
    
  case "bug":
    if (!arg1 || !arg2) {
      console.log("Usage: node devOrchestrator.js bug '<description>' <file-path>");
      console.log('Example: node devOrchestrator.js bug "Jobs not sorting correctly" backend/routes/jobs.js');
    } else {
      bugFixWorkflow(arg1, arg2);
    }
    break;
    
  case "architecture":
    if (!arg1) {
      console.log("Usage: node devOrchestrator.js architecture '<goal>'");
      console.log('Example: node devOrchestrator.js architecture "Evaluate scalability for 1000+ concurrent users"');
    } else {
      architectureAnalysisWorkflow(arg1);
    }
    break;
    
  case "test":
    if (!arg1) {
      console.log("Usage: node devOrchestrator.js test <file-path>");
      console.log("Example: node devOrchestrator.js test backend/utils/scheduler.js");
    } else {
      testGenerationWorkflow(arg1);
    }
    break;
    
  case "analyze":
    if (!arg1) {
      console.log("Usage: node devOrchestrator.js analyze <file-path>");
      console.log("Example: node devOrchestrator.js analyze backend/server.js");
    } else {
      fullAnalysisWorkflow(arg1);
    }
    break;
    
  default:
    console.log("🤖 Claude Development Agent Orchestrator\n");
    console.log("Available workflows:\n");
    console.log("  review <file>              - Code review for a specific file");
    console.log("  feature '<description>'    - Generate feature implementation plan");
    console.log("  bug '<desc>' <file>        - Debug and fix issues");
    console.log("  architecture '<goal>'      - Analyze project architecture");
    console.log("  test <file>                - Generate tests for a file");
    console.log("  analyze <file>             - Full analysis (review + tests)");
    console.log("\nExamples:");
    console.log("  node devOrchestrator.js review backend/server.js");
    console.log("  node devOrchestrator.js feature 'Add CSV export'");
    console.log("  node devOrchestrator.js architecture 'Evaluate scalability'");
}
