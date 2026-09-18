import { ProjectCard } from "@/components/work/ProjectCard/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import type { Project } from "@/lib/types";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
  /** When omitted or empty, the section label is not rendered. */
  label?: string;
}

export function ProjectGrid({ projects, label }: ProjectGridProps) {
  return (
    <section className={styles.section}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
