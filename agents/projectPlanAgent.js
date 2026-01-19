/**
 * Project Plan Generator Agent
 *
 * Interviews the user about their project and generates a properly formatted
 * PROJECT_PLAN.md that works with:
 * - Build Loop (Ralph Wiggum style iteration)
 * - QA Pipeline (multi-agent validation)
 * - Knowledge Base (patterns, standards)
 *
 * The generated plan includes:
 * - Clear completion criteria (for Ralph Wiggum)
 * - Phased implementation (for QA pipeline)
 * - File-level tasks (for code generation)
 * - Success criteria (for validation)
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs/promises";
import path from "path";
import readline from "readline";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// === INTERVIEW QUESTIONS ===
const INTERVIEW_SECTIONS = [
  {
    id: "overview",
    title: "Project Overview",
    questions: [
      {
        key: "projectName",
        question: "What is the name of your project?",
        example: "Customer Support Agent",
        required: true,
      },
      {
        key: "description",
        question: "Describe what this AI agent application does (2-3 sentences):",
        example: "An AI-powered customer support agent that helps users with product questions, order tracking, and troubleshooting. It integrates with our CRM to provide personalized responses.",
        required: true,
      },
      {
        key: "primaryUsers",
        question: "Who are the primary users of this application?",
        example: "Customer support team members and end customers via chat widget",
        required: true,
      },
    ],
  },
  {
    id: "agent",
    title: "Agent Configuration",
    questions: [
      {
        key: "agentName",
        question: "What should the AI agent be named?",
        example: "SupportBot, CodeReviewer, DataAnalyst",
        required: true,
      },
      {
        key: "agentPersonality",
        question: "Describe the agent's personality and tone:",
        example: "Professional but friendly, concise responses, always offers next steps",
        required: true,
      },
      {
        key: "agentCapabilities",
        question: "What should the agent be able to do? (comma-separated list)",
        example: "Answer product questions, Look up order status, Troubleshoot common issues, Escalate to human",
        required: true,
      },
      {
        key: "agentTools",
        question: "Does the agent need special tools? (none, code_interpreter, file_search, custom)",
        example: "none",
        required: false,
        default: "none",
      },
    ],
  },
  {
    id: "backend",
    title: "Backend Requirements",
    questions: [
      {
        key: "additionalEndpoints",
        question: "Any additional API endpoints beyond chat? (comma-separated, or 'none')",
        example: "GET /api/orders/:id, POST /api/feedback, GET /api/knowledge-base/search",
        required: false,
        default: "none",
      },
      {
        key: "externalIntegrations",
        question: "External services to integrate with? (comma-separated, or 'none')",
        example: "Salesforce CRM, Stripe API, SendGrid email",
        required: false,
        default: "none",
      },
      {
        key: "database",
        question: "Database requirements? (none, cosmos-db, postgresql, or other)",
        example: "none",
        required: false,
        default: "none",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Requirements",
    questions: [
      {
        key: "additionalPages",
        question: "Pages beyond the main chat interface? (comma-separated, or 'none')",
        example: "Conversation history, Settings, Admin dashboard",
        required: false,
        default: "none",
      },
      {
        key: "styling",
        question: "Any specific styling requirements? (brand colors, dark mode, etc.)",
        example: "Dark mode support, brand color #4F46E5",
        required: false,
        default: "Clean, modern design with light/dark mode",
      },
      {
        key: "mobileSupport",
        question: "Mobile responsive required? (yes/no)",
        example: "yes",
        required: false,
        default: "yes",
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & Auth",
    questions: [
      {
        key: "authType",
        question: "Authentication type? (single-tenant, multi-tenant, public)",
        example: "single-tenant (internal company app)",
        required: false,
        default: "single-tenant",
      },
      {
        key: "additionalAzureServices",
        question: "Additional Azure services needed? (comma-separated, or 'none')",
        example: "Key Vault, Blob Storage, Service Bus",
        required: false,
        default: "none",
      },
    ],
  },
  {
    id: "completion",
    title: "Completion Criteria",
    questions: [
      {
        key: "mustHaveFeatures",
        question: "Must-have features for v1 (comma-separated):",
        example: "Chat interface works, Agent responds correctly, Auth flow complete",
        required: true,
      },
      {
        key: "niceToHaveFeatures",
        question: "Nice-to-have features (comma-separated, or 'none'):",
        example: "Conversation export, Analytics dashboard, Multi-language support",
        required: false,
        default: "none",
      },
      {
        key: "completionPromise",
        question: "Completion signal text (what marks the project as done):",
        example: "BUILD_COMPLETE",
        required: false,
        default: "BUILD_COMPLETE",
      },
    ],
  },
];

// === READLINE INTERFACE ===
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askQuestion(rl, question, example, defaultValue) {
  return new Promise((resolve) => {
    let prompt = `\n${question}\n`;
    if (example) prompt += `   Example: ${example}\n`;
    if (defaultValue) prompt += `   Default: ${defaultValue}\n`;
    prompt += "> ";

    rl.question(prompt, (answer) => {
      const trimmed = answer.trim();
      resolve(trimmed || defaultValue || "");
    });
  });
}

// === INTERVIEW CONDUCTOR ===
async function conductInterview() {
  const rl = createReadlineInterface();
  const answers = {};

  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║                                                          ║");
  console.log("║        📋 PROJECT PLAN GENERATOR 📋                      ║");
  console.log("║                                                          ║");
  console.log("║  I'll ask you questions about your project and          ║");
  console.log("║  generate a PROJECT_PLAN.md ready for the build loop.   ║");
  console.log("║                                                          ║");
  console.log("║  Press Enter to accept defaults. Type 'skip' to skip.   ║");
  console.log("║                                                          ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log("\n");

  for (const section of INTERVIEW_SECTIONS) {
    console.log(`\n${"─".repeat(50)}`);
    console.log(`📌 ${section.title}`);
    console.log(`${"─".repeat(50)}`);

    for (const q of section.questions) {
      if (q.required) {
        let answer = "";
        while (!answer) {
          answer = await askQuestion(rl, q.question, q.example, q.default);
          if (!answer) {
            console.log("   ⚠️  This field is required.");
          }
        }
        answers[q.key] = answer;
      } else {
        const answer = await askQuestion(rl, q.question, q.example, q.default);
        answers[q.key] = answer === "skip" ? q.default || "" : answer;
      }
    }
  }

  rl.close();
  return answers;
}

// === PLAN GENERATOR ===
async function generatePlan(answers) {
  console.log("\n\n🤖 Generating PROJECT_PLAN.md...\n");

  const prompt = `You are a technical architect creating a PROJECT_PLAN.md for an Azure AI Foundry application.

## User's Answers

${JSON.stringify(answers, null, 2)}

## Requirements

Generate a comprehensive PROJECT_PLAN.md that includes:

1. **Project Overview** - Name, description, target users
2. **Agent Configuration** - Name, instructions (detailed), tools
3. **Implementation Phases** - Broken into Backend, Frontend, Integration phases
4. **File-Level Tasks** - Specific files to create with descriptions
5. **Success Criteria** - Clear, measurable completion criteria
6. **Completion Signal** - The exact text "${answers.completionPromise || "BUILD_COMPLETE"}" to add when done

## Format Requirements

The plan MUST follow this exact structure for the build loop and QA pipeline:

\`\`\`markdown
# Project Implementation Plan

## Project Overview
### Project Name
### Description
### Target Users

## Agent Configuration
### Agent Name
### Agent Instructions
(Detailed multi-line instructions for the agent)
### Agent Tools

## Implementation Phases

### Phase 1: Backend Foundation
- [ ] Task description (file: path/to/file.ts)
- [ ] Task description (file: path/to/file.ts)

### Phase 2: Agent Service
- [ ] Task description (file: path/to/file.ts)

### Phase 3: API Routes
- [ ] Task description (file: path/to/file.ts)

### Phase 4: Frontend Foundation
- [ ] Task description (file: path/to/file.tsx)

### Phase 5: Chat Interface
- [ ] Task description (file: path/to/file.tsx)

### Phase 6: Integration & Testing
- [ ] Task description

## File Manifest
(List every file to be created with purpose)

| File | Purpose |
|------|---------|
| backend/src/index.ts | Express server entry point |
| ... | ... |

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
...

## Completion Signal
When ALL success criteria are met, add this comment to backend/src/index.ts:
\\\`\\\`\\\`typescript
// ${answers.completionPromise || "BUILD_COMPLETE"}
\\\`\\\`\\\`

## Notes for Build Loop
- Each phase should be completable in 5-10 iterations
- Files should be created in dependency order
- Validation runs after each iteration (tsc, eslint)
- Errors feed back into next iteration automatically
\`\`\`

## Important Guidelines

1. **Agent Instructions**: Write detailed, multi-paragraph instructions that define:
   - The agent's role and expertise
   - How it should respond (tone, format, length)
   - What it can and cannot do
   - How to handle edge cases

2. **File Tasks**: Each task should specify:
   - The exact file path
   - What the file should contain
   - Dependencies on other files

3. **Phases**: Order phases so dependencies are created first:
   - Phase 1: Config, types, utilities
   - Phase 2: Core services (AgentService)
   - Phase 3: API routes
   - Phase 4: Frontend setup
   - Phase 5: Main components
   - Phase 6: Integration

4. **Success Criteria**: Make them specific and testable:
   - ✅ "Backend compiles without TypeScript errors"
   - ✅ "POST /api/threads returns 201 with threadId"
   - ❌ "Backend works" (too vague)

Generate the complete PROJECT_PLAN.md now:`;

  const response = await anthropic.messages.create({
    model: "claude-opus-4-5-20251101",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const plan = response.content[0].type === "text" ? response.content[0].text : "";

  // Extract just the markdown content
  const markdownMatch = plan.match(/```markdown\n([\s\S]*?)```/) ||
                        plan.match(/# Project Implementation Plan[\s\S]*/);

  return markdownMatch ? (markdownMatch[1] || markdownMatch[0]) : plan;
}

