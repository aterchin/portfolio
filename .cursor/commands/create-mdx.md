---
description: Scaffold a new note or work MDX file with frontmatter placeholders
---

# Create MDX

Create a **new empty** MDX file under `src/content/` with valid frontmatter.
Do not write the body. Do not run `draft-process-note.md` or `cleanup-mdx.md`.

---

## Type

If the user did not say **note** or **work**, ask once. Default to **note**.

- **note** → `src/content/notes/{slug}.mdx`
- **work** → `src/content/work/{slug}.mdx`

Abort if that path already exists. Do not overwrite.

---

## Slug and date

- `slug` is kebab-case from the title (or the filename the user gives).
- Filename must be `{slug}.mdx`.
- `date` is today's real ISO date (`YYYY-MM-DD`), not a placeholder like `2024-01-01`.
- Omit `updated` — only add it later when the piece is actually revised.
- Do not add `voice: preserve` unless the user asks for this note.

---

## Frontmatter

**Note** (`src/lib/types.ts` `Note`):

```yaml
---
title: Title Here
slug: title-here
date: YYYY-MM-DD
tags: []
summary:
---
```

Optional on notes only, if the user asked for a WIP:

```yaml
status: in-progress
```

**Work** (`src/lib/types.ts` `Project`):

```yaml
---
title: Title Here
slug: title-here
date: YYYY-MM-DD
type: case-study
status: draft
tags: []
summary:
---
```

- `type` is `case-study` or `showcase`. Default `case-study` unless the user says otherwise.
- Work `status` is `draft` so it stays off `getProjects()` until they publish.
- `tags`: empty array, or tags the user named (existing casing: `Next.js`, `macOS`, `WP-CLI`).
- `summary`: leave blank unless the user already gave one sentence.

---

## Body

Leave the body empty after the closing `---`. No heading stubs, no lorem.

---

## Output

1. Write the file.
2. Recap: path, type, and that `slug` matches the filename.
