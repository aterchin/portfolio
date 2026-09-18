import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { getProjects } from "@/lib/mdx";
import styles from "./page.module.css";

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <PageWrapper>
      <SectionLabel>Work</SectionLabel>
      <div className={styles.intro}>
        <h1 className={styles.heading}>Selected Work</h1>
        <p className={styles.body}>
          Client work with a focus on specific problems.
        </p>
      </div>
      <ProjectGrid projects={projects} />
    </PageWrapper>
  );
}
