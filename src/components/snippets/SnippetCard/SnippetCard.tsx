import Link from "next/link";
import { Tag } from "@/components/ui/Tag/Tag";
import type { Snippet } from "@/lib/types";
import styles from "./SnippetCard.module.css";

type SnippetCardProps = Pick<Snippet, "title" | "slug" | "tags" | "summary">;

export function SnippetCard({ title, slug, tags, summary }: SnippetCardProps) {
  return (
    <Link href={`/snippets/${slug}`} className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} accent="periwinkle">{tag}</Tag>
          ))}
        </div>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
