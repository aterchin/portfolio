import { getProjects, getSnippets, getExperiments } from "./mdx";
import type { Project, Snippet, Experiment } from "./types";

// Normalize a tag to a URL-safe slug.
// "Next.js" → "next-js", "Google Maps API" → "google-maps-api"
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// Find the original display name for a normalized tag by scanning all content.
// Falls back to the normalized string if no match found.
export function getTagDisplayName(normalizedTag: string): string {
  const allTags = [
    ...getProjects().flatMap((p) => p.tags),
    ...getSnippets().flatMap((s) => s.tags),
    ...getExperiments().flatMap((e) => e.tags ?? []),
  ];
  return allTags.find((t) => normalizeTag(t) === normalizedTag) ?? normalizedTag;
}

// All unique normalized tags across all content types.
// Used in generateStaticParams for /tags/[tag].
export function getAllNormalizedTags(): string[] {
  const allTags = [
    ...getProjects().flatMap((p) => p.tags),
    ...getSnippets().flatMap((s) => s.tags),
    ...getExperiments().flatMap((e) => e.tags ?? []),
  ];
  return [...new Set(allTags.map(normalizeTag))];
}

// Unique original display names, alpha-sorted (case-insensitive).
// Used by the home page tag browse row — Tag linked normalizes the URL.
export function getAllDisplayTags(): string[] {
  const allTags = [
    ...getProjects().flatMap((p) => p.tags),
    ...getSnippets().flatMap((s) => s.tags),
    ...getExperiments().flatMap((e) => e.tags ?? []),
  ];

  const byNormalized = new Map<string, string>();
  for (const tag of allTags) {
    const key = normalizeTag(tag);
    if (!byNormalized.has(key)) {
      byNormalized.set(key, tag);
    }
  }

  return [...byNormalized.values()].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

export interface TaggedContent {
  projects: Project[];
  snippets: Snippet[];
  experiments: Experiment[];
}

// All content matching a normalized tag, grouped by type.
export function getContentByTag(normalizedTag: string): TaggedContent {
  return {
    projects: getProjects().filter((p) =>
      p.tags.some((t) => normalizeTag(t) === normalizedTag)
    ),
    snippets: getSnippets().filter((s) =>
      s.tags.some((t) => normalizeTag(t) === normalizedTag)
    ),
    experiments: getExperiments().filter((e) =>
      (e.tags ?? []).some((t) => normalizeTag(t) === normalizedTag)
    ),
  };
}
