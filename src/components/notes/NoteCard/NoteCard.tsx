import Link from "next/link";
import { InProgressLabel } from "@/components/ui/InProgressLabel/InProgressLabel";
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
      <h3 className={styles.title}>
        {title}
        {isWIP && <InProgressLabel />}
      </h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <p className={styles.tags}>{tags.join(" · ")}</p>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
