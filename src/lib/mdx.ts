import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, Snippet, Experiment } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Read a single MDX file, parse frontmatter, return typed data + raw content string.
// The content string is the MDX body after the frontmatter block — not yet rendered.
function parseFile<T>(filePath: string): T & { content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as T), content };
}

function mdxFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"));
}

// ─── Work ─────────────────────────────────────────────────────────────────────

const WORK_DIR = path.join(CONTENT_DIR, "work");

// All published projects, sorted newest first.
// Used by the home page ProjectGrid and the work index page.
export function getProjects(): Project[] {
  return mdxFiles(WORK_DIR)
    .map((file) => {
      const { content: _content, ...frontmatter } = parseFile<Project>(
        path.join(WORK_DIR, file)
      );
      return frontmatter;
    })
    .filter((p) => p.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

// A single project by slug, including the raw MDX content string.
// Returns null if the file doesn't exist — callers should notFound().
export function getProject(slug: string): (Project & { content: string }) | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseFile<Project>(filePath);
}

// All work slugs — used in generateStaticParams.
export function getProjectSlugs(): string[] {
  return mdxFiles(WORK_DIR).map((f) => f.replace(".mdx", ""));
}

// ─── Snippets ─────────────────────────────────────────────────────────────────

const SNIPPETS_DIR = path.join(CONTENT_DIR, "snippets");

export function getSnippets(): Snippet[] {
  return mdxFiles(SNIPPETS_DIR)
    .map((file) => {
      const { content: _content, ...frontmatter } = parseFile<Snippet>(
        path.join(SNIPPETS_DIR, file)
      );
      return frontmatter;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getSnippet(slug: string): (Snippet & { content: string }) | null {
  const filePath = path.join(SNIPPETS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseFile<Snippet>(filePath);
}

export function getSnippetSlugs(): string[] {
  return mdxFiles(SNIPPETS_DIR).map((f) => f.replace(".mdx", ""));
}

// ─── Experiments ──────────────────────────────────────────────────────────────

const EXPERIMENTS_DIR = path.join(CONTENT_DIR, "experiments");

export function getExperiments(): Experiment[] {
  return mdxFiles(EXPERIMENTS_DIR)
    .map((file) => {
      const { content: _content, ...frontmatter } = parseFile<Experiment>(
        path.join(EXPERIMENTS_DIR, file)
      );
      return frontmatter;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getExperiment(slug: string): (Experiment & { content: string }) | null {
  const filePath = path.join(EXPERIMENTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseFile<Experiment>(filePath);
}

export function getExperimentSlugs(): string[] {
  return mdxFiles(EXPERIMENTS_DIR).map((f) => f.replace(".mdx", ""));
}
