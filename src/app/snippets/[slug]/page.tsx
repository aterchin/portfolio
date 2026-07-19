import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { Tag } from "@/components/ui/Tag/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { getSnippet, getSnippetSlugs } from "@/lib/mdx";
import { getMDXComponents } from "@/lib/mdxComponents";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getSnippetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = getSnippet(slug);
  if (!snippet) return {};
  return { title: snippet.title };
}

export default async function SnippetSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = getSnippet(slug);
  if (!snippet) notFound();

  const { content, title, tags } = snippet;

  const { content: MDXContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
    components: getMDXComponents(),
  });

  return (
    <PageWrapper>
      <article>
        <header className={styles.header}>
          <SectionLabel>Snippet</SectionLabel>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} accent="periwinkle" linked>{tag}</Tag>
            ))}
          </div>
        </header>
        <div className="prose">{MDXContent}</div>
      </article>
    </PageWrapper>
  );
}
