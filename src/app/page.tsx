import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Tag } from "@/components/ui/Tag/Tag";
import { getNotes, getProjects } from "@/lib/mdx";
import { getTopDisplayTags } from "@/lib/tags";
import styles from "./page.module.css";

const RECENT_NOTE_LIMIT = 6;
const TAG_PREVIEW_LIMIT = 6;

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
          {recentNotes.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>Notes</SectionLabel>
              <ContentList
                items={recentNotes.map((note) => ({
                  href: `/notes/${note.slug}`,
                  title: note.title,
                  summary: note.summary,
                  tags: note.tags,
                  inProgress: note.status === "in-progress",
                }))}
              />
              {showAllNotes ? (
                <Link href="/notes" className={styles.viewAll}>
                  View all →
                </Link>
              ) : null}
            </section>
          )}

          {projects.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>Selected work</SectionLabel>
              <ContentList
                items={projects.map((project) => ({
                  href: `/work/${project.slug}`,
                  title: project.title,
                  summary: project.summary,
                  tags: project.tags,
                }))}
              />
              <Link href="/work" className={styles.viewAll}>
                View all →
              </Link>
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
