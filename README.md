# Claude Agent System

Multi-agent code generation system for **Azure AI Foundry** applications with automated quality assurance, iterative build loops, and cost tracking.

## 🎯 Quick Start

```bash
cd ~/claude-agents

# Install dependencies
npm install

# Copy environment template and add your API key
cp .env.example .env

# Generate a project plan (interactive)
node generatePlan.js

# Or from a brief description
node generatePlan.js --from-brief "A customer support chatbot for order tracking"

# Run the build loop
node buildLoop.js --max-iterations 30
```

## 🏗️ Template Project

This is a **template** for building AI agent applications on Azure AI Foundry. To create a new project:

1. **Duplicate this folder** for your project
2. **Generate PROJECT_PLAN.md** using `node generatePlan.js`
3. **Run the build loop** to generate code

## 📋 Generate Project Plan

**Start here!** The plan generator interviews you about your project and creates a properly formatted PROJECT_PLAN.md:

```bash
# Interactive mode (recommended)
node generatePlan.js

# Quick mode (one question)
node generatePlan.js --quick

# From a brief description
node generatePlan.js --from-brief "A code review assistant that analyzes PRs"
```

The generator creates a plan with:
- Agent configuration (name, detailed instructions, tools)
- Implementation phases with file-level tasks
- Success criteria for validation
- Completion signal for the build loop

## 🔄 Build Loop (Ralph Wiggum Style)

**Recommended for new projects.** Uses iterative self-improvement:

```bash
# Start build loop (default: 50 iterations)
node buildLoop.js

# With custom settings
node buildLoop.js --max-iterations 30 --completion-promise "AZURE_AGENT_COMPLETE"
```

### How It Works

1. Reads `PROJECT_PLAN.md` for requirements
2. Loads knowledge base (patterns, standards, glossary)
3. Generates code → saves to disk
4. Runs validation (typecheck, lint, tests)
5. **Feeds errors back into next iteration**
6. Repeats until completion promise found

**Philosophy**: The same prompt is fed every iteration. Claude sees its own previous work and improves on it. Failures are data.

### Completion

Add this comment to signal completion:
```typescript
// BUILD_COMPLETE
```

The loop stops when this text is found in source files.

## 🛡️ QA Pipeline

**For existing code or when you need thorough validation:**

```bash
# Test mode - process one task
node qaPipeline.js test

# Process a specific phase
node qaPipeline.js phase "Backend API"

# Process all tasks with QA
node qaPipeline.js all

# Resume interrupted pipeline
node qaPipeline.js all --resume
```

### QA Agents (Run in Parallel)

1. **Quality Gate** - Code quality and patterns
2. **Architecture Consistency** - Matches project structure
3. **Integration Validation** - Works with dependencies
4. **Security Audit** - No vulnerabilities
5. **Best Practices** - Follows coding standards

## 📁 Project Structure

```
claude-agents/
├── knowledge/                  # Knowledge base for code generation
│   ├── static/                 # Human-maintained (edit these)
│   │   ├── PROJECT_CONTEXT.md  # What this project does
│   │   ├── TECH_STACK.md       # Approved/forbidden dependencies
│   │   ├── CODING_STANDARDS.md # How to write code
│   │   └── GLOSSARY.md         # Domain terms
│   └── learned/                # Agent-maintained
│       └── patterns/           # Code patterns to follow
│           ├── azure-agent-service.ts
│           ├── azure-express-routes.ts
│           ├── react-chat-component.tsx
│           └── msal-auth-config.ts
│
├── agents/                     # AI agent modules
│   ├── codeGeneratorAgent.js   # Code generation (Opus 4)
│   └── qaAgents.js             # 5 QA agents (Sonnet)
│
├── utils/                      # Utilities
│   ├── checkpoint.js           # Resume support
│   ├── costTracker.js          # API cost tracking
│   └── helpers.js              # JSON parsing, caching
│
├── generatePlan.js             # 📋 Project plan generator
├── buildLoop.js                # 🔄 Ralph Wiggum iteration loop
├── qaPipeline.js               # 🛡️ Multi-agent QA pipeline
│
├── PROJECT_PLAN.md             # Your project requirements (generated)
├── PROJECT_PLAN_TEMPLATE.md    # Manual template option
│
└── .claude/commands/           # Claude Code commands
    ├── generate-plan.md        # /generate-plan
    ├── build-loop.md           # /build-loop
    └── qa-pipeline.md          # /qa-pipeline
```

