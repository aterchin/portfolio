import { ProjectCard } from "@/components/work/ProjectCard/ProjectCard";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import type { Project } from "@/lib/types";
import styles from "./ProjectGrid.module.css";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className={styles.section}>
      <SectionLabel>Selected work</SectionLabel>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
