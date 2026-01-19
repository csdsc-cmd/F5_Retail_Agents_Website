import { codeGeneratorAgent, planParserAgent } from "./agents/codeGeneratorAgent.js";
import {
  qualityGateAgent,
  architectureConsistencyAgent,
  integrationValidationAgent,
  securityAuditAgent,
  bestPracticesAgent,
  codeImprovementAgent,
} from "./agents/qaAgents.js";
import { costTracker } from "./utils/costTracker.js";
import {
  parseJSON,
  withTimeout,
  readFileCached,
  showCodeDiff,
  preflight,
  loadConfig,
  clearFileCache,
} from "./utils/helpers.js";
import { CheckpointManager, displayResumePrompt } from "./utils/checkpoint.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

// === CONFIGURATION ===
const CONFIG = loadConfig();
const PLAN_PATH = path.join(process.cwd(), "PROJECT_PLAN.md");
const QA_LOG_PATH = path.join(process.cwd(), "qa_pipeline.log");

// Helper to log QA process
async function logQA(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  await fs.appendFile(QA_LOG_PATH, logMessage);
}

// Helper to read file (uses cache)
async function readFile(filePath) {
  return await readFileCached(filePath);
}

// === QA PIPELINE FOR SINGLE FILE ===
async function runQAPipeline(task, projectPlan, iteration = 1) {
  const header = `\n${"=".repeat(70)}\n🔍 QA PIPELINE - Iteration ${iteration}/${CONFIG.maxIterations}\n${"=".repeat(70)}`;
  console.log(header);
  await logQA(header);

  console.log(`📄 File: ${task.filePath}`);
  console.log(`🎯 Task: ${task.task}\n`);

  // === STEP 1: Generate Code ===
  console.log("⚙️  STEP 1: Generating code...");
  await logQA(`Generating code for ${task.filePath}`);

  const context = await getCodeContext(task.dependencies || []);
  
  const generatedCode = await withTimeout(
    codeGeneratorAgent(
      task.task,
      context + `\n\nProject Plan:\n${projectPlan.slice(0, 2000)}`,
      task.fileType
    ),
    CONFIG.apiTimeout,
    "codeGeneratorAgent"
  );

  console.log(`   ✅ Code generated (${generatedCode.split("\n").length} lines)\n`);

  // === STEP 2: Run All QA Agents in Parallel ===
  console.log("🔬 STEP 2: Running Quality Checks...\n");
  await logQA("Running quality checks");

  const qaChecks = await Promise.all([
    (async () => {
      console.log("   🔍 Quality Gate Agent...");
      const result = await withTimeout(
        qualityGateAgent(generatedCode, task.filePath, context),
        CONFIG.apiTimeout,
        "qualityGateAgent"
      );
      console.log("      ✅ Complete");
      return { name: "Quality Gate", result };
    })(),

    (async () => {
      console.log("   🏗️  Architecture Consistency Agent...");
      const result = await withTimeout(
        architectureConsistencyAgent(generatedCode, task.filePath, projectPlan),
        CONFIG.apiTimeout,
        "architectureConsistencyAgent"
      );
      console.log("      ✅ Complete");
      return { name: "Architecture", result };
    })(),

    (async () => {
      console.log("   🔗 Integration Validation Agent...");
      const result = await withTimeout(
        integrationValidationAgent(generatedCode, task.filePath, context),
        CONFIG.apiTimeout,
        "integrationValidationAgent"
      );
      console.log("      ✅ Complete");
      return { name: "Integration", result };
    })(),

    (async () => {
      console.log("   🔒 Security Audit Agent...");
      const result = await withTimeout(
        securityAuditAgent(generatedCode, task.filePath),
        CONFIG.apiTimeout,
        "securityAuditAgent"
      );
      console.log("      ✅ Complete");
      return { name: "Security", result };
    })(),

    (async () => {
      console.log("   ⭐ Best Practices Agent...");
      const result = await withTimeout(
        bestPracticesAgent(generatedCode, task.filePath, task.fileType),
        CONFIG.apiTimeout,
        "bestPracticesAgent"
      );
      console.log("      ✅ Complete");
      return { name: "Best Practices", result };
    })(),
  ]);

  // === STEP 3: Aggregate Results ===
  console.log("\n📊 STEP 3: Analyzing Results...\n");
  await logQA("Aggregating QA results");

  const results = {
    qualityGate: await parseJSON(qaChecks[0].result),
    architecture: await parseJSON(qaChecks[1].result),
    integration: await parseJSON(qaChecks[2].result),
    security: await parseJSON(qaChecks[3].result),
    bestPractices: await parseJSON(qaChecks[4].result),
  };

  // Calculate overall scores
  const scores = {
    quality: results.qualityGate?.score || 0,
    architecture: results.architecture?.alignment || 0,
    integration: results.integration?.compatibilityScore || 0,
    security: results.security?.securityScore || 0,
    bestPractices: results.bestPractices?.practiceScore || 0,
  };

  const overallScore =
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;

  // Check if passed
  const passed =
    results.qualityGate?.approved !== false &&
    results.architecture?.consistent !== false &&
    results.integration?.integrated !== false &&
    results.security?.secure !== false &&
    results.bestPractices?.followsBestPractices !== false &&
    overallScore >= CONFIG.minPassScore;

  // Display results
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║                   QA RESULTS SUMMARY                   ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  console.log(`   📊 Overall Score: ${overallScore.toFixed(1)}% (min: ${CONFIG.minPassScore}%)`);
  console.log(`   🎯 Quality Gate: ${scores.quality}%`);
  console.log(`   🏗️  Architecture: ${scores.architecture}%`);
  console.log(`   🔗 Integration: ${scores.integration}%`);
  console.log(`   🔒 Security: ${scores.security}%`);
  console.log(`   ⭐ Best Practices: ${scores.bestPractices}%\n`);

  // Collect all issues
  const allIssues = [
    ...(results.qualityGate?.issues || []),
    ...(results.architecture?.deviations || []).map((d) => ({
      ...d,
      source: "Architecture",
    })),
    ...(results.integration?.issues || []).map((i) => ({
      ...i,
      source: "Integration",
    })),
    ...(results.security?.vulnerabilities || []).map((v) => ({
      ...v,
      source: "Security",
    })),
    ...(results.bestPractices?.violations || []).map((v) => ({
      ...v,
      source: "Best Practices",
    })),
  ];

  const criticalIssues = allIssues.filter(
    (i) => i.severity === "critical" || i.severity === "high"
  );

  console.log(`   ⚠️  Total Issues: ${allIssues.length}`);
  console.log(`   🚨 Critical/High: ${criticalIssues.length}\n`);

  if (!passed) {
    console.log("❌ Quality Gate: FAILED\n");

    // Display issues
    if (criticalIssues.length > 0) {
      console.log("🚨 Critical/High Issues:");
      criticalIssues.forEach((issue, i) => {
        console.log(
          `   ${i + 1}. [${issue.source || issue.type}] ${issue.description || issue.issue}`
        );
        if (issue.fix || issue.suggestion) {
          console.log(`      💡 Fix: ${issue.fix || issue.suggestion}`);
        }
      });
      console.log("");
    }

    // If under max iterations, try to improve
    if (iteration < CONFIG.maxIterations) {
      console.log(`🔄 Attempting to fix issues... (Iteration ${iteration + 1})\n`);
      await logQA(`Failed QA, attempting rework (iteration ${iteration + 1})`);

      // Generate improvement prompt
      const feedbackPrompt = `
ISSUES TO FIX:
${JSON.stringify(allIssues, null, 2)}

SPECIFIC REQUIREMENTS:
${results.architecture?.deviations?.map((d) => `- ${d.description}`).join("\n") || "None"}

SECURITY CONCERNS:
${results.security?.vulnerabilities?.map((v) => `- ${v.description}: ${v.fix}`).join("\n") || "None"}

Fix ALL these issues while maintaining functionality.
`;

      // Improve code
      console.log("🔧 Running Code Improvement Agent...");
      const improvedCode = await withTimeout(
        codeImprovementAgent(generatedCode, task.filePath, feedbackPrompt),
        CONFIG.apiTimeout * 1.5, // Give improvement agent more time
        "codeImprovementAgent"
      );
      console.log("   ✅ Code improved");
      
      // Show what changed
      showCodeDiff(generatedCode, improvedCode);
      console.log("");

      // Recursively run QA pipeline with improved code
      const tempTask = {
        ...task,
        task: `Use this improved code (DO NOT regenerate, just use this):\n\n${improvedCode}\n\nOriginal task: ${task.task}`,
      };

      return await runQAPipeline(tempTask, projectPlan, iteration + 1);
    } else {
      console.log("⚠️  Maximum iterations reached. Manual review required.\n");
      await logQA("Maximum iterations reached - manual review needed");

      return {
        passed: false,
        code: generatedCode,
        scores,
        issues: allIssues,
        needsManualReview: true,
      };
    }
  } else {
    console.log("✅ Quality Gate: PASSED\n");
    await logQA(`QA passed for ${task.filePath}`);

    // Display strengths
    if (results.qualityGate?.strengths?.length > 0) {
      console.log("💪 Strengths:");
      results.qualityGate.strengths.forEach((s) => console.log(`   ✓ ${s}`));
      console.log("");
    }

    return {
      passed: true,
      code: generatedCode,
      scores,
      issues: allIssues,
      needsManualReview: false,
    };
  }
}

