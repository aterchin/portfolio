import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Tag } from "@/components/ui/Tag/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { getProject, getProjectSlugs } from "@/lib/mdx";
import styles from "./page.module.css";

// Tell Next.js all valid slugs at build time so pages are pre-rendered.
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

  const { content, title, date, type, tags, accent } = project;
  const year = new Date(date).getFullYear();

  // compileMDX renders the MDX body string into a React Server Component.
  // Custom components can be passed here to override default MDX elements
  // (e.g. pre → CodeBlock) — we'll add those when CodeBlock is built.
  const { content: MDXContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return (
    <PageWrapper>
      <article>
        <header className={styles.header}>
          <SectionLabel>
            {type === "case-study" ? "Case study" : "Showcase"} — {year}
          </SectionLabel>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} accent={accent}>
                {tag}
              </Tag>
            ))}
          </div>
        </header>
        <div className={styles.body}>{MDXContent}</div>
      </article>
    </PageWrapper>
  );
}
