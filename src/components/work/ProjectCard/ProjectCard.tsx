import Link from "next/link";
import { Tag } from "@/components/ui/Tag/Tag";
import type { Project } from "@/lib/types";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = Pick<Project, "title" | "slug" | "date" | "type" | "tags" | "accent" | "summary">;

export function ProjectCard({ title, slug, date, type, tags, accent, summary }: ProjectCardProps) {
  const year = new Date(date).getFullYear();

  return (
    <Link href={`/work/${slug}`} className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.year}>{year}</span>
        <span className={styles.type}>{type === "case-study" ? "Case study" : "Showcase"}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} accent={accent}>{tag}</Tag>
          ))}
        </div>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
