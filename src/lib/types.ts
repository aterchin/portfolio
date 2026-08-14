// Work project — case study or showcase
export interface Project {
  title: string;
  slug: string;
  date: string;          // ISO 8601 — YYYY-MM-DD
  type: "case-study" | "showcase";
  status: "published" | "draft";
  tags: string[];
  summary: string;
}

// Note — code snippet, write-up, or WIP
export interface Note {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  summary: string;
  status?: "published" | "in-progress";
}
