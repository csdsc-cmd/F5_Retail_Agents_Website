# 🛡️ Multi-Agent QA Pipeline System

## 🎯 What This Does

The QA Pipeline generates **production-quality code** with automated quality assurance:

1. **Generates code** using Claude Opus 4
2. **Runs 5 QA agents in parallel** to check quality
3. **Auto-fixes issues** if problems are found
4. **Repeats up to 3 times** until quality standards are met
5. **Saves checkpoints** so you can resume if interrupted
6. **Tracks costs** per agent and model
7. **Only saves code** that passes all quality gates

---

## 🚀 Quick Start

```bash
cd ~/claude-agents

# Test with one file first (recommended)
node qaPipeline.js test

# Process a phase
node qaPipeline.js phase "Database Setup"

# Process everything
node qaPipeline.js all
```

---

## 📌 Checkpoint/Resume (NEW!)

Long pipelines can now be **resumed if interrupted**:

```bash
# Run a long pipeline
node qaPipeline.js all

# If it crashes or you Ctrl+C...
# Next time you run, you'll see:
╔══════════════════════════════════════════════════════════╗
║              📌 CHECKPOINT FOUND                         ║
╚══════════════════════════════════════════════════════════╝

   Mode: all
   Progress: 5/12 tasks completed
   Last completed: backend/routes/api.js
   Saved at: 1/6/2025, 2:30:15 PM

   Options:
   • Run with --resume to continue from checkpoint
   • Run with --fresh to start over
```

### Resume Commands

```bash
# Continue from where you left off
node qaPipeline.js all --resume

# Start fresh (clear checkpoint)
node qaPipeline.js all --fresh

# Works with all modes
node qaPipeline.js phase "Backend" --resume
```

### How Checkpoints Work

- Progress saved after **each task completes**
- Stores: completed tasks, results, scores, timestamps
- Saved to `.checkpoints/qa-pipeline.json`
- Auto-cleared on successful completion
- Preserved on failure for resume

---

## 💰 Cost Tracking (NEW!)

Every pipeline run shows a cost summary:

```
💰 COST SUMMARY
════════════════════════════════════════
   Total Cost: $0.1234
   API Calls: 15
   Duration: 45.2s
   Tokens: 12,500 in / 8,200 out

   By Model:
      Opus 4: $0.0890
      Sonnet 4.5: $0.0344

   By Agent:
      codeGeneratorAgent: $0.0650
      qualityGateAgent: $0.0120
      securityAuditAgent: $0.0098
      ...
```

Cost tracking helps you:
- Monitor API spend per run
- Identify expensive agents
- Compare Opus vs Sonnet usage
- Budget for large projects

---

## 🤖 The QA Team (5 Agents)

All QA agents run **in parallel** using Sonnet 4.5 for speed:

### 1. **Quality Gate Agent** 🔍
- No syntax errors
- Proper error handling
- Follows project conventions
- Has necessary imports
- DRY principles
- Clear comments
- No hardcoded values

### 2. **Architecture Consistency Agent** 🏗️
- Matches PROJECT_PLAN.md
- Follows database schema
- Uses correct API structure
- Consistent with existing code
- No unauthorized deviations

### 3. **Integration Validation Agent** 🔗
- Imports are correct
- Function signatures match
- Data structures compatible
- API contracts maintained
- No circular dependencies

### 4. **Security Audit Agent** 🔒
- SQL injection vulnerabilities
- XSS vulnerabilities
- Auth/authorization issues
- Exposed sensitive data
- Hardcoded secrets
- Input validation gaps

### 5. **Best Practices Agent** ⭐
- Code organization
- Naming conventions
- Documentation quality
- Performance considerations
- SOLID principles
- Framework-specific practices

---

## 📊 Quality Scoring

Each agent scores code **0-100%**:

| Score | Quality | Architecture | Integration | Security | Best Practices |
|-------|---------|--------------|-------------|----------|----------------|
| 90%+  | ✅ Excellent | ✅ Perfect match | ✅ Seamless | ✅ Secure | ✅ Exemplary |
| 70-89% | ✅ Good | ✅ Aligned | ✅ Compatible | ✅ Safe | ✅ Solid |
| 50-69% | ⚠️ Needs work | ⚠️ Some drift | ⚠️ Issues | ⚠️ Risks | ⚠️ Gaps |
| <50% | ❌ Fails | ❌ Misaligned | ❌ Broken | ❌ Vulnerable | ❌ Poor |

**Minimum to Pass:** 70% overall + all agents approve

---

## 🔄 The Rework Loop

```
Generate Code (Opus 4)
       ↓
Run 5 QA Agents in Parallel (Sonnet 4.5)
       ↓
Score < 70% or critical issues?
       ↓
  YES → Code Improvement Agent (Opus 4) → Re-test
       ↓                                    ↑
       └────────── (max 3 times) ──────────┘
       ↓
   NO → Save to Project ✅
       ↓
  Checkpoint Progress 📌
```

