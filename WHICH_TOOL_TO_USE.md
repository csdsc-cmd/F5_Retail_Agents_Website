# 🔄 Which Tool Should I Use?

## 📊 Quick Decision Matrix

| What You Want | Tool | Speed | Quality |
|---------------|------|-------|---------|
| Plan a feature | `projectOrchestrator.js` | 3-5 min | N/A |
| Production code | `qaPipeline.js` | 5-10 min/file | ⭐⭐⭐ |
| Fast prototype | `codeGenOrchestrator.js` | 1-2 min/file | ⭐ |
| Review code | `devOrchestrator.js review` | 30 sec | N/A |
| Fix a bug | `devOrchestrator.js bug` | 1 min | N/A |
| Generate tests | `devOrchestrator.js test` | 1 min | N/A |

---

## 🛡️ QA Pipeline (`qaPipeline.js`)

### What It Does
```
Generate Code → 5 QA Agents → Auto-Fix Issues → Retest → Save Quality Code
```

### Features
- ✅ 5 parallel QA agents (quality, architecture, integration, security, best practices)
- ✅ Auto-fix and rework (up to 3 iterations)
- ✅ Checkpoint/resume for long pipelines
- ✅ Cost tracking per agent
- ✅ 70%+ quality score required

### When to Use
- ✅ Backend/API code
- ✅ Database models
- ✅ Security-critical features
- ✅ Production code
- ✅ Long pipelines (can resume if interrupted)

### Commands
```bash
node qaPipeline.js test                # Test one file
node qaPipeline.js phase "Backend"     # Process phase
node qaPipeline.js all                 # Process all
node qaPipeline.js all --resume        # Resume from checkpoint
node qaPipeline.js all --fresh         # Start fresh
```

### Trade-offs
- ✅ High quality output
- ✅ Security audited
- ✅ Can resume if interrupted
- ❌ Slower (5-10 min/file)
- ❌ Higher API cost

---

## ⚡ Code Generator (`codeGenOrchestrator.js`)

### What It Does
```
Read Plan → Generate Code → Save to Project
```

### Features
- ✅ Fast generation
- ✅ Direct to project
- ❌ No quality checks
- ❌ No checkpoint/resume

### When to Use
- ✅ Prototyping
- ✅ Frontend/UI components
- ✅ Non-critical code
- ✅ When you'll test yourself

### Commands
```bash
node codeGenOrchestrator.js list            # List phases
node codeGenOrchestrator.js phase "Name"    # Generate phase
node codeGenOrchestrator.js all             # Generate all
```

### Trade-offs
- ✅ Very fast (1-2 min/file)
- ✅ Lower API cost
- ❌ May have bugs
- ❌ No security audit
- ❌ User must test

---

## 📋 Project Orchestrator (`projectOrchestrator.js`)

### What It Does
```
User Request → Analyze → Architecture Plan → Phases → Tasks
```

### Output
`PROJECT_PLAN.md` with:
- Architecture recommendations
- Database schema
- API structure
- Implementation phases
- Detailed tasks

### When to Use
- ✅ Starting a new feature
- ✅ Need a roadmap
- ✅ Complex multi-phase projects
- ✅ Before using QA Pipeline or Code Generator

### Commands
```bash
node projectOrchestrator.js "Add user authentication system"
```

---

## 🛠️ Dev Orchestrator (`devOrchestrator.js`)

### What It Does
Specialized tools for development tasks.

### Commands
```bash
# Review code
node devOrchestrator.js review backend/server.js

# Plan a feature
node devOrchestrator.js feature "Add PDF export"

# Fix a bug
node devOrchestrator.js bug "Jobs not sorting" backend/routes/jobs.js

# Analyze architecture
node devOrchestrator.js architecture "Identify bottlenecks"

# Generate tests
node devOrchestrator.js test backend/utils/scheduler.js

# Full analysis (review + tests)
node devOrchestrator.js analyze frontend/src/App.jsx
```

