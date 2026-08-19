# Accessibility Check

Review changed components for basic accessibility issues — not a full audit,
but the things that are cheap to catch before commit.

## Objective
Keep the site usable with a keyboard and a screen reader without turning
this into a compliance exercise.

## Steps
1. Scope to changed files (`git diff --name-only HEAD`).
2. Check each changed component/page for:
   - Semantic HTML used where it fits (`<button>` for actions, `<a>` for
     navigation, headings in order — no skipped levels, one `<h1>` per page).
   - Interactive elements are keyboard-reachable and show a visible focus
     state (check the CSS Module for a `:focus-visible` rule, not just
     `:hover`).
   - Images have meaningful `alt` text (or `alt=""` if genuinely
     decorative — call out which you chose and why).
   - Form inputs (contact form) have associated `<label>`s, not just
     placeholder text.
   - Color is never the only signal (e.g. a status/tag shouldn't rely on
     hue alone — check there's also text or an icon).
   - Both light and dark `data-theme` values still meet contrast — spot
     check any new accent/text pairing against the AA note in
     `tokens.css`.
   - Motion respects `prefers-reduced-motion` if the animation is more than
     a simple fade.

## Output
Checklist per file. If something's ambiguous (e.g. whether an image is
decorative), ask rather than guess.
