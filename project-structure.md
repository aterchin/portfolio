# Portfolio — Project Structure

## Stack decisions (locked)
- **Framework:** Next.js (App Router)
- **CSS:** CSS Modules + CSS custom properties + PostCSS (nesting)
- **Content:** MDX file-based with frontmatter
- **Email:** Resend + Next.js API route handler
- **Deployment:** Linode VPS — Node.js + PM2 + Apache (reverse proxy)
- **Fonts:** Newsreader (display) + Instrument Sans (body) + JetBrains Mono (code)
- **Accent:** Terracotta primary, seafoam/yellow/periwinkle supporting

---

## Directory structure

```
portfolio/
├── .cursor/
│   └── rules/
│       └── portfolio.mdc          # Cursor rules — mirror decisions from project instructions
│
├── .env.local                     # secrets — not committed
├── .env.example                   # committed — documents required env vars
│   # RESEND_API_KEY=
│   # CONTACT_TO_EMAIL=
│
├── next.config.js                 # output: 'standalone', MDX config
├── postcss.config.js              # postcss-nesting plugin
├── package.json
│
├── public/
│   ├── fonts/                     # self-host if needed (perf over Google Fonts in prod)
│   └── og/                        # Open Graph images
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx             # root layout — loads tokens, ThemeProvider, fonts
│   │   ├── page.tsx               # home / hero
│   │   ├── globals.css            # @import tokens.css + bare resets only. no component styles here.
│   │   │
│   │   ├── work/
│   │   │   ├── page.tsx           # project index
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # dynamic case study or showcase page
│   │   │
│   │   ├── snippets/
│   │   │   ├── page.tsx           # snippet index
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── experiments/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts       # Resend handler
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav/
│   │   │   │   ├── Nav.tsx
│   │   │   │   └── Nav.module.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Footer.module.css
│   │   │   └── PageWrapper/       # handles page padding, max-width, fade-in
│   │   │       ├── PageWrapper.tsx
│   │   │       └── PageWrapper.module.css
│   │   │
│   │   ├── ui/                    # reusable primitives
│   │   │   ├── Button/
│   │   │   ├── Tag/
│   │   │   ├── CodeBlock/
│   │   │   └── SectionLabel/      # the mono uppercase label used throughout
│   │   │
│   │   ├── home/                  # page-specific sections
│   │   │   ├── Hero/
│   │   │   └── ProjectGrid/
│   │   │
│   │   ├── work/
│   │   │   ├── ProjectCard/
│   │   │   └── CaseStudy/        # MDX wrapper with case study layout
│   │   │
│   │   ├── snippets/
│   │   │   └── SnippetCard/
│   │   │
│   │   └── contact/
│   │       └── ContactForm/
│   │
│   ├── styles/
│   │   ├── tokens.css             # canonical token file — imported once in globals.css
│   │   └── utils.css              # global layout utilities (flex, grid helpers, prose)
│   │
│   ├── content/                   # MDX content — all authored here
│   │   ├── work/
│   │   │   ├── municipal-water-authority.mdx
│   │   │   └── coffee-roaster.mdx
│   │   ├── snippets/
│   │   │   └── nginx-rate-limiting.mdx
│   │   └── experiments/
│   │       └── design-surface.mdx
│   │
│   ├── lib/
│   │   ├── mdx.ts                 # MDX parsing, frontmatter extraction, slug generation
│   │   ├── resend.ts              # Resend client setup
│   │   └── types.ts               # shared TypeScript types (Project, Snippet, etc.)
│   │
│   └── providers/
│       └── ThemeProvider.tsx      # sets data-theme on <html>, reads prefers-color-scheme
│
└── deploy/
    ├── ecosystem.config.js        # PM2 config
    ├── apache.conf                # Apache VirtualHost — reverse proxy to localhost:3000
    └── deploy.sh                  # pull → build → restart script
```

---

## MDX frontmatter schemas

### Work (case study)
```yaml
---
title: Municipal Water Authority Redesign
slug: municipal-water-authority
date: 2022-06-01
type: case-study          # or: showcase
status: published         # or: draft
tags: [Drupal, Linux, CSS]
accent: seafoam           # which palette accent to use for this project's tags
summary: Rebuilt a city-facing Drupal 7 site. Migrated content, rebuilt the theme.
---
```

### Snippet
```yaml
---
title: Nginx rate limiting for contact form routes
slug: nginx-rate-limiting
date: 2024-01-15
tags: [Nginx, Linux, Security]
summary: Limit POST requests to specific routes at the server level before they hit Next.js.
---
```

### Experiment
```yaml
---
title: Portfolio design surface
slug: design-surface
date: 2024-11-01
status: in-progress       # shows WIP indicator
summary: The design exploration session that produced this site's visual direction.
---
```

---

## Key conventions

**CSS Modules:**
- One `.module.css` per component directory
- Never style across component boundaries
- All values from `tokens.css` variables — no hardcoded colors, sizes, or fonts
- `utils.css` for layout patterns used across many components (`.flex`, `.prose`, `.grid-auto`)

**MDX:**
- Content lives in `src/content/` — never in `app/`
- `lib/mdx.ts` handles all parsing, slug generation, sorting
- Custom MDX components (CodeBlock, etc.) registered once in the MDX provider

**API routes:**
- `api/contact/route.ts` validates input, rate-limits, calls Resend
- Rate limiting: simple in-memory approach to start; can swap to Redis later if needed

**Deployment:**
- `next.config.js`: `output: 'standalone'`
- PM2 manages the Node process
- Apache reverse-proxies to `localhost:3000` via `mod_proxy`/`mod_proxy_http`,
  handles SSL via `mod_ssl` + certbot
- `deploy.sh`: `git pull → npm run build → pm2 reload portfolio`

---

## What to build first (suggested order)

1. `tokens.css` + `globals.css` + PostCSS config — design system foundation
2. `ThemeProvider` — dark mode switching before any UI
3. `Nav` + `PageWrapper` — shell everything else lives inside
4. `Hero` section — first real test of the type system in context
5. `ProjectCard` + `Tag` + `ProjectGrid` — most visible content surface
6. MDX pipeline (`lib/mdx.ts` + work/[slug] route)
7. `ContactForm` + `api/contact` route
8. Snippets + Experiments sections
9. Deploy pipeline — PM2 config + Apache vhost + deploy script
```
