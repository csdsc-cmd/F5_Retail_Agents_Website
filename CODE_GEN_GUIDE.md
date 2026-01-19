# ⚡ Fast Code Generator Guide

Generate code quickly without QA checks. For production code, use `qaPipeline.js` instead.

## 🆚 Code Generator vs QA Pipeline

| Feature | Code Generator | QA Pipeline |
|---------|----------------|-------------|
| **Speed** | Fast (1-2 min/file) | Slower (5-10 min/file) |
| **Quality Checks** | None | 5 agents |
| **Auto-Fix** | No | Yes (3 iterations) |
| **Checkpoint/Resume** | No | Yes |
| **Best For** | Prototyping, UI | Production, Backend |

**Recommendation:** Use QA Pipeline for critical code, Code Generator for quick iterations.

---

## ⚠️ Safety First

**Before running code generation:**
```bash
cd ~/Desktop/your-project
git add .
git commit -m "Backup before code generation"
```

---

## 🚀 Quick Start

```bash
cd ~/claude-agents

# See available phases
node codeGenOrchestrator.js list

# Generate a specific phase
node codeGenOrchestrator.js phase "Frontend UI"

# Generate everything (use with caution)
node codeGenOrchestrator.js all
```

---

## 📋 Commands

### List Phases
```bash
node codeGenOrchestrator.js list
```
Shows all phases from PROJECT_PLAN.md:
```
Available phases:
  • Database Setup (3 tasks)
  • Backend API (5 tasks)
  • Frontend UI (4 tasks)
  • Integration (2 tasks)
```

### Generate Phase
```bash
node codeGenOrchestrator.js phase "Phase Name"
```
Generates all files for that phase.

### Generate All
```bash
node codeGenOrchestrator.js all
```
⚠️ Generates everything at once. Test individual phases first!

---

## 🔄 Workflow

### Recommended: Phase by Phase

```bash
# 1. Review the plan
cat PROJECT_PLAN.md

# 2. Generate one phase
node codeGenOrchestrator.js phase "Database Setup"

# 3. Test it
cd ~/Desktop/your-project
npm test

# 4. If good, continue
cd ~/claude-agents
node codeGenOrchestrator.js phase "Backend API"

# 5. Repeat until done
```

### Alternative: All at Once

```bash
# Only if you're confident or prototyping
node codeGenOrchestrator.js all
```

---

## 📊 What Gets Generated

Real, production-ready files:

**Backend:**
```
backend/models/User.js
backend/routes/api.js
backend/controllers/userController.js
```

**Frontend:**
```
frontend/src/components/Dashboard.jsx
frontend/src/services/apiService.js
frontend/src/pages/HomePage.jsx
```

---

## 📁 Progress Tracking

Progress saved to `generation_progress.json`:
```json
{
  "completedPhases": ["Database Setup", "Backend API"],
  "failedTasks": [],
  "totalLinesGenerated": 1250,
  "lastRun": "2025-01-06T10:30:00.000Z"
}
```

---

## 💡 Pro Tips

1. **Test each phase** before moving to the next
2. **Commit between phases** for easy rollback
3. **Review generated code** - AI is good but not perfect
4. **Use QA Pipeline** for backend/security-critical code
5. **Use Code Generator** for frontend/UI where you can visually test

---

## 🔧 If Something Goes Wrong

### Regenerate a Phase
```bash
node codeGenOrchestrator.js phase "Database Setup"
```

### Revert Changes
```bash
cd ~/Desktop/your-project
git reset --hard HEAD
```

### Switch to QA Pipeline
For better quality with automatic fixes:
```bash
node qaPipeline.js phase "Database Setup"
```

---

## 🆚 When to Use What

### Use Code Generator When:
- ⚡ Prototyping quickly
- 🎨 Building UI components (visual testing)
- 🔄 Rapid iteration
- 📝 Non-critical code

### Use QA Pipeline When:
- 🔒 Backend/API code
- 🗄️ Database models
- 🛡️ Security-critical features
- 🚀 Production code

---

## 📋 Quick Reference

```bash
# List phases
node codeGenOrchestrator.js list

# Generate phase
node codeGenOrchestrator.js phase "Name"

# Generate all
node codeGenOrchestrator.js all

# For production quality, use:
node qaPipeline.js phase "Name"
```

---

For production-quality code with automatic QA, see `QA_PIPELINE_GUIDE.md`.