## 📋 Knowledge Base

The knowledge base provides context for code generation:

| File | Purpose | Edit? |
|------|---------|-------|
| `PROJECT_CONTEXT.md` | What the project does | ✏️ Yes |
| `TECH_STACK.md` | Required packages, forbidden deps | ✏️ Yes |
| `CODING_STANDARDS.md` | TypeScript patterns, file naming | ✏️ Yes |
| `GLOSSARY.md` | Domain-specific terms | ✏️ Yes |
| `patterns/*.ts` | Code patterns to follow | 🤖 Auto |

## ⚙️ Configuration

### Environment Variables

```bash
ANTHROPIC_API_KEY=your_key_here

# Optional
PROJECT_PATH=/path/to/output      # Where to save generated code
MAX_ITERATIONS=50                 # Build loop iterations
COMPLETION_PROMISE=BUILD_COMPLETE # Completion signal
MIN_PASS_SCORE=70                 # QA minimum score
API_TIMEOUT=180000                # Timeout in ms
CLAUDE_MODEL=claude-sonnet-4-20250514
```

## 🚀 Typical Workflow

### New Project

```bash
# 1. Duplicate template
cp -r ~/claude-agents ~/my-new-agent

# 2. Fill in project plan
cd ~/my-new-agent
cp PROJECT_PLAN_TEMPLATE.md PROJECT_PLAN.md
# Edit PROJECT_PLAN.md with your requirements

# 3. Run build loop
node buildLoop.js --max-iterations 30

# 4. Check output in your project directory
```

### Existing Project Improvements

```bash
# Run QA on specific phase
node qaPipeline.js phase "Backend API"

# Run full QA
node qaPipeline.js all
```

## 📊 Cost Tracking

Every run shows cost summary:

```
💰 COST SUMMARY
════════════════════════════════════════
   Total Cost: $0.45
   Iterations: 12
   Tokens: 45,000 in / 28,000 out

   By Model:
      claude-sonnet-4: $0.45
```

## 🎯 Azure AI Foundry Output

Generated code follows Azure AI Foundry patterns:

- **Backend**: Express + `@azure/ai-agents` + `@azure/identity`
- **Frontend**: React + `@azure/msal-react`
- **Auth**: Azure AD / Entra ID
- **Observability**: Application Insights via OpenTelemetry

See `knowledge/learned/patterns/` for exact patterns used.

## 🛠️ Claude Code Commands

If using Claude Code CLI:

```bash
/generate-plan                    # Interactive plan generator
/generate-plan --quick            # Quick mode
/build-loop --max-iterations 30   # Start build loop
/qa-pipeline phase "Backend"      # Run QA on phase
```

## ✅ Features

- ✅ **Interactive Plan Generator** - Creates properly formatted PROJECT_PLAN.md
- ✅ **Ralph Wiggum-style Builds** - Iterative self-improvement loops
- ✅ **Multi-agent QA Pipeline** - 5 parallel validation agents
- ✅ **Azure AI Foundry Patterns** - Production-ready code templates
- ✅ **Knowledge Base** - Context injection for consistent output
- ✅ **Checkpoint/Resume** - Recover from interruptions
- ✅ **Cost Tracking** - Monitor API usage in real-time
- ✅ **TypeScript Strict Mode** - Type-safe generated code
- ✅ **Automatic Error Feedback** - Errors feed into next iteration
