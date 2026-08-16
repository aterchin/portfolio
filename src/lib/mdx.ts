import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, Note } from "./types";
import { extractMdxHeadings, type HeadingData } from "./headings";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Read a single MDX file, parse frontmatter, return typed data + raw content string.
// The content string is the MDX body after the frontmatter block — not yet rendered.
function parseFile<T>(filePath: string): T & { content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // gray-matter parses YAML dates as Date objects.
  // Coerce to ISO string so downstream code can treat date as a string consistently.
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split("T")[0];
  }

  return { ...(data as T), content };
}

function mdxFiles(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"));
}

// Frontmatter only — drops the MDX body returned by parseFile.
function frontmatterOnly<T>(filePath: string): T {
  const { content, ...frontmatter } = parseFile<T>(filePath);
  void content;
  return frontmatter as T;
}

// ─── Work ─────────────────────────────────────────────────────────────────────

const WORK_DIR = path.join(CONTENT_DIR, "work");

// All published projects, sorted newest first.
// Used by the home page ProjectGrid and the work index page.
export function getProjects(): Project[] {
  return mdxFiles(WORK_DIR)
    .map((file) => frontmatterOnly<Project>(path.join(WORK_DIR, file)))
    .filter((p) => p.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

// A single project by slug, including the raw MDX content string + headings.
// Returns null if the file doesn't exist — callers should notFound().
export function getProject(
  slug: string,
): (Project & { content: string; headings: HeadingData[] }) | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const project = parseFile<Project>(filePath);
  const headings = extractMdxHeadings(project.content);

  return { ...project, headings };
}

// All work slugs — used in generateStaticParams.
export function getProjectSlugs(): string[] {
  return mdxFiles(WORK_DIR).map((f) => f.replace(".mdx", ""));
}

// ─── Notes ────────────────────────────────────────────────────────────────────

const NOTES_DIR = path.join(CONTENT_DIR, "notes");

export function getNotes(): Note[] {
  return mdxFiles(NOTES_DIR)
    .map((file) => frontmatterOnly<Note>(path.join(NOTES_DIR, file)))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNote(slug: string): (Note & { content: string, headings: HeadingData[] }) | null {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const note = parseFile<Note>(filePath);
  const headings = extractMdxHeadings(note.content);

  return {...note, headings};
}

export function getNoteSlugs(): string[] {
  return mdxFiles(NOTES_DIR).map((f) => f.replace(".mdx", ""));
}
