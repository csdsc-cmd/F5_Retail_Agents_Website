#!/usr/bin/env node
/**
 * Project Plan Generator
 *
 * Interactive CLI that interviews you about your project and generates
 * a PROJECT_PLAN.md ready for the build loop.
 *
 * Usage:
 *   node generatePlan.js              # Full interview
 *   node generatePlan.js --quick      # Minimal questions
 *   node generatePlan.js --from-brief "description here"  # Generate from brief
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import readline from "readline";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const anthropic = new Anthropic();

// === HELPERS ===
function createRL() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function ask(rl, prompt, defaultVal = "") {
  return new Promise((resolve) => {
    const fullPrompt = defaultVal ? `${prompt} [${defaultVal}]: ` : `${prompt}: `;
    rl.question(fullPrompt, (answer) => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

// === LOAD KNOWLEDGE BASE ===
async function loadKnowledgeBase() {
  const sections = [];
  const knowledgePath = path.join(process.cwd(), "knowledge");

  const files = [
    { path: "static/PROJECT_CONTEXT.md", name: "Project Context" },
    { path: "static/TECH_STACK.md", name: "Tech Stack" },
    { path: "static/CODING_STANDARDS.md", name: "Coding Standards" },
  ];

  for (const file of files) {
    try {
      const content = await fs.readFile(path.join(knowledgePath, file.path), "utf-8");
      sections.push(`## ${file.name}\n${content}`);
    } catch (e) {
      // File doesn't exist
    }
  }

  // Load patterns
  try {
    const patternsPath = path.join(knowledgePath, "learned", "patterns");
    const patterns = await fs.readdir(patternsPath);
    const patternList = patterns.filter(p => p.endsWith(".ts") || p.endsWith(".tsx"));
    if (patternList.length > 0) {
      sections.push(`## Available Patterns\n${patternList.map(p => `- ${p}`).join("\n")}`);
    }
  } catch (e) {
    // Patterns don't exist
  }

  return sections.join("\n\n---\n\n");
}

// === GENERATE PLAN FROM BRIEF ===
async function generateFromBrief(brief) {
  console.log("\n🤖 Generating PROJECT_PLAN.md from brief...\n");

  const knowledge = await loadKnowledgeBase();

  const prompt = `You are a technical architect creating a PROJECT_PLAN.md for an Azure AI Foundry application.

## Knowledge Base (Follow These Standards)
${knowledge}

## User's Project Brief
${brief}

## Your Task

Generate a comprehensive PROJECT_PLAN.md that:

1. Interprets the user's brief into specific requirements
2. Defines the AI agent's role, instructions, and capabilities
3. Breaks implementation into phases with specific file-level tasks
4. Includes clear success criteria
5. Uses the completion signal "BUILD_COMPLETE"

## Required Structure

\`\`\`markdown
# Project Implementation Plan

## Project Overview

### Project Name
[Infer from brief]

### Description
[2-3 sentences based on brief]

### Target Users
[Infer from brief]

---

## Agent Configuration

### Agent Name
[Appropriate name]

### Agent Instructions
\`\`\`
[Detailed multi-line instructions for the Azure AI Foundry agent]
[Include: role, tone, capabilities, limitations, response format]
[Be specific - this goes directly into the agent creation]
\`\`\`

### Agent Tools
[none | code_interpreter | file_search | list any custom functions]

---

## Implementation Phases

### Phase 1: Project Setup & Configuration
- [ ] Create backend package.json with dependencies (file: backend/package.json)
- [ ] Create TypeScript configuration (file: backend/tsconfig.json)
- [ ] Create environment configuration (file: backend/src/config/env.ts)
- [ ] Create type definitions (file: backend/src/types/index.ts)

### Phase 2: Azure Agent Service
- [ ] Create AgentService wrapper class (file: backend/src/services/agentService.ts)
- [ ] Create agent configuration (file: backend/src/config/agentConfig.ts)

### Phase 3: API Routes
- [ ] Create Express server entry point (file: backend/src/index.ts)
- [ ] Create thread routes (file: backend/src/routes/threads.ts)
- [ ] Create health check route (file: backend/src/routes/health.ts)
- [ ] Create error handling middleware (file: backend/src/middleware/errorHandler.ts)

### Phase 4: Frontend Setup
- [ ] Create frontend package.json (file: frontend/package.json)
- [ ] Create Vite configuration (file: frontend/vite.config.ts)
- [ ] Create MSAL auth configuration (file: frontend/src/auth/msalConfig.ts)
- [ ] Create API client service (file: frontend/src/services/api.ts)

### Phase 5: Chat Interface
- [ ] Create main App component (file: frontend/src/App.tsx)
- [ ] Create ChatInterface component (file: frontend/src/components/ChatInterface.tsx)
- [ ] Create Message component (file: frontend/src/components/Message.tsx)
- [ ] Create chat styles (file: frontend/src/components/ChatInterface.css)

### Phase 6: Integration & Polish
- [ ] Create README with setup instructions (file: README.md)
- [ ] Add error boundaries (file: frontend/src/components/ErrorBoundary.tsx)
- [ ] Final integration testing

---

## File Manifest

| File | Purpose | Phase |
|------|---------|-------|
| backend/package.json | Backend dependencies | 1 |
| backend/tsconfig.json | TypeScript config | 1 |
| backend/src/config/env.ts | Environment variables | 1 |
| backend/src/types/index.ts | TypeScript interfaces | 1 |
| backend/src/services/agentService.ts | Azure AI Agent wrapper | 2 |
| backend/src/index.ts | Express server | 3 |
| backend/src/routes/threads.ts | Thread/message endpoints | 3 |
| backend/src/middleware/errorHandler.ts | Error handling | 3 |
| frontend/package.json | Frontend dependencies | 4 |
| frontend/src/auth/msalConfig.ts | MSAL configuration | 4 |
| frontend/src/services/api.ts | API client | 4 |
| frontend/src/App.tsx | Main React app | 5 |
| frontend/src/components/ChatInterface.tsx | Chat UI | 5 |
| README.md | Project documentation | 6 |

---

## Success Criteria

### Backend
- [ ] TypeScript compiles without errors
- [ ] Server starts on configured port
- [ ] POST /api/threads creates a new thread and returns threadId
- [ ] POST /api/threads/:id/messages sends message and returns agent response
- [ ] GET /api/threads/:id/messages returns conversation history
- [ ] DELETE /api/threads/:id cleans up thread
- [ ] Error responses follow consistent format

### Frontend
- [ ] React app compiles without errors
- [ ] MSAL authentication flow works
- [ ] Chat interface renders correctly
- [ ] Messages display user and assistant roles
- [ ] Loading states show during API calls
- [ ] Error states display user-friendly messages

### Integration
- [ ] Frontend successfully authenticates with Azure AD
- [ ] Frontend can create threads via backend
- [ ] Full conversation flow works end-to-end
- [ ] Agent responses are contextually appropriate

---

## Completion Signal

When ALL success criteria above are met, add this comment to \`backend/src/index.ts\`:

\`\`\`typescript
// BUILD_COMPLETE
\`\`\`

---

## Notes for Build Loop

### Iteration Strategy
- Phase 1-2: ~5-10 iterations (setup and core service)
- Phase 3: ~5-10 iterations (API routes)
- Phase 4-5: ~10-15 iterations (frontend)
- Phase 6: ~5 iterations (polish)

### Validation Checks
Each iteration runs:
- \`tsc --noEmit\` (TypeScript check)
- \`npm run lint\` (if configured)
- \`npm test\` (if tests exist)

### Error Handling
- TypeScript errors feed back into next iteration
- Missing imports are auto-detected
- Pattern violations trigger corrections

---

*Generated: ${new Date().toISOString()}*
\`\`\`

Generate the complete plan now, filling in all sections based on the user's brief. Be specific and detailed, especially in the Agent Instructions section.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  let plan = response.content[0].type === "text" ? response.content[0].text : "";

  // Extract markdown if wrapped in code block
  const match = plan.match(/```markdown\n([\s\S]*?)```/);
  if (match) {
    plan = match[1];
  }

  return plan;
}

// === INTERACTIVE MODE ===
async function interactiveMode() {
  const rl = createRL();

  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        📋 PROJECT PLAN GENERATOR 📋                      ║");
  console.log("║                                                          ║");
  console.log("║  Answer a few questions to generate your PROJECT_PLAN.md ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  // Collect answers
  const projectName = await ask(rl, "Project name", "AI Assistant");
  const description = await ask(rl, "What does this agent do? (1-2 sentences)");
  const agentName = await ask(rl, "Agent name", "Assistant");
  const capabilities = await ask(rl, "What can the agent do? (comma-separated)", "Answer questions, Provide information");
  const users = await ask(rl, "Who will use this?", "End users");
  const additionalFeatures = await ask(rl, "Any special features? (or 'none')", "none");

  rl.close();

  // Build brief from answers
  const brief = `
Project: ${projectName}
Description: ${description}
Agent Name: ${agentName}
Agent Capabilities: ${capabilities}
Target Users: ${users}
Additional Features: ${additionalFeatures}
  `.trim();

  return await generateFromBrief(brief);
}

// === QUICK MODE ===
async function quickMode() {
  const rl = createRL();

  console.log("\n🚀 Quick Mode\n");

  const description = await ask(rl, "Describe your project in one sentence");

  rl.close();

  return await generateFromBrief(description);
}

// === MAIN ===
async function main() {
  const args = process.argv.slice(2);

  let plan;

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
Project Plan Generator

Usage:
  node generatePlan.js              Interactive mode (recommended)
  node generatePlan.js --quick      Quick mode (one question)
  node generatePlan.js --from-brief "Your project description here"

Options:
  --output=path    Save to specific path (default: ./PROJECT_PLAN.md)
  --help, -h       Show this help

Examples:
  node generatePlan.js
  node generatePlan.js --quick
  node generatePlan.js --from-brief "A customer support chatbot that helps users track orders"
  node generatePlan.js --from-brief "Code review assistant" --output=./projects/reviewer/PROJECT_PLAN.md
`);
    return;
  }

  // Check for --from-brief
  const briefIndex = args.indexOf("--from-brief");
  if (briefIndex !== -1 && args[briefIndex + 1]) {
    const brief = args[briefIndex + 1];
    plan = await generateFromBrief(brief);
  } else if (args.includes("--quick")) {
    plan = await quickMode();
  } else {
    plan = await interactiveMode();
  }

  // Determine output path
  const outputArg = args.find(a => a.startsWith("--output="));
  const outputPath = outputArg
    ? outputArg.split("=")[1]
    : path.join(process.cwd(), "PROJECT_PLAN.md");

  // Save
  await fs.writeFile(outputPath, plan, "utf-8");

  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║        ✅ PROJECT_PLAN.md GENERATED!                     ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");
  console.log(`📄 Saved to: ${outputPath}`);
  console.log("\nNext steps:");
  console.log("  1. Review and edit PROJECT_PLAN.md as needed");
  console.log("  2. Start the build loop:");
  console.log("     node buildLoop.js --max-iterations 30");
  console.log("\n");
}

main().catch(console.error);
