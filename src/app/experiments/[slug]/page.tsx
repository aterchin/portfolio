import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Tag } from "@/components/ui/Tag/Tag";
import { getExperiment, getExperimentSlugs } from "@/lib/mdx";
import { getMDXComponents } from "@/lib/mdxComponents";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getExperimentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return {};
  return { title: experiment.title };
}

export default async function ExperimentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  const { content, title, status, tags } = experiment;
  const isWIP = status === "in-progress";

  const { content: MDXContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
    components: getMDXComponents(),
  });

  return (
    <PageWrapper>
      <article>
        <header className={styles.header}>
          <SectionLabel>
            Experiment{isWIP ? " — in progress" : ""}
          </SectionLabel>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{title}</h1>
            {/*
              WIP badge — same toggle as on ExperimentCard.
              Change `status: in-progress` to `status: published` in the
              MDX frontmatter to remove this badge from both the card and
              the detail page simultaneously. No code change needed.
            */}
            {isWIP && <span className={styles.wip}>In progress</span>}
          </div>
          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Tag key={tag} linked>
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </header>
        <div className={`prose ${styles.body}`}>{MDXContent}</div>
      </article>
    </PageWrapper>
  );
}
