import Link from "next/link";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Tag } from "@/components/ui/Tag/Tag";
import {
  getAllNormalizedTags,
  getContentByTag,
  getTagDisplayName,
} from "@/lib/tags";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return getAllNormalizedTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const displayName = getTagDisplayName(tag);
  return { title: `Tagged: ${displayName}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const { projects, snippets, experiments } = getContentByTag(tag);
  const displayName = getTagDisplayName(tag);

  const hasContent =
    projects.length > 0 || snippets.length > 0 || experiments.length > 0;

  if (!hasContent) notFound();

  return (
    <PageWrapper>
      <SectionLabel>Tagged</SectionLabel>
      <h1 className={styles.heading}>{displayName}</h1>

      {projects.length > 0 && (
        <section className={styles.group}>
          <h2 className={styles.groupHeading}>Work</h2>
          <ul className={styles.list}>
            {projects.map((project) => (
              <TagResultItem
                key={project.slug}
                href={`/work/${project.slug}`}
                title={project.title}
                summary={project.summary}
                tags={project.tags}
                meta={project.type === "case-study" ? "Case study" : "Showcase"}
              />
            ))}
          </ul>
        </section>
      )}

      {snippets.length > 0 && (
        <section className={styles.group}>
          <h2 className={styles.groupHeading}>Snippets</h2>
          <ul className={styles.list}>
            {snippets.map((snippet) => (
              <TagResultItem
                key={snippet.slug}
                href={`/snippets/${snippet.slug}`}
                title={snippet.title}
                summary={snippet.summary}
                tags={snippet.tags}
                meta="Snippet"
              />
            ))}
          </ul>
        </section>
      )}

      {experiments.length > 0 && (
        <section className={styles.group}>
          <h2 className={styles.groupHeading}>Experiments</h2>
          <ul className={styles.list}>
            {experiments.map((experiment) => (
              <TagResultItem
                key={experiment.slug}
                href={`/experiments/${experiment.slug}`}
                title={experiment.title}
                summary={experiment.summary}
                tags={experiment.tags ?? []}
                meta={experiment.status === "in-progress" ? "In progress" : "Experiment"}
              />
            ))}
          </ul>
        </section>
      )}
    </PageWrapper>
  );
}

// ─── Tag result list item ──────────────────────────────────────────────────────

interface TagResultItemProps {
  href: string;
  title: string;
  summary: string;
  tags: string[];
  meta: string;
}

function TagResultItem({ href, title, summary, tags, meta }: TagResultItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.itemMeta}>{meta}</div>
      <Link href={href} className={styles.itemTitle}>{title}</Link>
      <p className={styles.itemSummary}>{summary}</p>
      <div className={styles.itemTags}>
        {tags.map((t) => (
          <Tag key={t} linked>{t}</Tag>
        ))}
      </div>
    </li>
  );
}
