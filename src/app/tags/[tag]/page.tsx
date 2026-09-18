import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
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
  const { projects, notes } = getContentByTag(tag);
  const displayName = getTagDisplayName(tag);

  const hasContent = projects.length > 0 || notes.length > 0;

  if (!hasContent) notFound();

  return (
    <PageWrapper>
      <SectionLabel>Tagged</SectionLabel>
      <h1 className={styles.heading}>{displayName}</h1>

      {projects.length > 0 && (
        <section className={styles.group}>
          <ContentList
            items={projects.map((item) => ({
              href: `/work/${item.slug}`,
              title: item.title,
              subtitle: item.subtitle,
              summary: item.summary,
              tags: [],
              typeLabel:
                item.type === "case-study" ? "Case study" : "Showcase",
            }))}
          />
        </section>
      )}

      {notes.length > 0 && (
        <section className={styles.group}>
          <ContentList
            items={notes.map((item) => ({
              href: `/notes/${item.slug}`,
              title: item.title,
              subtitle: item.subtitle,
              summary: item.summary,
              tags: [],
              status: item.status,
            }))}
          />
        </section>
      )}
    </PageWrapper>
  );
}
