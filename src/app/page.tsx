import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Search } from "@/components/home/Search/Search";
import { ProjectGrid } from "@/components/home/ProjectGrid/ProjectGrid";
import { getProjects } from "@/lib/mdx";
import { getSearchIndex } from "@/lib/search";

export default function Home() {
  const projects = getProjects();
  const searchIndex = getSearchIndex();

  return (
    <PageWrapper>
      <Search items={searchIndex} />
      <ProjectGrid projects={projects} />
    </PageWrapper>
  );
}
