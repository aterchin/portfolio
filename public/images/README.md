# Images

## File format

**WebP for all images.** Better compression than JPEG at equivalent quality,
supports transparency, universally supported. Export at 80–85% quality.

SVG for icons and illustrations that are vector-based — never rasterize these.

---

## Directory structure

```
public/
  images/
    work/
      project-slug-thumb.webp    ← card thumbnail (if used)
      project-slug-hero.webp     ← case study header image
    notes/
      note-slug.webp             ← single image
      note-slug/                 ← multiple images (step-by-step, etc.)
        step-name.webp
```

File names should match the MDX slug for the corresponding content. Use a
subfolder when a piece of content has two or more images; use a single file at
the category level when there is only one.

---

## Dimensions

### Inline body images (MDX content)
- **Width:** 1440px source
- **Height:** flexible — use natural aspect ratio
- **Display size:** constrained to `--layout-prose` (~680px) by CSS
- **Why 1440px:** provides clean 2x rendering on retina displays

### Case study / note header images
- **Width:** 1440px source
- **Aspect ratio:** 16:9 or 3:2 recommended
- These sit above the prose body, full prose-width

### Project card thumbnails (if added to ProjectCard)
- **Width:** 720px source
- **Aspect ratio:** 16:9 or 3:2 — must be consistent across all cards
  so the grid stays visually even
- **Why 720px:** cards render at ~360px wide, 720px gives clean 2x

---

## How to reference images in MDX

Use standard markdown image syntax — renders as a plain `<img>` tag,
styled by the `.body :global(img)` rule in each slug page CSS module:

```markdown
![Alt text describing the image](/images/work/project-slug-hero.webp)
```

Alt text is required — keep it descriptive, not decorative.

---

## How to use images in React components

Use Next.js `<Image>` from `next/image` for images in React components
(card thumbnails, page headers). Always provide explicit `width` and `height`
to prevent layout shift:

```tsx
import Image from "next/image";

<Image
  src="/images/work/project-slug-thumb.webp"
  alt="Brief description"
  width={720}
  height={405}
/>
```

---

## Notes

- `next/image` is **not** wired into the MDX renderer — body images use plain
  `<img>` tags. If lazy loading or responsive srcset becomes a priority for
  body images, add an `img` override to `src/lib/mdxComponents.tsx`.
- Images in `public/` are served at the root path — `/images/...` not
  `/public/images/...`.
- Optimize images before committing. Don't commit raw exports from Figma,
  Sketch, or Photoshop directly.
