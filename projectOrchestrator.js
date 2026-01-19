import { codeReviewAgent } from "./agents/codeReviewAgent.js";
import { featureAgent } from "./agents/featureAgent.js";
import { architectureAgent } from "./agents/architectureAgent.js";
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
      if (item.name === "node_modules" || item.name === ".git" || item.name === ".claude") continue;
      
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

// Helper to list files in a directory
async function listFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  
  async function scan(currentDir) {
    try {
      const items = await fs.readdir(currentDir, { withFileTypes: true });
      
      for (const item of items) {
        if (item.name === "node_modules" || item.name === ".git") continue;
        
        const fullPath = path.join(currentDir, item.name);
        
        if (item.isDirectory()) {
          await scan(fullPath);
        } else {
          const ext = path.extname(item.name);
          if (extensions.includes(ext)) {
            // Get relative path from project root
            const relativePath = fullPath.replace(PROJECT_PATH + '/', '');
            files.push(relativePath);
          }
        }
      }
    } catch (error) {
      // Skip directories we can't read
    }
  }
  
  await scan(dir);
  return files;
}

// === PHASE 1: Analyze Current Codebase ===
async function analyzeCodebase() {
  console.log("═══════════════════════════════════════════");
  console.log("📊 PHASE 1: ANALYZING CURRENT CODEBASE");
  console.log("═══════════════════════════════════════════\n");
  
  // Get project structure
  console.log("🗂️  Mapping project structure...");
  const structure = await getProjectStructure(PROJECT_PATH);
  
  // Find key files to review
  console.log("🔍 Finding key files...");
  const files = await listFiles(PROJECT_PATH);
  
  // Review backend server
  console.log("\n📝 Reviewing backend/server.js...");
  const serverCode = await readFile(path.join(PROJECT_PATH, "backend/server.js"));
  const serverReview = await codeReviewAgent(serverCode, "backend/server.js");
  
  // Check if package.json exists to understand tech stack
  console.log("\n📦 Analyzing tech stack...");
  const backendPackage = await readFile(path.join(PROJECT_PATH, "backend/package.json"));
  const frontendPackage = await readFile(path.join(PROJECT_PATH, "frontend/package.json"));
  
  return {
    structure,
    files,
    serverReview,
    backendPackage,
    frontendPackage
  };
}

// === PHASE 2: Architecture Recommendations ===
async function getArchitectureRecommendations(projectGoal, codebaseAnalysis) {
  console.log("\n═══════════════════════════════════════════");
  console.log("🏗️  PHASE 2: ARCHITECTURE RECOMMENDATIONS");
  console.log("═══════════════════════════════════════════\n");
  
  const context = `
PROJECT GOAL: ${projectGoal}

CURRENT PROJECT STRUCTURE:
${codebaseAnalysis.structure}

BACKEND DEPENDENCIES:
${codebaseAnalysis.backendPackage}

FRONTEND DEPENDENCIES:
${codebaseAnalysis.frontendPackage}

CURRENT SERVER REVIEW:
${codebaseAnalysis.serverReview}
`;
  
  console.log("🤔 Evaluating architecture options...");
  const recommendations = await architectureAgent(
    context,
    `Recommend the best architecture approach for: ${projectGoal}. Consider database choice, API design, state management, and integration strategy.`
  );
  
  return recommendations;
}

// === PHASE 3: Break Into Implementation Phases ===
async function breakIntoPhases(projectGoal, recommendations, codebaseAnalysis) {
  console.log("\n═══════════════════════════════════════════");
  console.log("📋 PHASE 3: BREAKING INTO IMPLEMENTATION PHASES");
  console.log("═══════════════════════════════════════════\n");
  
  const context = `
PROJECT GOAL: ${projectGoal}

ARCHITECTURE RECOMMENDATIONS:
${recommendations}

CURRENT CODEBASE:
${codebaseAnalysis.structure}
`;
  
  console.log("✂️  Creating phased implementation plan...");
  const phasePlan = await featureAgent(
    `Break this into 4-6 implementation phases: ${projectGoal}. For each phase provide: 1) Phase name, 2) Specific deliverables, 3) Files to modify/create, 4) Estimated complexity (Easy/Medium/Hard), 5) Dependencies on other phases. Make phases independent where possible.`,
    context
  );
  
  return phasePlan;
}

// === PHASE 4: Generate Detailed Plans for Each Phase ===
async function generateDetailedPlans(phases, codebaseAnalysis) {
  console.log("\n═══════════════════════════════════════════");
  console.log("🎯 PHASE 4: GENERATING DETAILED IMPLEMENTATION PLANS");
  console.log("═══════════════════════════════════════════\n");
  
  // For now, we'll generate plans for the first 3 most critical phases
  // In practice, you'd parse the phases and generate for each
  
  console.log("📝 Generating detailed implementation plans...");
  console.log("   (Focusing on critical phases)\n");
  
  const detailedPlans = [];
  
  // Phase 1: Database Setup
  console.log("🗄️  Planning Phase 1: Database Setup...");
  const dbPlan = await featureAgent(
    `Create detailed implementation plan for database setup to store scheduling job attempts. Include: exact schema definition, database choice justification, migration strategy, model/schema code, connection setup, and integration with existing server.`,
    `Current Structure:\n${codebaseAnalysis.structure}\n\nBackend Code:\n${codebaseAnalysis.backendPackage}`
  );
  detailedPlans.push({ phase: "Database Setup", plan: dbPlan });
  
  // Phase 2: Backend API
  console.log("\n🔌 Planning Phase 2: Backend API...");
  const apiPlan = await featureAgent(
    `Create detailed implementation plan for REST API endpoints to save, retrieve, update, and delete scheduling attempts. Include: exact route definitions, controller code, request/response schemas, error handling, and validation.`,
    `Current Structure:\n${codebaseAnalysis.structure}`
  );
  detailedPlans.push({ phase: "Backend API", plan: apiPlan });
  
  // Phase 3: Frontend UI
  console.log("\n🎨 Planning Phase 3: Frontend History UI...");
  const uiPlan = await featureAgent(
    `Create detailed implementation plan for Schedule History component. Include: component structure, state management approach, data fetching strategy, table design with sorting/filtering, and styling approach.`,
    `Current Structure:\n${codebaseAnalysis.structure}`
  );
  detailedPlans.push({ phase: "Frontend History UI", plan: uiPlan });
  
  return detailedPlans;
}

