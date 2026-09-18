import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { getNotesGroupedByTag, normalizeTag } from "@/lib/tags";
import styles from "./page.module.css";

export const metadata = { title: "Notes" };

export default function NotesPage() {
  const groups = getNotesGroupedByTag();

  return (
    <PageWrapper>
      {/* Same shell as note detail: content-layout + optional sidebar */}
      <SectionLabel>Notes</SectionLabel>

      <div className={`content-layout ${styles.layout}`}>
        <div className="content-main">
          <div className={styles.groups}>
            {groups.map(({ tag, notes }) => {
              const id = normalizeTag(tag);
              return (
                <section key={id} id={id} className={styles.group}>
                  <h2 className={styles.groupHeading}>
                    <Link href={`/tags/${id}`}>{tag}</Link>
                  </h2>
                  <ContentList
                    className={styles.list}
                    items={notes.map((note) => ({
                      href: `/notes/${note.slug}`,
                      title: note.title,
                      summary: note.summary,
                      tags: [],
                      status: note.status,
                    }))}
                  />
                </section>
              );
            })}
          </div>
        </div>

        <aside className={`content-sidebar ${styles.sidebar}`}>
          <div className={`sticky-rail ${styles.sideInner}`}>
            <p className="side-label">Tags</p>
            <ul className={styles.tagList}>
              {groups.map(({ tag, notes }) => {
                const id = normalizeTag(tag);
                return (
                  <li key={id}>
                    <a href={`#${id}`} className={styles.tagLink}>
                      {tag}{" "}
                      <span className={styles.tagCount}>({notes.length})</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </PageWrapper>
  );
}
