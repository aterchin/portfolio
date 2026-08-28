---
description: Draft a WIP process/learning MDX note from a design or implementation thread
---

# Draft process note

Write a **new** note under `src/content/notes/` (or revise a draft the user
points at) that records *why* a layout or feature ended up the way it did —
not a step-by-step how-to.

Do **not** use this command for command cookbooks (WP-CLI, Apache vhosts).
Those stay apache-style and go through `cleanup-mdx.md`.

Canonical shape (once the user is happy with it):
[src/content/notes/wide-mdx-code-blocks.mdx](src/content/notes/wide-mdx-code-blocks.mdx).

This is the opposite of [explain-learning.md](explain-learning.md): that
command explains **selected code in chat**. This command writes an **MDX
file**.

---

## Frontmatter

```yaml
title: …
slug: …          # must match the filename
date: YYYY-MM-DD # real date, not a scaffold placeholder
status: in-progress
voice: preserve  # unless the user says to flatten
tags: […]
summary: one sentence — the what, not the backstory
```

- `summary` must not repeat the opening paragraph verbatim.
- `tags`: consistent casing (`Next.js`, `CSS`, `MDX`).
- Do not invent `status: published`.

---

## Structure

Keep `##` to a few words. Default arc (rename to fit the topic, keep the
shape):

1. Short intro (1–3 sentences): why this exists, link related process notes
   if any.
2. `## Previous Layout` — what the page did before, in plain language.
3. `## Modifications` — failed or partial passes, **combined and shortened**.
   Don't narrate every experiment.
4. `## Fixes` — what shipped.
5. `## Additional considerations` — related machinery (Remark, compile
   options, a11y, etc.) as `###` children, not extra `##`s.
6. `## Still in progress` — honest leftovers.

Use `###` for a **single** problem or fix (e.g. sticky ToC, a compile-time
flag). Not for every paragraph.

---

## Voice and density

- First person is fine. The user may embellish later — don't flatten into
  imperative how-to.
- Thought process: less technical than the implementation chat. Write like
  an intermediate CSS/layout class, not a spec dump.
- Do **not** include exact layout tokens (`minmax(10rem, 18rem)`,
  `--layout-max: 1100px`, breakpoint pixel lists) unless the reader must
  copy them to reproduce a bug.
- Collapse two or three similar failed attempts into one short section.
- Skip filler and cute labels ("red herring", "on paper that is Comeau
  nested one level down").

---

## Code and callouts

- Several facts about **one** snippet → **bullets**, not one stacked
  sentence.
- Introduce a live demo in the sentence **above** the fence
  ("This block is set to wide:"). Don't wrap that demo in `<Aside>`.
- Fence meta (`wide`) stays on the fence when you're demonstrating the
  feature.
- `<Aside>` is for a genuine interrupt (gotcha, definition), not emphasis
  and not "this is the feature."
- Keep code in the note accurate; don't invent APIs. If you're unsure, omit
  the snippet and say so in the recap.

---

## Output

1. Write or update the MDX file.
2. Confirm `slug` matches the filename.
3. Recap: path, heading outline, anything the user still needs to
   embellish or fact-check.
