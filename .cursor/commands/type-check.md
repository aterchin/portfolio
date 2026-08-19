# Type Check

Run and interpret the TypeScript compiler in isolation.

## Objective
Surface every type error in the project without editing anything yet.

## Steps
1. Run `npm run type-check` (`tsc --noEmit`).
2. If there are errors, group them by file and explain each one in one
   sentence — root cause, not just the compiler message.
3. Propose a fix for each, but list them as proposals first. Only apply a
   fix after I confirm it, unless the fix is purely additive (e.g. adding a
   missing type import) with no behavior change — those you can apply
   directly, but tell me you did.
4. If a fix would require an `any`, a type assertion (`as`), or a
   `@ts-expect-error`, stop and ask — don't silently paper over a type
   error with an escape hatch.

## Output
List of errors grouped by file, each with a one-line cause and proposed fix.