// Get related files for context (now with caching)
async function getCodeContext(dependencies) {
  let context = "";
  for (const dep of dependencies) {
    const fullPath = path.join(CONFIG.projectPath, dep);
    const code = await readFileCached(fullPath);
    if (code) {
      context += `\n\n--- ${dep} ---\n${code.slice(0, 1000)}...`;
    }
  }
  return context;
}

// Save approved code to project
async function saveToProject(filePath, code) {
  const fullPath = path.join(CONFIG.projectPath, filePath);
  const dir = path.dirname(fullPath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(fullPath, code, "utf-8");

  console.log(`   💾 Saved to: ${filePath}`);
}

// === MAIN QA ORCHESTRATOR ===
async function orchestrateQAPipeline(mode, phaseName = null, options = {}) {
  const { resume = false, fresh = false } = options;
  
  // Initialize checkpoint manager
  const checkpoint = new CheckpointManager("qa-pipeline");
  await checkpoint.init();
  
  // Handle checkpoint scenarios
  if (checkpoint.hasCheckpoint() && !resume && !fresh) {
    // Found checkpoint but no explicit flag - prompt user
    displayResumePrompt(checkpoint.getSummary());
    process.exit(0);
  }
  
  if (fresh && checkpoint.hasCheckpoint()) {
    await checkpoint.clear();
    console.log("🔄 Starting fresh run...\n");
  }
  
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        🛡️  QA PIPELINE ORCHESTRATOR 🛡️                   ║");
  console.log("║                                                          ║");
  console.log("║  Multi-Agent Quality Assurance with Rework Loops        ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  // === PRE-FLIGHT CHECKS ===
  const preflightPassed = await preflight({
    projectPath: CONFIG.projectPath,
    planPath: PLAN_PATH,
  });

  if (!preflightPassed) {
    process.exit(1);
  }

  // Show config
  console.log("⚙️  Configuration:");
  console.log(`   Project: ${CONFIG.projectPath}`);
  console.log(`   Max Iterations: ${CONFIG.maxIterations}`);
  console.log(`   Min Pass Score: ${CONFIG.minPassScore}%`);
  console.log(`   API Timeout: ${CONFIG.apiTimeout / 1000}s`);
  console.log(`   Checkpoint: ${resume ? "RESUMING" : "New run"}\n`);

  // Clear file cache for fresh run
  clearFileCache();

  // Clear previous log only if fresh run
  if (!resume) {
    await fs.writeFile(QA_LOG_PATH, `QA Pipeline Log - ${new Date().toISOString()}\n\n`);
  } else {
    await fs.appendFile(QA_LOG_PATH, `\n\n=== RESUMED AT ${new Date().toISOString()} ===\n\n`);
  }

  try {
    // Load project plan
    console.log("📖 Loading PROJECT_PLAN.md...");
    const projectPlan = await readFile(PLAN_PATH);
    if (!projectPlan) {
      throw new Error("PROJECT_PLAN.md not found. Run projectOrchestrator.js first!");
    }
    console.log("   ✅ Plan loaded\n");

    // Parse tasks
    console.log("📋 Parsing implementation tasks...");
    const tasks = await withTimeout(
      planParserAgent(projectPlan),
      CONFIG.apiTimeout,
      "planParserAgent"
    );
    const parsedTasks = await parseJSON(tasks);

    if (!parsedTasks || !Array.isArray(parsedTasks)) {
      throw new Error("Failed to parse tasks from plan");
    }
    console.log(`   ✅ Found ${parsedTasks.length} tasks\n`);

    // Filter tasks by mode
    let tasksToProcess = [];

    if (mode === "test") {
      tasksToProcess = [parsedTasks[0]];
      console.log("🧪 TEST MODE: Processing 1 task\n");
    } else if (mode === "phase" && phaseName) {
      tasksToProcess = parsedTasks.filter((t) =>
        t.phase.toLowerCase().includes(phaseName.toLowerCase())
      );
      console.log(
        `📦 PHASE MODE: Processing ${tasksToProcess.length} tasks from "${phaseName}"\n`
      );
    } else if (mode === "all") {
      tasksToProcess = parsedTasks;
      console.log(`🚀 ALL MODE: Processing all ${tasksToProcess.length} tasks\n`);
    } else {
      console.log("❌ Invalid mode or missing phase name\n");
      return;
    }

    // === CHECKPOINT: Initialize or restore ===
    let results = [];
    let startIndex = 0;
    
    if (resume && checkpoint.hasCheckpoint()) {
      // Restore previous results
      results = checkpoint.getResults();
      startIndex = checkpoint.getCompletedTasks().length;
      
      console.log(`\n📌 Resuming from checkpoint...`);
      console.log(`   Completed: ${startIndex}/${tasksToProcess.length} tasks`);
      console.log(`   Remaining: ${tasksToProcess.length - startIndex} tasks\n`);
    } else {
      // Start fresh checkpoint
      await checkpoint.start({
        mode,
        phaseName,
        totalTasks: tasksToProcess.length,
        taskList: tasksToProcess.map(t => t.filePath),
      });
    }

    // Process each task through QA pipeline
    for (let i = startIndex; i < tasksToProcess.length; i++) {
      const task = tasksToProcess[i];

      console.log(`\n\n${"█".repeat(70)}`);
      console.log(`TASK ${i + 1}/${tasksToProcess.length}: ${task.filePath}`);
      console.log(`${"█".repeat(70)}\n`);

      const result = await runQAPipeline(task, projectPlan);

      if (result.passed) {
        console.log("💾 Saving approved code to project...");
        await saveToProject(task.filePath, result.code);
        console.log("   ✅ Saved successfully\n");
      }

      const taskResult = {
        task: task.filePath,
        ...result,
      };
      
      results.push(taskResult);
      
      // === CHECKPOINT: Save progress after each task ===
      await checkpoint.completeTask(i, task.filePath, {
        passed: result.passed,
        scores: result.scores,
        issueCount: result.issues?.length || 0,
        needsManualReview: result.needsManualReview,
      });
      console.log(`   📌 Checkpoint saved (${i + 1}/${tasksToProcess.length})\n`);

      // Small delay between tasks
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Final summary
    console.log("\n\n");
    console.log("╔══════════════════════════════════════════════════════════╗");
    console.log("║                                                          ║");
    console.log("║                   FINAL QA REPORT                        ║");
    console.log("║                                                          ║");
    console.log("╚══════════════════════════════════════════════════════════╝");
    console.log("\n");

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed).length;
    const needsReview = results.filter((r) => r.needsManualReview).length;

    console.log(`✅ Passed: ${passed}/${results.length}`);
    console.log(`❌ Failed: ${failed}/${results.length}`);
    console.log(`👀 Needs Manual Review: ${needsReview}/${results.length}\n`);

    if (passed > 0) {
      console.log("✅ Successfully Generated Files:");
      results.filter((r) => r.passed).forEach((r) => {
        console.log(
          `   ✓ ${r.task} (Score: ${(Object.values(r.scores).reduce((a, b) => a + b) / 5).toFixed(1)}%)`
        );
      });
      console.log("");
    }

    if (needsReview > 0) {
      console.log("⚠️  Files Needing Manual Review:");
      results.filter((r) => r.needsManualReview).forEach((r) => {
        console.log(`   ⚠️  ${r.task}`);
        console.log(`      Issues: ${r.issues.length}`);
      });
      console.log("");
    }

    // === COST SUMMARY ===
    costTracker.printSummary();

    console.log(`📋 Full log saved to: qa_pipeline.log\n`);
    
    // === CHECKPOINT: Clear on successful completion ===
    await checkpoint.finish();
    await checkpoint.clear();
    console.log("🎉 Pipeline completed! Checkpoint cleared.\n");
    
  } catch (error) {
    console.error("\n❌ Pipeline failed:", error.message);
    console.error(error.stack);
    await logQA(`ERROR: ${error.message}`);
    
    // Still show cost even on failure
    costTracker.printSummary();
    
    // Checkpoint is preserved on failure for resume
    console.log("\n📌 Checkpoint preserved. Run with --resume to continue.\n");
  }
}

// === CLI ===
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    resume: args.includes("--resume"),
    fresh: args.includes("--fresh"),
  };
  
  // Remove flags from args
  const positionalArgs = args.filter(a => !a.startsWith("--"));
  const mode = positionalArgs[0];
  const phaseName = positionalArgs.slice(1).join(" ");
  
  return { mode, phaseName, options };
}

