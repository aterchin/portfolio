# MDX Cleanup

Polish pasted or draft MDX content under `src/content/` — copy, structure,
images, and Google Docs artifacts. Use after importing from Google Docs,
Notion, or a rough first draft.

## Objective

Bring a content file in line with this project's voice and conventions.
Snippets should read like [apache-reverse-proxy-node.mdx](src/content/notes/apache-reverse-proxy-node.mdx):
imperative, scannable, no fluff. Work and experiment posts can carry more
narrative, but the same structural rules apply.

Canonical reference for a polished snippet with images and an ASCII tree:
[src/content/snippets/sourcetree-custom-action.mdx](src/content/snippets/sourcetree-custom-action.mdx).

## Scope

1. Identify the target file — use the open file, a path the user provides,
   or changed files under `src/content/` from `git status`.
2. Read the file's content type (work / note) and match tone
   accordingly. Notes are reference docs; work posts are case studies.
3. Apply the cleanup rules below. Edit the file directly unless the user
   asked for a review-only pass.

---

## Frontmatter

- **`summary`**: one sentence — the *what*, not the backstory. Must not
  repeat the opening body paragraph verbatim.
- **`tags`**: consistent casing (`macOS`, not `Mac OS`; `Node.js`, not
  `node.js`).
- **`slug`**: must match the filename (minus `.mdx`).
- Run field validation against the schema in `mdx-validate.md` if frontmatter
  was added or changed.

---

## Copy and structure

### Remove Google Docs / paste artifacts

- Double spaces after periods.
- Escaped characters that may render literally (`\>` → `>`).
- Lettered steps (`Step A`, `Step B`) → descriptive `##` headings.
- Redundant `##` heading that duplicates the page `<h1>` (the layout already
  renders the title).
- Rhetorical questions or AI-draft leftovers (e.g. "Would you like to…").
  Convert to a real `## Optional: …` section with a code block, or delete.
- "Quick how-to" openers — start with the problem or outcome instead.

### Intro paragraph

- **Snippets**: 1–2 sentences max. Problem → desired outcome. No repetition
  of the frontmatter `summary`.
- **Work / experiments**: narrative is fine, but cut duplicate context between
  `summary` and body.

### Headings and lists

- Use `##` for major sections, `###` only when a section genuinely needs
  sub-parts.
- Config/setup fields: flat numbered list with **bold labels**, not nested
  bullet trees.
- Platform-specific paths: **SourceTree → Preferences** (Mac) or
  **Tools → Options** (Windows) — bold the menu path, plain `→` arrows.

### Tone

- Imperative verbs: "Save this as…", "Open…", "Set…".
- Dry and direct — no filler ("In this article we will…", "It's worth noting
  that…").
- First-person backstory is OK in one opening sentence when it explains *why*
  the snippet exists; don't carry it through every section.

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
- **One image**: `public/images/{work\|snippets\|experiments}/{slug}.webp`
- **Two or more images**: `public/images/{category}/{slug}/descriptive-name.webp`
- Delete replaced or unused image files from `public/images/`.

### `<Figure>` usage

Registered in `src/lib/mdxComponents.tsx`. Use for screenshots that benefit
from a caption:

```mdx
<Figure
  src="/images/snippets/my-slug/step-name.webp"
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
2. **Files touched** — MDX path and any image adds/removes/converts.
3. **Anything left for the user** — e.g. missing screenshots, factual
   verification, or frontmatter values only they can supply.

Do not invent content the user didn't provide. If a section needs a screenshot
that doesn't exist yet, note the gap and use a placeholder comment in the MDX
only if the user asked for it.
