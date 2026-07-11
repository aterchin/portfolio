// Accent colors available per-project — maps to Tag component variants
export type AccentColor = "terracotta" | "seafoam" | "yellow" | "periwinkle";

// Work project — case study or showcase
export interface Project {
  title: string;
  slug: string;
  date: string;          // ISO 8601 — YYYY-MM-DD
  type: "case-study" | "showcase";
  status: "published" | "draft";
  tags: string[];
  accent: AccentColor;
  summary: string;
}

// Code snippet
export interface Snippet {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  summary: string;
}

// Experiment / WIP
export interface Experiment {
  title: string;
  slug: string;
  date: string;
  status: "published" | "in-progress";
  summary: string;
}
