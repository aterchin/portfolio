import { ProjectCard } from "@/components/work/ProjectCard/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import type { Project } from "@/lib/types";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
  label?: string;
}

export function ProjectGrid({ projects, label = "Selected work" }: ProjectGridProps) {
  return (
    <section className={styles.section}>
      <SectionLabel>{label}</SectionLabel>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