// === ENHANCE PLAN WITH KNOWLEDGE BASE CONTEXT ===
async function enhancePlanWithKnowledge(plan, knowledgePath) {
  // Load tech stack to ensure plan aligns
  try {
    const techStack = await fs.readFile(
      path.join(knowledgePath, "static", "TECH_STACK.md"),
      "utf-8"
    );

    const codingStandards = await fs.readFile(
      path.join(knowledgePath, "static", "CODING_STANDARDS.md"),
      "utf-8"
    );

    // Add knowledge base references to the plan
    const enhancedPlan = `${plan}

---

## Knowledge Base References

This plan should be implemented following:
- **TECH_STACK.md** - Use only approved dependencies
- **CODING_STANDARDS.md** - Follow TypeScript patterns
- **patterns/*.ts** - Use provided code patterns

### Key Patterns to Use
- \`azure-agent-service.ts\` - AgentService wrapper
- \`azure-express-routes.ts\` - Express route structure
- \`react-chat-component.tsx\` - ChatInterface component
- \`msal-auth-config.ts\` - MSAL configuration

---

*Generated: ${new Date().toISOString()}*
`;

    return enhancedPlan;
  } catch (e) {
    // Knowledge base not found, return plan as-is
    return plan;
  }
}

// === MAIN ===
async function main() {
  try {
    // Check for --quick mode (uses defaults/prompts)
    const quickMode = process.argv.includes("--quick");
    const outputPath = process.argv.find(a => a.startsWith("--output="))?.split("=")[1];

    let answers;

    if (quickMode) {
      // Quick mode: minimal questions
      const rl = createReadlineInterface();

      console.log("\n🚀 Quick Mode - Minimal Questions\n");

      answers = {
        projectName: await askQuestion(rl, "Project name:", "Customer Support Agent", ""),
        description: await askQuestion(rl, "What does this agent do?", "", ""),
        agentName: await askQuestion(rl, "Agent name:", "Assistant", "Assistant"),
        agentCapabilities: await askQuestion(rl, "Agent capabilities (comma-separated):", "", "General assistance"),
        completionPromise: "BUILD_COMPLETE",
        primaryUsers: "End users",
        agentPersonality: "Helpful and professional",
        agentTools: "none",
        additionalEndpoints: "none",
        externalIntegrations: "none",
        database: "none",
        additionalPages: "none",
        styling: "Clean, modern design",
        mobileSupport: "yes",
        authType: "single-tenant",
        additionalAzureServices: "none",
        mustHaveFeatures: "Chat interface, Agent responses, Basic error handling",
        niceToHaveFeatures: "none",
      };

      rl.close();
    } else {
      // Full interview
      answers = await conductInterview();
    }

    // Generate plan
    const plan = await generatePlan(answers);

    // Enhance with knowledge base
    const knowledgePath = path.join(process.cwd(), "knowledge");
    const enhancedPlan = await enhancePlanWithKnowledge(plan, knowledgePath);

    // Save plan
    const savePath = outputPath || path.join(process.cwd(), "PROJECT_PLAN.md");
    await fs.writeFile(savePath, enhancedPlan, "utf-8");

    console.log("\n");
    console.log("╔══════════════════════════════════════════════════════════╗");
    console.log("║                                                          ║");
    console.log("║        ✅ PROJECT_PLAN.md GENERATED! ✅                  ║");
    console.log("║                                                          ║");
    console.log("╚══════════════════════════════════════════════════════════╝");
    console.log("\n");
    console.log(`📄 Saved to: ${savePath}`);
    console.log("\n");
    console.log("Next steps:");
    console.log("  1. Review PROJECT_PLAN.md and adjust as needed");
    console.log("  2. Run the build loop:");
    console.log("     node buildLoop.js --max-iterations 30");
    console.log("\n");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Export for use as module
export { conductInterview, generatePlan, enhancePlanWithKnowledge };

// Run if called directly
main();