### When to Use
- ✅ Reviewing existing code
- ✅ Debugging issues
- ✅ Planning new features
- ✅ Generating test suites

---

## 📊 Detailed Comparison

| Feature | QA Pipeline | Code Generator | Dev Tools |
|---------|-------------|----------------|-----------|
| **Model** | Opus 4 + Sonnet 4.5 | Opus 4 | Sonnet 4.5 |
| **Quality Checks** | 5 agents | None | 1 agent |
| **Auto-Fix** | Yes (3x) | No | No |
| **Checkpoint/Resume** | ✅ Yes | ❌ No | ❌ No |
| **Cost Tracking** | ✅ Yes | ❌ No | ❌ No |
| **Speed** | Slow | Fast | Fast |
| **Best For** | Production | Prototyping | Analysis |

---

## 🎯 Recommended Workflows

### Workflow A: Production Feature

```bash
# 1. Plan
node projectOrchestrator.js "Add feature X"

# 2. Review PROJECT_PLAN.md

# 3. Generate critical code with QA
node qaPipeline.js phase "Backend"
node qaPipeline.js phase "Database"

# 4. Generate UI fast (visual testing)
node codeGenOrchestrator.js phase "Frontend"

# 5. Test
cd ~/Desktop/project && npm start
```

**Time:** 30-60 minutes  
**Quality:** Production-ready  
**Can resume:** Yes

### Workflow B: Fast Prototype

```bash
# 1. Plan (optional)
node projectOrchestrator.js "Add feature X"

# 2. Generate everything fast
node codeGenOrchestrator.js all

# 3. Test and fix yourself
```

**Time:** 10-15 minutes  
**Quality:** Your responsibility  
**Can resume:** No

### Workflow C: Code Review

```bash
# Review specific files
node devOrchestrator.js review backend/server.js

# Get architecture recommendations
node devOrchestrator.js architecture "Identify technical debt"

# Generate tests for existing code
node devOrchestrator.js test backend/utils/scheduler.js
```

---

## 💡 Decision Flowchart

```
Start
  │
  ▼
Is this a new feature?
  │
  ├─ Yes → node projectOrchestrator.js "description"
  │         │
  │         ▼
  │       Is it production/critical code?
  │         │
  │         ├─ Yes → node qaPipeline.js phase "Name"
  │         │
  │         └─ No → node codeGenOrchestrator.js phase "Name"
  │
  └─ No → What do you need?
           │
           ├─ Review code → node devOrchestrator.js review <file>
           │
           ├─ Fix bug → node devOrchestrator.js bug "desc" <file>
           │
           ├─ Generate tests → node devOrchestrator.js test <file>
           │
           └─ Architecture → node devOrchestrator.js architecture "goal"
```

---

## 📈 Cost Estimates

| Scenario | Tool | Est. Cost |
|----------|------|-----------|
| 1 file with QA | `qaPipeline.js test` | $0.02-0.05 |
| 10 files with QA | `qaPipeline.js phase` | $0.20-0.50 |
| 50 files with QA | `qaPipeline.js all` | $1.00-2.50 |
| 10 files fast | `codeGenOrchestrator.js` | $0.10-0.20 |
| Code review | `devOrchestrator.js` | $0.01-0.02 |

---

## 🔄 Switching Between Tools

Generated with Code Generator but want QA?
```bash
# Re-run with QA Pipeline (overwrites with better code)
node qaPipeline.js phase "Same Phase"
```

QA Pipeline too slow?
```bash
# Switch to fast generation
node codeGenOrchestrator.js phase "Same Phase"
```

Pipeline crashed?
```bash
# Just resume
node qaPipeline.js all --resume
```

---

## 🎯 Bottom Line

| Priority | Use This |
|----------|----------|
| Quality | `qaPipeline.js` |
| Speed | `codeGenOrchestrator.js` |
| Planning | `projectOrchestrator.js` |
| Analysis | `devOrchestrator.js` |

**Default recommendation:** Use `qaPipeline.js` for backend, `codeGenOrchestrator.js` for frontend.
