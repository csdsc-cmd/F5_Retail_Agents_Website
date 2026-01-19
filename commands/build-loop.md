# /build-loop Command

Start an iterative build loop that continues until completion criteria are met.

## Usage

```
/build-loop --max-iterations <n> --completion-promise "<text>"
```

## Arguments

- `--max-iterations <n>` - Maximum iterations before stopping (default: 50)
- `--completion-promise <text>` - Text that signals successful completion

## What This Does

1. Reads PROJECT_PLAN.md for the task definition
2. Reads knowledge base for patterns and standards
3. Starts an iteration loop that:
   - Generates/modifies code
   - Runs validation (typecheck, lint, tests)
   - If failures: continues to next iteration with failure context
   - If completion promise found: exits successfully

## Example

```
/build-loop --max-iterations 30 --completion-promise "BUILD_COMPLETE"
```

## The Loop Process

Each iteration:
1. **Read Context** - Check PROJECT_PLAN.md, existing code, test results
2. **Generate/Fix** - Write or modify code based on current state
3. **Validate** - Run `npm run build`, `npm test`, lint
4. **Evaluate** - Check if completion criteria met
5. **Iterate or Exit** - Continue if not complete, exit if done

## Completion Criteria

The loop stops when ANY of these occur:
- Completion promise text is found in generated code
- Max iterations reached
- User runs `/cancel-build`
- All validation passes AND tests pass

## Best Practices

### 1. Define Clear Completion Criteria in PROJECT_PLAN.md

```markdown
## Success Criteria
When complete, add this comment to src/index.ts:
// BUILD_COMPLETE: All features implemented
```

### 2. Use Incremental Goals

Break the task into phases:
```markdown
## Phase 1: Backend API
- Create AgentService
- Create API routes
- Add error handling
- When done: // PHASE_1_COMPLETE

## Phase 2: Frontend
- Create ChatInterface
- Connect to API
- When done: // PHASE_2_COMPLETE
```

### 3. Include Automatic Verification

The loop automatically runs:
- TypeScript compilation
- ESLint
- Tests (if configured)

### 4. Set Reasonable Max Iterations

- Simple features: 10-20 iterations
- Complex features: 30-50 iterations
- Full applications: 50-100 iterations

## Canceling the Loop

```
/cancel-build
```

This immediately stops the loop and preserves all generated code.
