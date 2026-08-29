# Design Consistency Check

Audit changed files against this project's locked design decisions. This
catches things ESLint/tsc can't — they're style conventions, not syntax
errors.

## Objective
Make sure new or edited CSS/components stay consistent with
`src/styles/tokens.css` and the design direction in the project
instructions, without needing a human to eyeball every diff.

## Steps
1. Get changed files via `git diff --name-only HEAD` — scope the review to
   these only.
2. For each `.module.css` file changed, check:
   - Every color value traces back to a `--color-*` token (no raw hex/rgb/hsl).
   - Every font-size uses a `--text-*` token; nothing smaller than
     `--text-xs`. No raw `px`/`rem` for type.
   - `font-family` only ever references `--font-display`, `--font-body`,
     `--font-ui`, or `--font-mono` — never a hardcoded font name.
   - Italics are allowed for body prose (Newsreader italic) — don't flag
     `font-style: italic` or semantic `<em>` in body copy.
   - Accent text-on-mute pairs use the `-text` variant, not the raw accent,
     for AA contrast (per the tokens.css convention).
   - Motion only uses `--duration-*` / `--ease-*` tokens — nothing bouncy,
     no infinite loops, no attention-seeking animation.
   - Dashed borders or other structural "retro" chrome — flag it; the 90s
     nod is palette-only.
3. For each component file (`.tsx`) changed, check:
   - No Tailwind utility classes, no `styled-components`/`emotion`, no
     inline `style={{}}` except for genuinely dynamic values (e.g. a
     computed width).
   - CSS Modules import only within the same component directory — flag any
     cross-component style imports.
4. If anything looks like it's chasing a "quirky portfolio" cliché (skills
   bars, timeline résumé, hero+headshot, gradient/glassmorphism, neon-on-dark)
   flag it even if it isn't a hard rule violation.

## Output
A checklist of ✅/⚠️/❌ per file with the specific line and rule violated.
If nothing found, say so plainly — don't invent nitpicks to fill space.
