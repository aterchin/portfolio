import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Tag } from "@/components/ui/Tag/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ToC } from "@/components/notes/ToC/ToC";
import { ContentDate } from "@/components/ui/ContentDate/ContentDate";
import { getProject, getProjectSlugs } from "@/lib/mdx";
import { getMDXComponents, mdxRemoteOptions } from "@/lib/mdxComponents";

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.subtitle
      ? `${project.title} — ${project.subtitle}`
      : project.title,
  };
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { content, title, subtitle, date, updated, type, tags, headings } = project;
  const year = parseInt(date.slice(0, 4), 10);

  const { content: MDXContent } = await compileMDX({
    source: content,
    options: mdxRemoteOptions,
    components: getMDXComponents(),
  });

  return (
    <PageWrapper>
      {/* Label sits above the grid so the ToC can align with the title row */}
      <SectionLabel>
        {type === "case-study" ? "Case study" : "Showcase"} — {year}
      </SectionLabel>

      <div className="content-layout">
        <div className="content-main">
          <article>
            <header className="content-header">
              <h1 className="content-title">{title}</h1>
              {subtitle && <p className="content-subtitle">{subtitle}</p>}
              <ContentDate date={date} updated={updated} />
              <div className="content-tags">
                {tags.map((tag) => (
                  <Tag key={tag} linked>
                    {tag}
                  </Tag>
                ))}
              </div>
            </header>
            <div className="prose">{MDXContent}</div>
          </article>
        </div>
        {headings.length > 0 && (
          <aside className="content-sidebar">
            <ToC headings={headings} />
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}
