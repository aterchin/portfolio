import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import { getProjects } from "@/lib/mdx";

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <PageWrapper>
      <ProjectGrid projects={projects} label="Work" />
    </PageWrapper>
  );
}