const { mode, phaseName, options } = parseArgs();

if (!mode) {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        🛡️  QA PIPELINE ORCHESTRATOR 🛡️                   ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  console.log("Multi-Agent Quality Assurance System");
  console.log("Automatically tests, reviews, and improves code until it passes\n");
  console.log("Usage:\n");
  console.log("  node qaPipeline.js test");
  console.log("    └─ Test with one file (safe)\n");
  console.log("  node qaPipeline.js phase <phase-name>");
  console.log("    └─ Process entire phase with QA");
  console.log('    └─ Example: node qaPipeline.js phase "Database Setup"\n');
  console.log("  node qaPipeline.js all");
  console.log("    └─ Process ALL tasks with QA (takes time!)\n");
  console.log("📌 Checkpoint Options:\n");
  console.log("  --resume");
  console.log("    └─ Continue from last checkpoint\n");
  console.log("  --fresh");
  console.log("    └─ Clear checkpoint and start over\n");
  console.log("  Examples:");
  console.log("    node qaPipeline.js all --resume");
  console.log("    node qaPipeline.js phase Backend --fresh\n");
  console.log("🛡️  Quality Checks:");
  console.log("   ✓ Code quality and best practices");
  console.log("   ✓ Architecture consistency");
  console.log("   ✓ Integration validation");
  console.log("   ✓ Security audit");
  console.log("   ✓ Automatic rework if issues found\n");
  console.log("⚙️  Environment Variables:");
  console.log("   PROJECT_PATH     - Target project directory");
  console.log("   MAX_ITERATIONS   - Max QA rework loops (default: 3)");
  console.log("   MIN_PASS_SCORE   - Minimum score to pass (default: 70)");
  console.log("   API_TIMEOUT      - API timeout in ms (default: 120000)\n");
  console.log("⚠️  IMPORTANT:");
  console.log("   - PROJECT_PLAN.md must exist");
  console.log("   - Commit your code before running");
  console.log("   - Start with 'test' mode first\n");
} else {
  orchestrateQAPipeline(mode, phaseName, options);
}