// === PHASE 5: Create Task List ===
async function createTaskList(detailedPlans) {
  console.log("\n═══════════════════════════════════════════");
  console.log("✅ PHASE 5: CREATING PRIORITIZED TASK LIST");
  console.log("═══════════════════════════════════════════\n");
  
  const allPlans = detailedPlans.map(p => `${p.phase}:\n${p.plan}`).join("\n\n---\n\n");
  
  console.log("📋 Generating actionable task list...");
  const taskList = await featureAgent(
    `Based on these implementation plans, create a prioritized, actionable task list. Each task should be: 1) Specific and actionable, 2) Estimated time (hours), 3) Prerequisites, 4) Files to modify/create. Format as a numbered checklist.`,
    allPlans
  );
  
  return taskList;
}

// === MAIN ORCHESTRATOR ===
async function orchestrateProject(projectGoal) {
  const startTime = Date.now();
  
  console.log("\n");
  console.log("╔═══════════════════════════════════════════════════════╗");
  console.log("║                                                       ║");
  console.log("║        🤖 CLAUDE PROJECT ORCHESTRATOR 🤖              ║");
  console.log("║                                                       ║");
  console.log("╚═══════════════════════════════════════════════════════╝");
  console.log("\n");
  console.log(`📌 PROJECT GOAL: ${projectGoal}\n`);
  console.log("Starting comprehensive multi-phase analysis...\n");
  
  try {
    // Phase 1: Analyze Codebase
    const codebaseAnalysis = await analyzeCodebase();
    
    // Phase 2: Get Architecture Recommendations
    const recommendations = await getArchitectureRecommendations(projectGoal, codebaseAnalysis);
    
    // Phase 3: Break Into Phases
    const phases = await breakIntoPhases(projectGoal, recommendations, codebaseAnalysis);
    
    // Phase 4: Generate Detailed Plans
    const detailedPlans = await generateDetailedPlans(phases, codebaseAnalysis);
    
    // Phase 5: Create Task List
    const taskList = await createTaskList(detailedPlans);
    
    // === FINAL REPORT ===
    console.log("\n\n");
    console.log("╔═══════════════════════════════════════════════════════╗");
    console.log("║                                                       ║");
    console.log("║              📊 FINAL PROJECT REPORT 📊               ║");
    console.log("║                                                       ║");
    console.log("╚═══════════════════════════════════════════════════════╝");
    
    console.log("\n\n🏗️  ARCHITECTURE RECOMMENDATIONS:");
    console.log("═══════════════════════════════════════════\n");
    console.log(recommendations);
    
    console.log("\n\n📋 IMPLEMENTATION PHASES:");
    console.log("═══════════════════════════════════════════\n");
    console.log(phases);
    
    console.log("\n\n🎯 DETAILED IMPLEMENTATION PLANS:");
    console.log("═══════════════════════════════════════════\n");
    detailedPlans.forEach((item, index) => {
      console.log(`\n--- ${item.phase} ---\n`);
      console.log(item.plan);
      console.log("\n");
    });
    
    console.log("\n\n✅ ACTIONABLE TASK LIST:");
    console.log("═══════════════════════════════════════════\n");
    console.log(taskList);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log("\n\n");
    console.log("═══════════════════════════════════════════");
    console.log(`✨ Analysis complete in ${duration} seconds`);
    console.log("═══════════════════════════════════════════\n");
    
    // Save report to file
    const reportPath = path.join(process.cwd(), "PROJECT_PLAN.md");
    const report = `# Project Implementation Plan
    
## Goal
${projectGoal}

## Architecture Recommendations
${recommendations}

## Implementation Phases
${phases}

## Detailed Plans
${detailedPlans.map(p => `### ${p.phase}\n${p.plan}`).join("\n\n")}

## Task List
${taskList}

---
Generated: ${new Date().toISOString()}
Duration: ${duration}s
`;
    
    await fs.writeFile(reportPath, report);
    console.log(`💾 Full report saved to: ${reportPath}\n`);
    
  } catch (error) {
    console.error("❌ Error during orchestration:", error);
  }
}

// === CLI ===
const projectGoal = process.argv.slice(2).join(" ");

if (!projectGoal) {
  console.log("╔═══════════════════════════════════════════════════════╗");
  console.log("║                                                       ║");
  console.log("║        🤖 CLAUDE PROJECT ORCHESTRATOR 🤖              ║");
  console.log("║                                                       ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");
  console.log("Usage: node projectOrchestrator.js <your-project-goal>\n");
  console.log("Example:");
  console.log('  node projectOrchestrator.js Add database to store scheduling attempts and create UI for viewing history\n');
  console.log("What this does:");
  console.log("  1. 📊 Analyzes your current codebase");
  console.log("  2. 🏗️  Recommends architecture approach");
  console.log("  3. 📋 Breaks project into phases");
  console.log("  4. 🎯 Creates detailed implementation plans");
  console.log("  5. ✅ Generates prioritized task list");
  console.log("  6. 💾 Saves full report to PROJECT_PLAN.md\n");
} else {
  orchestrateProject(projectGoal);
}
