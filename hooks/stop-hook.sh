#!/bin/bash
# Stop hook for Ralph Wiggum-style iteration loop
# This hook intercepts Claude's exit attempts and re-feeds the prompt
# to create a self-referential feedback loop

set -e

# Check if ralph loop is active
RALPH_STATE_FILE="${CLAUDE_CODE_STATE_DIR:-/tmp}/.ralph-state"

if [[ ! -f "$RALPH_STATE_FILE" ]]; then
    # No active loop, allow normal exit
    exit 0
fi

# Read state
source "$RALPH_STATE_FILE"

# Check if max iterations reached
if [[ -n "$RALPH_MAX_ITERATIONS" ]] && [[ "$RALPH_ITERATION" -ge "$RALPH_MAX_ITERATIONS" ]]; then
    echo "🛑 Ralph loop: Max iterations ($RALPH_MAX_ITERATIONS) reached"
    rm -f "$RALPH_STATE_FILE"
    exit 0
fi

# Check if completion promise found in recent output
if [[ -n "$RALPH_COMPLETION_PROMISE" ]]; then
    # Check git diff or recent files for completion signal
    if grep -rq "$RALPH_COMPLETION_PROMISE" . 2>/dev/null; then
        echo "✅ Ralph loop: Completion promise found!"
        rm -f "$RALPH_STATE_FILE"
        exit 0
    fi
fi

# Increment iteration
RALPH_ITERATION=$((RALPH_ITERATION + 1))
echo "RALPH_ITERATION=$RALPH_ITERATION" > "$RALPH_STATE_FILE"
echo "RALPH_PROMPT='$RALPH_PROMPT'" >> "$RALPH_STATE_FILE"
echo "RALPH_MAX_ITERATIONS=$RALPH_MAX_ITERATIONS" >> "$RALPH_STATE_FILE"
echo "RALPH_COMPLETION_PROMISE='$RALPH_COMPLETION_PROMISE'" >> "$RALPH_STATE_FILE"

echo ""
echo "🔄 Ralph loop iteration $RALPH_ITERATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Block exit and output the prompt to continue
# The prompt will be re-read by Claude Code
echo "$RALPH_PROMPT"

# Signal to Claude Code to continue (non-zero exit blocks normal exit)
exit 1
