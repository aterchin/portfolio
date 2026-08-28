# MDX Cleanup

Polish pasted or draft MDX content under `src/content/` — copy, structure,
images, and Google Docs artifacts. Use after importing from Google Docs,
Notion, or a rough first draft.

## Objective

Bring a content file in line with this project's voice and conventions.
Notes should read like [apache-reverse-proxy-node.mdx](src/content/notes/apache-reverse-proxy-node.mdx):
imperative, scannable, no fluff. Work posts can carry more narrative, but
the same structural rules apply.

Canonical reference for a polished note with images and an ASCII tree:
[src/content/notes/sourcetree-custom-action.mdx](src/content/notes/sourcetree-custom-action.mdx).

## Scope

1. Identify the target file — use the open file, a path the user provides,
   or changed files under `src/content/` from `git status`.
2. Read the file's content type (work / note) and match tone accordingly.
   Notes are reference docs; work posts are case studies.
3. Check frontmatter for `voice: preserve` (notes only — see **Voice** below).
   This does not change structural, terminology, or validation rules — only
   whether tone gets flattened.
4. Apply the cleanup rules below. Edit the file directly unless the user
   asked for a review-only pass.

---

## Voice

By default, cleanup flattens conversational tone into the dry, imperative
style described under **Tone**. Some notes are meant to keep the author's
voice — warmer, more sarcastic, a little rambling on a genuine annoyance.
For those, add to frontmatter:

```yaml
voice: preserve
```

When `voice: preserve` is set:

- **Skip** tone-flattening: don't cut first-person asides, don't neutralize
  sarcasm, don't trim a paragraph just because it rambles a little. If the
  rambling goes on for several paragraphs past the point that's still
  legible or useful, trim the excess — preserving voice isn't a license for
  the note to stop making its point.
- **Still apply everything else**: terminology fixes, misspoken/incorrect
  wording, Google Docs paste artifacts, heading structure (including
  **Process notes** under Headings and lists), code block correctness,
  image rules, frontmatter validation. Voice preservation is about tone,
  not accuracy or structure.
- Do **not** rewrite a process/learning note into apache-style imperative
  how-to. Drafts of that kind come from
  [draft-process-note.md](draft-process-note.md).

When the field is absent (the default), run full cleanup as described below.

This field is optional and specific to notes — work posts always go through
full tone cleanup regardless of this flag, since they're written for
non-technical client readability.

---

## Frontmatter

- **`summary`**: one sentence — the *what*, not the backstory. Must not
  repeat the opening body paragraph verbatim.
- **`tags`**: consistent casing (`macOS`, not `Mac OS`; `Node.js`, not
  `node.js`).
- **`slug`**: must match the filename (minus `.mdx`).
- **`voice`**: optional, notes only. `preserve` or omitted — see **Voice**
  above. Not a field to add unprompted; only carry it forward if it's
  already in the source, or the user asks for it on this note specifically.
- Run field validation against the schema in `mdx-validate.md` if frontmatter
  was added or changed.

---

## Copy and structure

### Remove Google Docs / paste artifacts

- Double spaces after periods.
- Escaped characters that may render literally (`\>` → `>`).
- Lettered steps (`Step 1`, `Step 2`) → descriptive `##` headings.
- Redundant `##` heading that duplicates the page `<h1>` (the layout already
  renders the title).
- Rhetorical questions or AI-draft leftovers (e.g. "Would you like to…").
  Convert to a real `## Optional: …` section with a code block, or delete.
- "Quick how-to" openers — start with the problem or outcome instead.

### Intro paragraph

- **Notes**: 1–2 sentences max. Problem → desired outcome. No repetition
  of the frontmatter `summary`. (If `voice: preserve`, length can flex —
  see **Voice**.)
- **Work**: narrative is fine, but cut duplicate context between `summary`
  and body.

### Headings and lists

- Use `##` for major sections, `###` only when a section genuinely needs
  sub-parts.
- Config/setup fields: flat numbered list with **bold labels**, not nested
  bullet trees.
- Platform-specific paths: **SourceTree → Preferences** (Mac) or
  **Tools → Options** (Windows) — bold the menu path, plain `→` arrows.

#### Process notes

Applies when `voice: preserve` is set, or the note is clearly a
design/implementation write-up (not a command cookbook). Canonical shape:
[src/content/notes/wide-mdx-code-blocks.mdx](src/content/notes/wide-mdx-code-blocks.mdx).

- Prefer short `##` titles (a few words). `###` for a single failure or fix.
- Several facts about one code block → bullets, not one stacked sentence.
- Don't inject exact layout tokens (`minmax(…)`, raw max-width pixels) on
  cleanup unless the reader must copy them.
- Don't wrap a live demo fence in `<Aside>`; keep a one-line intro above
  the block.
- Related machinery (Remark, compile options) stays `###` under a
  considerations-style `##`, not extra top-level sections.
