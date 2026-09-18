import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { Hero } from "@/components/home/Hero/Hero";
import { ArrowRight } from "@/components/ui/ArrowRight/ArrowRight";
import { SquareText } from "lucide-react";
import { getNotes } from "@/lib/mdx";
import styles from "./page.module.css";

const RECENT_NOTE_LIMIT = 5;

const arrowProps = {
  strokeWidth: 1,
} as const;

export default function Home() {
  const notes = getNotes().filter((n) => n.status !== "draft");
  const recentNotes = notes.slice(0, RECENT_NOTE_LIMIT);

  return (
    <PageWrapper>
      <Hero />
      <div className={styles.layout}>
        <div className={styles.main}>
          {notes.length > 0 && (
            <section className={styles.section}>
              <SectionLabel>All notes</SectionLabel>
              <ContentList
                items={notes.map((item) => ({
                  href: `/notes/${item.slug}`,
                  title: item.title,
                  subtitle: item.subtitle,
                  summary: item.summary,
                  tags: item.tags,
                  status: item.status,
                }))}
              />
              <Link href="/notes" className={styles.viewAll}>
                View all
                <span className={styles.arrow} aria-hidden>
                  <ArrowRight {...arrowProps} />
                </span>
              </Link>
            </section>
          )}
        </div>
        <aside className={styles.sidebar}>
          <SectionLabel>Recent notes</SectionLabel>
          {recentNotes.length > 0 && (
            <ul className={`${styles.notes} list-stack`}>
              {recentNotes.map((note) => (
                <li key={note.slug}>
                  <Link href={`/notes/${note.slug}`} className={`list-item`}>
                    <span className={styles.noteIcon} aria-hidden>
                      <SquareText size={18} strokeWidth={1.5} />
                    </span>
                    {note.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </PageWrapper>
  );
}
