/**
 * Design Build Loop
 *
 * Runs iterative code generation with Design Director review feedback.
 * Continues until the Design Director approves the design (score >= 8)
 * or max iterations is reached.
 *
 * Usage:
 *   node designBuildLoop.js                    # Default 80 iterations
 *   node designBuildLoop.js --max-iterations 50
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";
import {
  designDirectorReview,
  formatDesignReview,
  buildDesignFeedbackPrompt
} from "./agents/designDirectorAgent.js";

dotenv.config();

// === CONFIGURATION ===
const CONFIG = {
  maxIterations: parseInt(process.env.DESIGN_MAX_ITERATIONS || "80"),
  projectRoot: process.cwd(),
  knowledgePath: "./knowledge",
  model: process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514",
  apiTimeout: parseInt(process.env.API_TIMEOUT || "180000"),
  minApprovalScore: 8,
};

// Parse CLI args
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--max-iterations" && args[i + 1]) {
    CONFIG.maxIterations = parseInt(args[i + 1]);
  } else if (args[i] === "--project-root" && args[i + 1]) {
    CONFIG.projectRoot = args[i + 1];
  }
}

// Initialize Anthropic client
const anthropic = new Anthropic();

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
    return "No project plan found. Focus on implementing a modern, well-designed frontend.";
  }
}

// === LOAD DESIGN SYSTEM ===
async function loadDesignSystem() {
  const designPath = path.join(CONFIG.projectRoot, "frontend", "src", "design");
  const files = [];

  try {
    const entries = await fs.readdir(designPath);
    for (const entry of entries) {
      if (entry.endsWith(".ts")) {
        const content = await fs.readFile(path.join(designPath, entry), "utf-8");
        files.push(`### ${entry}\n\`\`\`typescript\n${content}\n\`\`\``);
      }
    }
  } catch (e) {
    // Design directory doesn't exist
  }

  return files.join("\n\n");
}

// === GET CURRENT CODEBASE STATE ===
async function getCodebaseState() {
  const state = {
    files: [],
    errors: [],
  };

  // Get list of frontend files
  try {
    const result = execSync("find ./frontend/src -name '*.tsx' -o -name '*.ts' -o -name '*.css' 2>/dev/null | head -100", {
      cwd: CONFIG.projectRoot,
      encoding: "utf-8"
    });
    state.files = result.trim().split("\n").filter(Boolean);
  } catch {
    state.files = [];
  }

  // Try to run TypeScript check
  try {
    execSync("cd frontend && npm run type-check 2>&1 || npx tsc --noEmit 2>&1", {
      cwd: CONFIG.projectRoot,
      encoding: "utf-8",
      timeout: 30000
    });
  } catch (e) {
    if (e.stdout) state.errors.push(`TypeScript: ${e.stdout.slice(0, 1000)}`);
    if (e.stderr) state.errors.push(`TypeScript: ${e.stderr.slice(0, 1000)}`);
  }

  return state;
}

// === BUILD THE ITERATION PROMPT ===
async function buildIterationPrompt(iteration, designFeedback, previousErrors) {
  const knowledge = await loadKnowledgeBase();
  const plan = await loadProjectPlan();
  const designSystem = await loadDesignSystem();
  const codebaseState = await getCodebaseState();

  let prompt = `# Design Build Loop - Iteration ${iteration}/${CONFIG.maxIterations}

## Your Role
You are a senior frontend developer implementing a React + Tailwind CSS marketing website.
Focus on creating beautiful, modern UI that follows the Design Director's feedback.

## Design System
${designSystem || "No design system found. Create consistent, modern styles."}

## Knowledge Base
${knowledge}

## Project Plan
${plan}

## Current Codebase
Files: ${codebaseState.files.length > 0 ? codebaseState.files.join(", ") : "Check frontend/src directory"}

`;

  if (codebaseState.errors.length > 0) {
    prompt += `## TypeScript Errors to Fix
${codebaseState.errors.join("\n")}

`;
  }

  if (designFeedback) {
    prompt += `${designFeedback}

`;
  }

  if (previousErrors.length > 0) {
    prompt += `## Previous Iteration Errors
${previousErrors.map(e => `- ${e}`).join("\n")}

`;
  }

  prompt += `## Instructions

1. **Review** the Design Director's feedback carefully
2. **Implement** the suggested design improvements
3. **Fix** any TypeScript errors
4. **Focus** on visual quality, spacing, typography, and Fusion5 brand colors

### Fusion5 Brand Guidelines
- Primary gradient: Orange (#FF5C39) to Purple (#3B1D4E)
- CTAs should use the orange accent color
- Enterprise-professional but modern feel
- Generous whitespace and clear visual hierarchy

### Output Format
For each file you create or modify, output:

\`\`\`typescript
// FILE: frontend/src/path/to/file.tsx
// actual code here
\`\`\`

Focus on the most critical design issues first. Make meaningful visual improvements each iteration.
`;

  return prompt;
}

// === PARSE CLAUDE'S RESPONSE FOR FILES ===
function parseFilesFromResponse(response) {
  const files = [];
  const fileRegex = /```(?:typescript|javascript|tsx|jsx|css)?\n\/\/ FILE: (.+?)\n([\s\S]*?)```/g;

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

// === SAVE REVIEW HISTORY ===
async function saveReviewHistory(iteration, review) {
  const historyPath = path.join(CONFIG.projectRoot, ".design-reviews");
  await fs.mkdir(historyPath, { recursive: true });

  const filename = `review-${String(iteration).padStart(3, "0")}.json`;
  await fs.writeFile(
    path.join(historyPath, filename),
    JSON.stringify({ iteration, timestamp: new Date().toISOString(), ...review }, null, 2)
  );
}

// === MAIN DESIGN BUILD LOOP ===
async function runDesignBuildLoop() {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        🎨 DESIGN BUILD LOOP 🎨                           ║");
  console.log("║                                                          ║");
  console.log("║  Design Director-driven iterative development            ║");
  console.log("║  \"Make it beautiful.\" - Each iteration improves design  ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  console.log("⚙️  Configuration:");
  console.log(`   Max Iterations: ${CONFIG.maxIterations}`);
  console.log(`   Min Approval Score: ${CONFIG.minApprovalScore}/10`);
  console.log(`   Project Root: ${CONFIG.projectRoot}`);
  console.log(`   Model: ${CONFIG.model}`);
  console.log("\n");

  let iteration = 0;
  let previousErrors = [];
  let previousReview = null;
  let totalTokens = { input: 0, output: 0 };

  while (iteration < CONFIG.maxIterations) {
    iteration++;

    console.log(`\n${"═".repeat(60)}`);
    console.log(`🎨 DESIGN ITERATION ${iteration}/${CONFIG.maxIterations}`);
    console.log(`${"═".repeat(60)}\n`);

    // Step 1: Get Design Director review
    console.log("📋 Getting Design Director review...");
    const review = await designDirectorReview(CONFIG.projectRoot, {
      previousFeedback: previousReview,
      iteration
    });

    // Display review
    console.log(formatDesignReview(review));

    // Save review history
    await saveReviewHistory(iteration, review);

    // Check if approved
    if (review.approved && review.overallScore >= CONFIG.minApprovalScore) {
      console.log("\n🎉 DESIGN APPROVED! The Design Director is happy with the design.\n");
      break;
    }

    // Step 2: Build prompt with design feedback
    console.log("📝 Building prompt with design feedback...");
    const designFeedback = buildDesignFeedbackPrompt(review);
    const prompt = await buildIterationPrompt(iteration, designFeedback, previousErrors);

    // Step 3: Call Claude for code generation
    console.log("🤖 Generating design improvements...");
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

      // Reset errors for next iteration
      previousErrors = [];
      previousReview = review;

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
  console.log("║               DESIGN BUILD LOOP SUMMARY                  ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  console.log(`   Iterations: ${iteration}/${CONFIG.maxIterations}`);
  console.log(`   Total Input Tokens: ${totalTokens.input.toLocaleString()}`);
  console.log(`   Total Output Tokens: ${totalTokens.output.toLocaleString()}`);

  // Estimate cost (Sonnet pricing)
  const estimatedCost = (totalTokens.input * 0.003 + totalTokens.output * 0.015) / 1000;
  console.log(`   Estimated Cost: $${estimatedCost.toFixed(2)}`);

  // Final design review
  const finalReview = await designDirectorReview(CONFIG.projectRoot, { iteration });
  console.log(formatDesignReview(finalReview));

  if (finalReview.approved) {
    console.log("\n   ✅ DESIGN COMPLETE - Design Director Approved!");
  } else {
    console.log("\n   ⚠️  Max iterations reached - review and continue if needed");
    console.log(`   Final Score: ${finalReview.overallScore}/10`);
  }

  console.log("\n");

  return { finalReview, iterations: iteration, tokens: totalTokens };
}

// Run it
runDesignBuildLoop().catch(console.error);
