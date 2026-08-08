import { getProjects, getSnippets, getExperiments } from "./mdx";

export type SearchItemType = "snippet" | "experiment" | "work";

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
  // Only set for in-progress experiments — mirrors ExperimentCard's WIP badge.
  badge?: string;
}

// Combined, newest-first index across snippets, experiments, and work.
// Built server-side (reads the filesystem via lib/mdx) and passed as a prop
// into the client Search component — never call this from client code.
export function getSearchIndex(): SearchItem[] {
  const snippets: SearchItem[] = getSnippets().map((s) => ({
    type: "snippet",
    title: s.title,
    slug: s.slug,
    href: `/snippets/${s.slug}`,
    date: s.date,
    summary: s.summary,
    tags: s.tags,
  }));

  const experiments: SearchItem[] = getExperiments().map((e) => ({
    type: "experiment",
    title: e.title,
    slug: e.slug,
    href: `/experiments/${e.slug}`,
    date: e.date,
    summary: e.summary,
    tags: e.tags ?? [],
    badge: e.status === "in-progress" ? "In progress" : undefined,
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

  return [...snippets, ...experiments, ...work].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}