- Don't flatten collapsed "what we tried" sections back into a full
  experiment log.

### Tone

Applies in full unless the file has `voice: preserve` (see **Voice** above).

- Imperative verbs: "Save this as…", "Open…", "Set…".
- Dry and direct — no filler ("In this article we will…", "It's worth noting
  that…").
- First-person backstory is OK in one opening sentence when it explains *why*
  the note exists; don't carry it through every section.

---

## Images

Follow [public/images/README.md](public/images/README.md).

### When to use what

| Situation | Use |
|---|---|
| UI walkthrough (menus, dialogs) | `<Figure>` with screenshot |
| Simple directory / file structure | ASCII tree in a ` ```text ` block |
| Decorative or redundant screenshot | Delete — prose or a tree is enough |

Prefer a **directory tree** over a screenshot when the image only shows a
file list with no UI chrome worth illustrating.

### File location and format

- **WebP only** for raster images. Convert PNG/JPEG before committing
  (`cwebp -q 85 input.png -o output.webp`).
- **One image**: `public/images/{work|notes}/{slug}.webp`
- **Two or more images**: `public/images/{category}/{slug}/descriptive-name.webp`
- Delete replaced or unused image files from `public/images/`.

### `<Figure>` usage

Registered in `src/lib/mdxComponents.tsx`. Use for screenshots that benefit
from a caption:

```mdx
<Figure
  src="/images/notes/my-slug/step-name.webp"
  alt="Descriptive alt — what the image shows, not what to do"
  caption="Short instruction or context the alt doesn't cover."
/>
```

- **`alt`**: describes the image content for screen readers.
- **`caption`**: adds instruction or context — do not repeat the alt verbatim.
- Place figures **inline with instructions**: write the step, then the figure,
  then the next step. Never stack all figures before the usage text.
- Order figures in narrative sequence (step 1 → step 2), not arbitrary file
  name order.

## Asides

Registered in `src/lib/mdxComponents.tsx`. Use `<Aside>` for callouts that
interrupt the normal reading flow — warnings, gotchas, prerequisites, or a
note about something that got fixed later. Don't use it for content that's
just emphasis; a callout should genuinely stand apart from the surrounding
prose, not decorate a sentence that would read fine inline.

```mdx
<Aside variant="warning">
Restarting Apache here drops active connections — schedule around traffic,
not mid-deploy.
</Aside>
```

### Variants

| Variant | Default label | Use for |
|---|---|---|
| `info` | Note | Context or a detail worth calling out, not urgent |
| `success` | Resolved | A problem that came up and how it was fixed |
| `warning` | Caution | Something to watch for before acting |
| `error` | Problem | A failure mode or a mistake worth flagging explicitly |

- `title` is optional — omit it to use the default label above. Only set a
  custom `title` when it's meaningfully more specific than the default
  (e.g. `title="Apache 2.4+ only"` on a `warning`), not as a rephrasing of
  the same word.
- Keep the body short — a sentence or two. If a callout needs several
  sentences or a code block, it's probably a real `##` section, not an aside.
- Don't stack asides back-to-back. If a step needs both a warning and a
  resolved-note, that's a sign the step needs restructuring, not two boxes
  in a row.
- Convert Google Docs–style bolded warning text ("**Note:** …", "**Important:**
  …") into an `<Aside>` with the matching variant rather than leaving it as
  inline bold — that's exactly the paste-artifact pattern this callout
  replaces.

### ASCII / directory trees

Use a fenced `text` code block (not `bash`) so syntax highlighting stays off:

```text
docroot/
└── web/
    └── app/
        └── themes/
            └── mytheme/
                ├── functions.php
                └── style.css
```

Box-drawing characters (`└──`, `├──`, `│`) are preferred over dash-indent
trees. Add one sentence of prose before the block explaining what the tree
represents.

---

## Code blocks

- Correct language tag: `bash`, `apache`, `css`, `text`, etc.
- Preserve fence meta (`wide`, etc.) — don't strip it as noise.
- No trailing blank line inside the fence.
- Keep inline comments that explain non-obvious logic; remove comments that
  restate what the code already says.

---

## Optional sections

Tangents (timestamped filenames, alternate configs, edge cases) belong in a
`## Optional: …` section at the end — not as a question in the closing
paragraph.

---

## Output

After editing, summarize:

1. **What changed** — bullet list grouped by copy / structure / images.
   Note whether `voice: preserve` was respected or if tone cleanup ran in
   full.
2. **Files touched** — MDX path and any image adds/removes/converts.
3. **Anything left for the user** — e.g. missing screenshots, factual
   verification, or frontmatter values only they can supply.

Do not invent content the user didn't provide. If a section needs a screenshot
that doesn't exist yet, note the gap and use a placeholder comment in the MDX
only if the user asked for it.
