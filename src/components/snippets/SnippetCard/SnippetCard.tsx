import Link from "next/link";
import type { Snippet } from "@/lib/types";
import styles from "./SnippetCard.module.css";

type SnippetCardProps = Pick<Snippet, "title" | "slug" | "tags" | "summary">;

export function SnippetCard({ title, slug, tags, summary }: SnippetCardProps) {
  return (
    <Link href={`/snippets/${slug}`} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <p className={styles.tags}>{tags.join(" · ")}</p>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
