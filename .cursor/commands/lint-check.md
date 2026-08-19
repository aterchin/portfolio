# Lint Check

Run ESLint and separate what's safe to auto-fix from what needs judgment.

## Objective
Clean up mechanical lint issues without touching logic or style decisions
that were made deliberately.

## Steps
1. Run `npm run lint`.
2. Split results into two buckets:
   - **Auto-fixable / mechanical**: unused imports, missing deps in a
     `useEffect` array where the fix is obviously safe, formatting-level
     issues.
   - **Needs judgment**: anything touching component structure, a11y rules,
     or where the "fix" could change behavior.
3. For the mechanical bucket, apply fixes directly (`npm run lint -- --fix`
   is fine here) and list what changed.
4. For the judgment bucket, explain the warning and propose a fix but wait
   for confirmation before editing.
5. Do not add eslint-disable comments to silence a rule — if a rule seems
   wrong for a specific line, ask before suppressing it.

## Output
Two lists: what was auto-fixed, and what's waiting on a decision.
