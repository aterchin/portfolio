import Link from "next/link";
import type { Note } from "@/lib/types";
import styles from "./NoteCard.module.css";

export interface NoteCardProps {
  title: Note["title"];
  slug: Note["slug"];
  summary: Note["summary"];
  tags: Note["tags"];
  status?: Note["status"];
}

export function NoteCard({ title, slug, status, summary, tags }: NoteCardProps) {
  const isWIP = status === "in-progress";

  return (
    <Link href={`/notes/${slug}`} className={styles.card}>
      <div className={styles.header}>
        {/*
          WIP indicator — controlled entirely by the optional `status` field in frontmatter.
          To hide it: omit `status` or set `status: published`.
          To show it: set `status: in-progress`.
          No code change required — the frontmatter field is the only toggle.
        */}
        {isWIP && <span className={styles.wip}>In progress</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <p className={styles.tags}>{tags.join(" · ")}</p>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
