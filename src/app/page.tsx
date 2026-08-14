import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import { getProjects } from "@/lib/mdx";

export default function Home() {
  const projects = getProjects();

  return (
    <PageWrapper>
      <ProjectGrid projects={projects} />
    </PageWrapper>
  );
}
