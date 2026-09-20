import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SimpleList } from "@/components/ui/SimpleList/SimpleList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Hero } from "@/components/home/Hero/Hero";

import { getNotes } from "@/lib/mdx";
import styles from "./page.module.css";

const RECENT_NOTE_LIMIT = 5;

export default function Home() {
  const notes = getNotes().filter((n) => n.status !== "draft");
  const recentNotes = notes.slice(0, RECENT_NOTE_LIMIT);

  return (
    <PageWrapper>
      <Hero />
      <div className={styles.layout}>
        <div className={styles.main}>
        </div>
        <aside className={styles.sidebar}>
          <SectionLabel>Recent notes</SectionLabel>
          {recentNotes.length > 0 && (
            <SimpleList
              items={recentNotes.map((item) => ({
                href: `/notes/${item.slug}`,
                title: item.title,
              }))}
            />
          )}
        </aside>
      </div>
    </PageWrapper>
  );
}
