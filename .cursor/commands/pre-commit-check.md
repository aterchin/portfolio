# Pre-Commit Check

Full review of staged/changed files before commit. Run this before every commit.

## Objective
Catch type errors, lint issues, and violations of this project's locked
design/architecture decisions before they land in the repo.

## Steps

1. Run `npm run type-check` in the terminal. Report any errors with file and
   line number. Do not attempt to fix silently — show me the errors first.

2. Run `npm run lint` in the terminal. Report errors and warnings separately.

3. Get the list of changed files with `git diff --name-only HEAD` (and
   `git status --porcelain` for untracked files). Only review files in that
   list — do not re-review the whole repo.

4. For each changed file, check against these project-specific rules:
   - **CSS**: no hardcoded hex/rgb colors, px font-sizes, or font-family names
     — everything should reference a `--*` custom property from
     `src/styles/tokens.css`. Italics are allowed — Newsreader italic,
     used intentionally. No styles reaching across component boundaries
     (a component's `.module.css` should only be imported by that component).
   - **No Tailwind classes, no CSS-in-JS (styled-components, emotion,
     inline `style={{}}` for anything beyond truly dynamic values).**
   - **No third-party form services** — contact form must go through
     `/api/contact` and Resend only.
   - **TypeScript**: no new `any` without a comment explaining why. Props
     interfaces exported and named `<ComponentName>Props`.
   - **MDX frontmatter**: if a file under `src/content/` was added or
     changed, confirm it matches the schema for its type (work / snippet /
     experiment) from the project instructions — required fields present,
     `type`/`status` values are valid enum options.
   - Flag anything that looks like a generic-portfolio cliché (skills bars,
     timeline résumé, hero+headshot) or a forced/quirky joke in copy —
     per the "dry wit, understated" tone rule.

5. Summarize findings as a checklist: ✅ pass / ⚠️ needs a look / ❌ blocking,
   grouped by file. Don't auto-fix anything — wait for confirmation on each
   ❌/⚠️ item before editing.

## Output
A short pass/fail summary per file, followed by any errors from steps 1–2
verbatim (unformatted, so line numbers stay accurate).
