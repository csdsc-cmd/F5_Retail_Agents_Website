/**
 * Build Loop Orchestrator
 *
 * Combines Ralph Wiggum-style iteration with QA pipeline.
 *
 * Philosophy: Keep feeding the same prompt until completion.
 * Each iteration sees its own previous work and improves on it.
 *
 * Usage:
 *   node buildLoop.js                    # Interactive mode
 *   node buildLoop.js --max-iterations 30
 *   node buildLoop.js --completion-promise "BUILD_COMPLETE"
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import { execSync, spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config();

// === CONFIGURATION ===
const CONFIG = {
  maxIterations: parseInt(process.env.MAX_ITERATIONS || "50"),
  completionPromise: process.env.COMPLETION_PROMISE || "BUILD_COMPLETE",
  projectRoot: process.cwd(),
  knowledgePath: "./knowledge",
  model: process.env.CLAUDE_MODEL || "claude-opus-4-5-20251101",
  apiTimeout: parseInt(process.env.API_TIMEOUT || "180000"),
};

// Parse CLI args
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--max-iterations" && args[i + 1]) {
    CONFIG.maxIterations = parseInt(args[i + 1]);
  } else if (args[i] === "--completion-promise" && args[i + 1]) {
    CONFIG.completionPromise = args[i + 1];
  } else if (args[i] === "--project-root" && args[i + 1]) {
    CONFIG.projectRoot = args[i + 1];
  }
}

// Initialize Anthropic client
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// === KNOWLEDGE BASE LOADER ===
async function loadKnowledgeBase() {
  const sections = [];

  // Static knowledge
  const staticFiles = [
    "PROJECT_CONTEXT.md",
    "TECH_STACK.md",
    "CODING_STANDARDS.md",
    "GLOSSARY.md"
  ];

  for (const file of staticFiles) {
    const filePath = path.join(CONFIG.knowledgePath, "static", file);
    try {
      const content = await fs.readFile(filePath, "utf-8");
      sections.push(`## ${file}\n${content}`);
    } catch (e) {
      // File doesn't exist, skip
    }
  }

  // Learned patterns
  const patternsPath = path.join(CONFIG.knowledgePath, "learned", "patterns");
  try {
    const patterns = await fs.readdir(patternsPath);
    for (const pattern of patterns.filter(f => f.endsWith(".ts") || f.endsWith(".tsx"))) {
      const content = await fs.readFile(path.join(patternsPath, pattern), "utf-8");
      sections.push(`## Pattern: ${pattern}\n\`\`\`typescript\n${content}\n\`\`\``);
    }
  } catch (e) {
    // Patterns directory doesn't exist
  }

  return sections.join("\n\n---\n\n");
}

// === PROJECT PLAN LOADER ===
async function loadProjectPlan() {
  const planPath = path.join(CONFIG.projectRoot, "PROJECT_PLAN.md");
  try {
    return await fs.readFile(planPath, "utf-8");
  } catch (e) {
    throw new Error("PROJECT_PLAN.md not found. Create one from PROJECT_PLAN_TEMPLATE.md");
  }
}

// === GET CURRENT CODEBASE STATE ===
async function getCodebaseState() {
  const state = {
    files: [],
    errors: [],
    testResults: null,
  };

  // Get list of generated files
  try {
    const result = execSync("git ls-files --others --exclude-standard && git ls-files -m", {
      cwd: CONFIG.projectRoot,
      encoding: "utf-8"
    });
    state.files = result.trim().split("\n").filter(Boolean);
  } catch (e) {
    // Not a git repo, list src files instead
    try {
      const result = execSync("find . -name '*.ts' -o -name '*.tsx' -o -name '*.js' | head -50", {
        cwd: CONFIG.projectRoot,
        encoding: "utf-8"
      });
      state.files = result.trim().split("\n").filter(Boolean);
    } catch {
      state.files = [];
    }
  }

  // Try to run TypeScript check
  try {
    execSync("npm run typecheck 2>&1 || npx tsc --noEmit 2>&1", {
      cwd: CONFIG.projectRoot,
      encoding: "utf-8",
      timeout: 30000
    });
  } catch (e) {
    if (e.stdout) state.errors.push(`TypeScript: ${e.stdout}`);
    if (e.stderr) state.errors.push(`TypeScript: ${e.stderr}`);
  }

  // Try to run tests
  try {
    const testResult = execSync("npm test 2>&1 || true", {
      cwd: CONFIG.projectRoot,
      encoding: "utf-8",
      timeout: 60000
    });
    state.testResults = testResult;
  } catch (e) {
    state.testResults = e.stdout || e.message;
  }

  return state;
}

// === CHECK COMPLETION ===
async function checkCompletion() {
  try {
    // Only check in frontend/ and backend/ directories to avoid matching template/doc files
    const frontendResult = execSync(
      `grep -r "${CONFIG.completionPromise}" --include="*.ts" --include="*.tsx" --include="*.js" ./frontend 2>/dev/null || true`,
      { cwd: CONFIG.projectRoot, encoding: "utf-8" }
    );
    const backendResult = execSync(
      `grep -r "${CONFIG.completionPromise}" --include="*.ts" --include="*.tsx" --include="*.js" ./backend 2>/dev/null || true`,
      { cwd: CONFIG.projectRoot, encoding: "utf-8" }
    );
    return frontendResult.trim().length > 0 || backendResult.trim().length > 0;
  } catch {
    return false;
  }
}

// === RUN VALIDATION ===
async function runValidation() {
  const results = {
    typecheck: { passed: true, output: "" },
    lint: { passed: true, output: "" },
    build: { passed: true, output: "" },
    test: { passed: true, output: "" },
  };

  const commands = [
    { name: "typecheck", cmd: "npm run typecheck 2>&1 || npx tsc --noEmit 2>&1" },
    { name: "lint", cmd: "npm run lint 2>&1 || true" },
    { name: "build", cmd: "npm run build 2>&1 || true" },
    { name: "test", cmd: "npm test 2>&1 || true" },
  ];

  for (const { name, cmd } of commands) {
    try {
      const output = execSync(cmd, {
        cwd: CONFIG.projectRoot,
        encoding: "utf-8",
        timeout: 120000
      });
      results[name] = { passed: true, output };
    } catch (e) {
      results[name] = {
        passed: false,
        output: e.stdout || e.stderr || e.message
      };
    }
  }

  return results;
}

// === BUILD THE ITERATION PROMPT ===
async function buildIterationPrompt(iteration, previousErrors) {
  const knowledge = await loadKnowledgeBase();
  const plan = await loadProjectPlan();
  const codebaseState = await getCodebaseState();

  let prompt = `# Build Loop - Iteration ${iteration}/${CONFIG.maxIterations}

## Your Role
You are an AI developer implementing an Azure AI Foundry application.
You work iteratively, seeing your own previous work and improving it each iteration.

## Knowledge Base
${knowledge}

## Project Plan
${plan}

## Current Codebase State
Files in project: ${codebaseState.files.length > 0 ? codebaseState.files.join(", ") : "None yet"}

`;

  if (codebaseState.errors.length > 0) {
    prompt += `## Errors to Fix
${codebaseState.errors.join("\n")}

`;
  }

  if (previousErrors.length > 0) {
    prompt += `## Previous Iteration Issues
Fix these issues from the last iteration:
${previousErrors.map(e => `- ${e}`).join("\n")}

`;
  }

  prompt += `## Instructions

1. **Review** the current codebase state and any errors
2. **Implement** the next piece of functionality from the project plan
3. **Fix** any errors from previous iterations
4. **Validate** your code compiles and follows the patterns

## Completion Signal
When ALL requirements in PROJECT_PLAN.md are complete:
- All backend endpoints implemented
- All frontend components implemented
- Code compiles without errors
- Tests pass (if configured)

Add this comment to the main entry file (e.g., src/index.ts):
\`\`\`
// ${CONFIG.completionPromise}
\`\`\`

## Output Format
For each file you create or modify, output:

\`\`\`typescript
// FILE: path/to/file.ts
// actual code here
\`\`\`

Focus on incremental progress. Don't try to do everything at once.
Each iteration should make meaningful progress toward completion.
`;

  return prompt;
}

// === PARSE CLAUDE'S RESPONSE FOR FILES ===
function parseFilesFromResponse(response) {
  const files = [];
  const fileRegex = /```(?:typescript|javascript|tsx|jsx)?\n\/\/ FILE: (.+?)\n([\s\S]*?)```/g;

  let match;
  while ((match = fileRegex.exec(response)) !== null) {
    files.push({
      path: match[1].trim(),
      content: match[2].trim()
    });
  }

  return files;
}

// === SAVE FILES ===
async function saveFiles(files) {
  for (const file of files) {
    const fullPath = path.join(CONFIG.projectRoot, file.path);
    const dir = path.dirname(fullPath);

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(fullPath, file.content, "utf-8");

    console.log(`   💾 Saved: ${file.path}`);
  }
}

// === MAIN BUILD LOOP ===
async function runBuildLoop() {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        🔄 BUILD LOOP ORCHESTRATOR 🔄                     ║");
  console.log("║                                                          ║");
  console.log("║  Ralph Wiggum-style Iterative Development               ║");
  console.log("║  \"I'm learnding!\" - Each iteration improves on itself   ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  console.log("⚙️  Configuration:");
  console.log(`   Max Iterations: ${CONFIG.maxIterations}`);
  console.log(`   Completion Promise: ${CONFIG.completionPromise}`);
  console.log(`   Project Root: ${CONFIG.projectRoot}`);
  console.log(`   Model: ${CONFIG.model}`);
  console.log("\n");

  let iteration = 0;
  let previousErrors = [];
  let totalTokens = { input: 0, output: 0 };

  while (iteration < CONFIG.maxIterations) {
    iteration++;

    console.log(`\n${"═".repeat(60)}`);
    console.log(`📍 ITERATION ${iteration}/${CONFIG.maxIterations}`);
    console.log(`${"═".repeat(60)}\n`);

    // Check if already complete
    if (await checkCompletion()) {
      console.log("✅ Completion promise found! Build loop complete.\n");
      break;
    }

    // Build prompt
    console.log("📝 Building prompt...");
    const prompt = await buildIterationPrompt(iteration, previousErrors);

    // Call Claude
    console.log("🤖 Calling Claude...");
    const startTime = Date.now();

    try {
      const response = await anthropic.messages.create({
        model: CONFIG.model,
        max_tokens: 8192,
        messages: [{ role: "user", content: prompt }],
      });

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      const text = response.content[0].type === "text" ? response.content[0].text : "";

      totalTokens.input += response.usage.input_tokens;
      totalTokens.output += response.usage.output_tokens;

      console.log(`   ✅ Response received (${duration}s, ${response.usage.output_tokens} tokens)\n`);

      // Parse and save files
      const files = parseFilesFromResponse(text);
      if (files.length > 0) {
        console.log(`📦 Saving ${files.length} file(s)...`);
        await saveFiles(files);
      } else {
        console.log("ℹ️  No files to save this iteration");
      }

      // Run validation
      console.log("\n🔍 Running validation...");
      const validation = await runValidation();

      previousErrors = [];
      for (const [name, result] of Object.entries(validation)) {
        if (result.passed) {
          console.log(`   ✅ ${name}`);
        } else {
          console.log(`   ❌ ${name}`);
          previousErrors.push(`${name}: ${result.output.slice(0, 500)}`);
        }
      }

      // Check completion after changes
      if (await checkCompletion()) {
        console.log("\n✅ Completion promise found! Build loop complete.\n");
        break;
      }

      // If all validations pass and no errors, we might be done
      if (previousErrors.length === 0 && files.length === 0) {
        console.log("\n⚠️  No changes made and no errors. Review PROJECT_PLAN.md requirements.");
      }

    } catch (error) {
      console.error(`\n❌ API Error: ${error.message}`);
      previousErrors.push(`API Error: ${error.message}`);

      // Wait before retry
      console.log("   Waiting 5s before retry...");
      await new Promise(r => setTimeout(r, 5000));
    }

    // Small delay between iterations
    await new Promise(r => setTimeout(r, 2000));
  }

  // Final summary
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                   BUILD LOOP SUMMARY                     ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  console.log(`   Iterations: ${iteration}/${CONFIG.maxIterations}`);
  console.log(`   Total Input Tokens: ${totalTokens.input.toLocaleString()}`);
  console.log(`   Total Output Tokens: ${totalTokens.output.toLocaleString()}`);

  const estimatedCost = (totalTokens.input * 0.003 + totalTokens.output * 0.015) / 1000;
  console.log(`   Estimated Cost: $${estimatedCost.toFixed(2)}`);

  if (await checkCompletion()) {
    console.log("\n   ✅ BUILD COMPLETE");
  } else {
    console.log("\n   ⚠️  Max iterations reached - review and continue if needed");
  }

  console.log("\n");
}

// Run it
runBuildLoop().catch(console.error);
