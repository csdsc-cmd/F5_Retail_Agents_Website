# 🛠️ Claude Development Tools

Development-focused agents for code review, feature planning, debugging, and testing.

## 🤖 Available Agents

| Agent | Purpose | Model |
|-------|---------|-------|
| **Code Review** | Review code for bugs, performance, security | Sonnet 4.5 |
| **Feature Agent** | Plan and design new features | Sonnet 4.5 |
| **Bug Fix** | Debug and fix issues | Sonnet 4.5 |
| **Architecture** | Analyze structure and scalability | Sonnet 4.5 |
| **Testing** | Generate unit and integration tests | Sonnet 4.5 |

## 🚀 Quick Start

```bash
cd ~/claude-agents

# Review a file
node devOrchestrator.js review backend/server.js

# Plan a feature
node devOrchestrator.js feature "Add PDF export functionality"

# Fix a bug
node devOrchestrator.js bug "Jobs not sorting correctly" backend/routes/jobs.js

# Analyze architecture
node devOrchestrator.js architecture "Evaluate scalability for 1000+ users"

# Generate tests
node devOrchestrator.js test backend/utils/scheduler.js

# Full analysis (review + tests)
node devOrchestrator.js analyze frontend/src/App.jsx
```

---

## 📋 Command Reference

### Code Review
```bash
node devOrchestrator.js review <filepath>
```
Checks for:
- Potential bugs and edge cases
- Performance improvements
- Security vulnerabilities
- Code quality and best practices
- Readability and maintainability

### Feature Planning
```bash
node devOrchestrator.js feature "<description>"
```
Provides:
- Step-by-step implementation plan
- Production-ready code suggestions
- Consideration for existing patterns
- Error handling and edge cases
- Suggested tests

### Bug Fixing
```bash
node devOrchestrator.js bug "<description>" <filepath>
```
Provides:
- Root cause analysis
- Explanation of why the bug occurs
- Corrected code
- Prevention strategies
- Regression test cases

### Architecture Analysis
```bash
node devOrchestrator.js architecture "<goal>"
```
Analyzes:
- Design patterns in use
- Structure improvements
- Scalability concerns
- Refactoring opportunities
- Technical debt assessment

### Test Generation
```bash
node devOrchestrator.js test <filepath>
```
Generates:
- Unit tests for individual functions
- Integration tests for workflows
- Edge cases and error scenarios
- Mock external dependencies
- Jest framework by default

### Full Analysis
```bash
node devOrchestrator.js analyze <filepath>
```
Combines review + test generation for comprehensive analysis.

---

## 🔄 Workflow Patterns

### Pattern 1: New Feature Development
```bash
# Step 1: Plan the feature
node devOrchestrator.js feature "Add drag-and-drop job rescheduling"

# Step 2: Review existing related code
node devOrchestrator.js review frontend/src/components/SchedulingBoard.jsx

# Step 3: After implementation, generate tests
node devOrchestrator.js test frontend/src/components/SchedulingBoard.jsx
```

### Pattern 2: Bug Investigation
```bash
# Step 1: Analyze the bug
node devOrchestrator.js bug "Jobs disappearing after refresh" backend/routes/jobs.js

# Step 2: Review the fixed code
node devOrchestrator.js review backend/routes/jobs.js
```

### Pattern 3: Codebase Audit
```bash
# Analyze architecture
node devOrchestrator.js architecture "Identify technical debt and refactoring opportunities"

# Review critical files
node devOrchestrator.js analyze backend/server.js
node devOrchestrator.js analyze frontend/src/App.jsx
```

### Pattern 4: Pre-Commit Review
```bash
# Review changed files before committing
node devOrchestrator.js review src/components/NewFeature.jsx
node devOrchestrator.js review src/utils/helpers.js
```

---

## 💡 Pro Tips

### 1. Be Specific
The more context you provide, the better the analysis:
```bash
# Good
node devOrchestrator.js bug "Users with special characters in names cause 500 error on profile save" backend/routes/users.js

# Less helpful
node devOrchestrator.js bug "error" backend/routes/users.js
```

### 2. Chain Workflows
Use output from one agent to inform the next:
```bash
# Review suggests security issue → dig deeper
node devOrchestrator.js review backend/auth.js
# Output mentions SQL injection risk
node devOrchestrator.js bug "Potential SQL injection in login query" backend/auth.js
```

### 3. Start Broad, Go Narrow
```bash
# First: understand the big picture
node devOrchestrator.js architecture "Identify performance bottlenecks"

# Then: dive into specific files
node devOrchestrator.js review backend/routes/heavy-endpoint.js
```

### 4. Regular Reviews
Run code reviews before committing:
```bash
# Quick pre-commit check
node devOrchestrator.js review <changed-file>
```

---

## 📁 Project Structure

These agents work with your project at `PROJECT_PATH` (set in `.env`):

```
your-project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   └── App.jsx
    └── public/
```

---

## 🔧 Customization

Edit agents in `agents/` folder to customize:

```javascript
// agents/codeReviewAgent.js
const response = await client.messages.create({
  model: "claude-sonnet-4-5-20250929",  // Change model
  max_tokens: 2000,                      // Adjust length
  system: `You are an expert code reviewer...`,  // Modify prompt
  ...
});
```

---

## 🆚 Dev Tools vs QA Pipeline

| Aspect | Dev Tools | QA Pipeline |
|--------|-----------|-------------|
| **Purpose** | Analyze existing code | Generate new code |
| **Agents** | 1 at a time | 5 in parallel |
| **Speed** | Fast (30 sec) | Slower (5-10 min/file) |
| **Auto-Fix** | No | Yes (3 iterations) |
| **Checkpoint** | No | Yes |
| **Use Case** | Review, debug, plan | Production code generation |

**Use Dev Tools for:** Reviewing, debugging, planning, test generation  
**Use QA Pipeline for:** Generating production-quality new code

---

## 📊 Example Output

### Code Review Output
```
## Code Review: backend/routes/users.js

### 🐛 Potential Bugs
1. Line 45: Missing null check on `user.profile`
2. Line 78: Race condition in concurrent updates

### ⚡ Performance
1. N+1 query pattern in getUsersWithPosts()
2. Consider adding index on `email` field

### 🔒 Security
1. Line 23: User input not sanitized before SQL query
2. Line 56: Missing rate limiting on login endpoint

### 📝 Code Quality
1. Inconsistent error handling patterns
2. Magic numbers should be constants

### Recommendations
- Add input validation middleware
- Implement proper error handling class
- Add database indexes for common queries
```

---

## 🚀 Next Steps

1. **Try a review:**
   ```bash
   node devOrchestrator.js review backend/server.js
   ```

2. **Plan your next feature:**
   ```bash
   node devOrchestrator.js feature "Your feature idea"
   ```

3. **Generate tests:**
   ```bash
   node devOrchestrator.js test backend/utils/scheduler.js
   ```

For generating new code with quality assurance, see `QA_PIPELINE_GUIDE.md`.
