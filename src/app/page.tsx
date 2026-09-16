import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ArrowRight } from "@/components/ui/ArrowRight/ArrowRight";
import { getNotes, getProjects } from "@/lib/mdx";
import { Tag } from "@/components/ui/Tag/Tag";
import { getTopDisplayTags } from "@/lib/tags";
import styles from "./page.module.css";

const RECENT_NOTE_LIMIT = 6;
const TAG_PREVIEW_LIMIT = 6;

const arrowProps = {
  strokeWidth: 1,
} as const;

export default function Home() {
  const allNotes = getNotes();
  const recentNotes = allNotes.slice(0, RECENT_NOTE_LIMIT);
  const tags = getTopDisplayTags(TAG_PREVIEW_LIMIT);
  const projects = getProjects();
  const showAllNotes = allNotes.length > RECENT_NOTE_LIMIT;

  return (
    <PageWrapper>
      <div className={styles.layout}>
        <div className={styles.main}>
          {projects.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>Selected work</SectionLabel>
              <ContentList
                items={projects.map((project) => ({
                  href: `/work/${project.slug}`,
                  title: project.title,
                  subtitle: project.subtitle,
                  summary: project.summary,
                  tags: project.tags,
                  status: project.status,
                }))}
              />
              <Link href="/work" className={styles.viewAll}>
                View all →
              </Link>
            </section>
          )}
          {recentNotes.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>Notes</SectionLabel>
              <ContentList
                items={recentNotes.map((note) => ({
                  href: `/notes/${note.slug}`,
                  title: note.title,
                  subtitle: note.subtitle,
                  summary: note.summary,
                  tags: note.tags,
                  status: note.status,
                }))}
              />
              {showAllNotes ? (
                <Link href="/notes" className={styles.viewAll}>
                  View all
                  <span className={styles.arrow} aria-hidden>
                    <ArrowRight {...arrowProps} />
                  </span>
                </Link>
              ) : null}
            </section>
          )}
        </div>

        {tags.length > 0 && (
          <aside className={styles.sidebar}>
            <SectionLabel>Tags</SectionLabel>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Tag key={tag} linked>
                  {tag}
                </Tag>
              ))}
            </div>
          </aside>
        )}
      </div>
    </PageWrapper>
  );
}
