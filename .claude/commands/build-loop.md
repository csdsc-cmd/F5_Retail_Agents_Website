# /build-loop

Start an iterative build loop using Ralph Wiggum methodology.

## Description

This command starts a self-referential iteration loop that:
1. Reads PROJECT_PLAN.md for requirements
2. Loads knowledge base (patterns, standards, glossary)
3. Generates/modifies code each iteration
4. Runs validation (typecheck, lint, tests)
5. Feeds errors back into the next iteration
6. Continues until completion promise is found

## Usage

```
/build-loop [--max-iterations N] [--completion-promise TEXT]
```

## Arguments

- `--max-iterations <N>` - Maximum iterations before stopping (default: 50)
- `--completion-promise <TEXT>` - Text that signals completion (default: BUILD_COMPLETE)

## Example

```
/build-loop --max-iterations 30 --completion-promise "AZURE_AGENT_COMPLETE"
```

## How It Works

**The Ralph Wiggum Philosophy:**
- The same prompt is fed every iteration
- Claude sees its own previous work (files on disk)
- Each iteration makes incremental progress
- Failures are data - they inform the next attempt

**Iteration Flow:**
1. Check if completion promise exists → Exit if found
2. Build prompt with knowledge base + plan + current state
3. Call Claude to generate/fix code
4. Save generated files to disk
5. Run validation (tsc, eslint, npm test)
6. Collect errors for next iteration
7. Loop back to step 1

## Completion

The loop stops when:
- Completion promise is found in source files
- Max iterations reached
- User cancels with Ctrl+C

## Best Practices

1. **Define clear completion criteria in PROJECT_PLAN.md**
   ```markdown
   ## Success Criteria
   - Backend compiles without errors
   - Frontend renders ChatInterface
   - API endpoints respond correctly
   When complete, add: // BUILD_COMPLETE to src/index.ts
   ```

2. **Start small** - Use `--max-iterations 10` for testing

3. **Review periodically** - Check generated code quality

4. **Use git** - Commit checkpoints so you can roll back

## Related Commands

- `/cancel-build` - Cancel active build loop
- `/qa-pipeline` - Run QA checks on existing code
