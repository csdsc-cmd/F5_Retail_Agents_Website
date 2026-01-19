#!/bin/bash
# Cancel an active build loop

RALPH_STATE_FILE="${CLAUDE_CODE_STATE_DIR:-/tmp}/.ralph-state"

if [[ -f "$RALPH_STATE_FILE" ]]; then
    source "$RALPH_STATE_FILE"
    echo "🛑 Canceling build loop at iteration $RALPH_ITERATION"
    rm -f "$RALPH_STATE_FILE"
    echo "✅ Build loop canceled. All generated code has been preserved."
else
    echo "ℹ️  No active build loop to cancel."
fi
