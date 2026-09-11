import type { Project } from "@/lib/types";
import { Card } from "@/components/ui/Card/Card";
import styles from "./ProjectCard.module.css";

export interface ProjectCardProps {
  title: Project["title"];
  subtitle?: Project["subtitle"];
  slug: Project["slug"];
  date: Project["date"];
  type: Project["type"];
  tags: Project["tags"];
  summary: Project["summary"];
}

export function ProjectCard({ title, subtitle, slug, date, type, tags, summary }: ProjectCardProps) {
  const year = parseInt(date.slice(0, 4), 10);

  return (
    <Card
      href={`/work/${slug}`}
      title={title}
      subtitle={subtitle}
      summary={summary}
      tags={tags}
    >
      <div className={styles.meta}>
        <span className={styles.year}>{year}</span>
        <span className={styles.type}>{type === "case-study" ? "Case study" : "Showcase"}</span>
      </div>
    </Card>
  );
}
