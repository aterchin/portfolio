import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { getProjects } from "@/lib/mdx";

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <PageWrapper>
      <SectionLabel>Work</SectionLabel>
      <ProjectGrid projects={projects} />
    </PageWrapper>
  );
}