**If fails 3 times:** Flagged for manual review (doesn't save broken code)

---

## ⚙️ Configuration

### Environment Variables

```bash
# .env file
PROJECT_PATH=/path/to/your/project    # Target directory
MAX_ITERATIONS=3                       # Rework attempts (default: 3)
MIN_PASS_SCORE=70                      # Pass threshold (default: 70)
API_TIMEOUT=120000                     # Timeout in ms (default: 120000)
```

### Adjusting Quality Standards

```bash
# Stricter (production)
MIN_PASS_SCORE=80

# More lenient (prototyping)
MIN_PASS_SCORE=60

# More rework attempts
MAX_ITERATIONS=5
```

---

## 📋 Command Reference

```bash
# Show help and options
node qaPipeline.js

# Test with one file
node qaPipeline.js test

# Process a phase
node qaPipeline.js phase "Phase Name"

# Process everything
node qaPipeline.js all

# Resume from checkpoint
node qaPipeline.js all --resume

# Start fresh (clear checkpoint)
node qaPipeline.js all --fresh

# Combine flags
node qaPipeline.js phase "Backend" --resume
node qaPipeline.js test --fresh
```

---

## 📈 Example Output

```
╔══════════════════════════════════════════════════════════╗
║        🛡️  QA PIPELINE ORCHESTRATOR 🛡️                   ║
╚══════════════════════════════════════════════════════════╝

✅ Pre-flight checks passed

⚙️  Configuration:
   Project: /Users/drew/Desktop/my-project
   Max Iterations: 3
   Min Pass Score: 70%
   API Timeout: 120s
   Checkpoint: New run

📖 Loading PROJECT_PLAN.md...
   ✅ Plan loaded

📋 Parsing implementation tasks...
   ✅ Found 12 tasks

██████████████████████████████████████████████████████████████████████
TASK 1/12: backend/models/User.js
██████████████████████████████████████████████████████████████████████

======================================================================
🔍 QA PIPELINE - Iteration 1/3
======================================================================
📄 File: backend/models/User.js
🎯 Task: Create User model with authentication fields

⚙️  STEP 1: Generating code...
   ✅ Code generated (45 lines)

🔬 STEP 2: Running Quality Checks...
   🔍 Quality Gate Agent...      ✅ Complete
   🏗️  Architecture Agent...     ✅ Complete
   🔗 Integration Agent...       ✅ Complete
   🔒 Security Agent...          ✅ Complete
   ⭐ Best Practices Agent...    ✅ Complete

╔════════════════════════════════════════════════════════╗
║                   QA RESULTS SUMMARY                   ║
╚════════════════════════════════════════════════════════╝

   📊 Overall Score: 87.4% (min: 70%)
   🎯 Quality Gate: 90%
   🏗️  Architecture: 88%
   🔗 Integration: 85%
   🔒 Security: 89%
   ⭐ Best Practices: 85%

   ⚠️  Total Issues: 2
   🚨 Critical/High: 0

✅ Quality Gate: PASSED

💪 Strengths:
   ✓ Clean separation of concerns
   ✓ Proper password hashing
   ✓ Comprehensive validation

💾 Saving approved code to project...
   💾 Saved to: backend/models/User.js
   ✅ Saved successfully

   📌 Checkpoint saved (1/12)
```

---

## 🔧 Troubleshooting

### Pipeline Crashes Mid-Run
```bash
# Just resume!
node qaPipeline.js all --resume
```

### Code Keeps Failing QA
- Check `qa_pipeline.log` for specific issues
- Review PROJECT_PLAN.md for clarity
- Lower MIN_PASS_SCORE temporarily
- Increase MAX_ITERATIONS

### Timeout Errors
```bash
# Increase timeout in .env
API_TIMEOUT=180000
```

### Want to Start Over
```bash
node qaPipeline.js all --fresh
```

---

## 📊 Files Generated

| File | Purpose |
|------|---------|
| `qa_pipeline.log` | Full audit trail with timestamps |
| `.checkpoints/qa-pipeline.json` | Resume checkpoint (auto-managed) |
| Your project files | Generated code in PROJECT_PATH |

---

## 💡 Pro Tips

1. **Always test first:** `node qaPipeline.js test`
2. **Backup before running:** `git commit -am "Before QA pipeline"`
3. **Check the log:** `cat qa_pipeline.log`
4. **Use checkpoints:** Don't fear long runs, you can resume
5. **Watch costs:** Review the cost summary after each run
6. **Mix tools:** Use QA for backend, fast gen for frontend

---

## 🎯 When to Use QA Pipeline vs Code Generator

| Scenario | Use QA Pipeline | Use Code Generator |
|----------|-----------------|-------------------|
| Backend/API code | ✅ Yes | ❌ No |
| Database models | ✅ Yes | ❌ No |
| Security-critical | ✅ Yes | ❌ No |
| Frontend UI | ⚠️ Optional | ✅ Yes |
| Prototyping | ❌ No | ✅ Yes |
| Production code | ✅ Yes | ❌ No |

---

Ready to generate production-quality code! 🚀
