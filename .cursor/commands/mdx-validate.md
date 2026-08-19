# MDX Frontmatter Validate

Check content files against the schemas defined in the project
instructions.

## Objective
Catch missing/malformed frontmatter before it breaks `src/lib/mdx.ts`
parsing or a page render.

## Steps
1. Find changed or new files under `src/content/work/`,
   `src/content/note/` via
   `git diff --name-only HEAD` and `git status --porcelain`.
2. For each, parse the frontmatter and confirm against its schema:
   - **work**: `title`, `slug`, `date`, `type` (`case-study` | `showcase`),
     `status` (`published` | `draft`), `tags` (array), `accent` (must be
     one of the four palette accents), `summary`.
   - **note**: `title`, `slug`, `date`, `status` (`in-progress` |
     `published`), `summary`, `voice`.
3. Also check:
   - `slug` matches the filename (minus extension).
   - `date` is a valid ISO date, not a placeholder like `2024-01-01` left
     over from scaffolding, unless that's actually correct.
   - No field values outside the enum options listed above.
   - `summary` is actually one sentence, not a paragraph.
   - `voice` is optional.
4. Confirm the file compiles by checking it against `src/lib/mdx.ts`'s
   expected shape (`types.ts`) — flag any mismatch between the type
   definition and what a real content file provides.

## Output
Pass/fail per content file, with the specific missing or invalid field
called out.
