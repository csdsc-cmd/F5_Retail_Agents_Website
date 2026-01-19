# /generate-plan

Generate a PROJECT_PLAN.md through an interactive interview or from a brief description.

## Description

This command helps you create a properly formatted PROJECT_PLAN.md that works with:
- **Build Loop** (Ralph Wiggum style iteration)
- **QA Pipeline** (multi-agent validation)
- **Knowledge Base** (patterns and standards)

The generated plan includes:
- Agent configuration with detailed instructions
- Phased implementation with file-level tasks
- Success criteria for validation
- Completion signal for the build loop

## Usage

```
/generate-plan                              # Interactive interview
/generate-plan --quick                      # One question mode
/generate-plan --from-brief "description"   # Generate from text
```

## Modes

### Interactive (default)
Asks 6 questions:
1. Project name
2. What the agent does
3. Agent name
4. Agent capabilities
5. Target users
6. Special features

### Quick
Single question: "Describe your project in one sentence"

### From Brief
Pass a description directly without prompts.

## Examples

```bash
# Interactive
node generatePlan.js

# Quick
node generatePlan.js --quick

# From brief
node generatePlan.js --from-brief "A code review assistant that analyzes pull requests and provides feedback"

# Save to custom location
node generatePlan.js --from-brief "Support chatbot" --output=./my-project/PROJECT_PLAN.md
```

## What Gets Generated

```markdown
# Project Implementation Plan

## Project Overview
- Name, description, users

## Agent Configuration
- Name and detailed instructions
- Tools (code_interpreter, file_search, etc.)

## Implementation Phases
- Phase 1: Setup & Config
- Phase 2: Agent Service
- Phase 3: API Routes
- Phase 4: Frontend Setup
- Phase 5: Chat Interface
- Phase 6: Integration

## File Manifest
- Every file to create with purpose

## Success Criteria
- Specific, testable requirements

## Completion Signal
- BUILD_COMPLETE marker
```

## After Generation

1. **Review** the generated PROJECT_PLAN.md
2. **Edit** any details that need adjustment
3. **Run** the build loop:
   ```bash
   node buildLoop.js --max-iterations 30
   ```

## Tips

- Be specific about agent capabilities
- Include any integrations needed
- Mention authentication requirements
- Describe the user experience you want
