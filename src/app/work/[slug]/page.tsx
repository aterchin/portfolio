import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Tag } from "@/components/ui/Tag/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ToC } from "@/components/notes/ToC/ToC";
import { ContentDate } from "@/components/ui/ContentDate/ContentDate";
import { getProject, getProjectSlugs } from "@/lib/mdx";
import { getMDXComponents, mdxRemoteOptions } from "@/lib/mdxComponents";
import styles from "./page.module.css";

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
  return { title: project.title };
}

export default async function WorkSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { content, title, date, updated, type, tags, headings } = project;
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

      <div className={styles.layout}>
        <div className={styles.main}>
          <article>
            <header className={styles.header}>
              <h1 className={styles.title}>{title}</h1>
              <ContentDate date={date} updated={updated} />
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <Tag key={tag} linked>
                    {tag}
                  </Tag>
                ))}
              </div>
            </header>
            <div className={`prose ${styles.body}`}>{MDXContent}</div>
          </article>
        </div>
        {headings.length > 0 && (
          <aside className={styles.sidebar}>
            <ToC headings={headings} />
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}
