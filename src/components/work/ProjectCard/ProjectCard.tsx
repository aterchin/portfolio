import Link from "next/link";
import type { Project } from "@/lib/types";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = Pick<Project, "title" | "slug" | "date" | "type" | "tags" | "summary">;

export function ProjectCard({ title, slug, date, type, tags, summary }: ProjectCardProps) {
  const year = parseInt(date.slice(0, 4), 10);

  return (
    <Link href={`/work/${slug}`} className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.year}>{year}</span>
        <span className={styles.type}>{type === "case-study" ? "Case study" : "Showcase"}</span>
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
