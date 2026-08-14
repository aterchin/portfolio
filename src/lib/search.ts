import { getProjects, getNotes } from "./mdx";

export type SearchItemType = "note" | "work";

// A single, flattened shape all content types map to for search/browse.
// Frontmatter only — no MDX body — per the v1 search scope decision.
export interface SearchItem {
  type: SearchItemType;
  title: string;
  slug: string;
  href: string;
  date: string;
  summary: string;
  tags: string[];
  // Only set for in-progress notes — mirrors NoteCard's WIP badge.
  badge?: string;
}

// Combined, newest-first index across notes and work.
// Built server-side (reads the filesystem via lib/mdx) and passed as a prop
// from the root layout into the client Nav/Search — never call this from client code.
export function getSearchIndex(): SearchItem[] {
  const notes: SearchItem[] = getNotes().map((n) => ({
    type: "note",
    title: n.title,
    slug: n.slug,
    href: `/notes/${n.slug}`,
    date: n.date,
    summary: n.summary,
    tags: n.tags,
    badge: n.status === "in-progress" ? "In progress" : undefined,
  }));

  const work: SearchItem[] = getProjects().map((p) => ({
    type: "work",
    title: p.title,
    slug: p.slug,
    href: `/work/${p.slug}`,
    date: p.date,
    summary: p.summary,
    tags: p.tags,
  }));

  return [...notes, ...work].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}
