# /qa-pipeline

Run multi-agent QA pipeline on generated code.

## Description

Runs 5 parallel QA agents to validate code quality:
1. **Quality Gate Agent** - Code quality and best practices
2. **Architecture Consistency Agent** - Matches project architecture
3. **Integration Validation Agent** - Works with dependencies
4. **Security Audit Agent** - No vulnerabilities
5. **Best Practices Agent** - Follows coding standards

If issues are found, automatically runs improvement agent and re-validates.

## Usage

```
/qa-pipeline <mode> [phase-name] [--resume] [--fresh]
```

## Modes

- `test` - Process first task only (safe testing)
- `phase <name>` - Process tasks from specific phase
- `all` - Process all tasks from PROJECT_PLAN.md

## Options

- `--resume` - Continue from last checkpoint
- `--fresh` - Clear checkpoint and start fresh

## Examples

```
/qa-pipeline test
/qa-pipeline phase "Backend API"
/qa-pipeline all --resume
```

## Process

For each task in PROJECT_PLAN.md:
1. Generate code using Code Generator Agent
2. Run 5 QA agents in parallel
3. Aggregate scores (quality, architecture, integration, security, practices)
4. If score >= 70%: Save to project
5. If score < 70%: Run improvement agent, retry (up to 3 iterations)

## Configuration

Set via environment variables:
- `PROJECT_PATH` - Target project directory
- `MAX_ITERATIONS` - Max QA rework loops (default: 3)
- `MIN_PASS_SCORE` - Minimum score to pass (default: 70)
- `API_TIMEOUT` - API timeout in ms (default: 120000)

## Output

- Approved code saved to project
- Full log in `qa_pipeline.log`
- Cost summary at end

## Related Commands

- `/build-loop` - Iterative code generation
