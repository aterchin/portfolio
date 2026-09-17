import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { ArrowRight } from "@/components/ui/ArrowRight/ArrowRight";
import { SquareText } from "lucide-react";
import { getNotes, getProjects } from "@/lib/mdx";
import styles from "./page.module.css";

const RECENT_NOTE_LIMIT = 5;

const arrowProps = {
  strokeWidth: 1,
} as const;

export default function Home() {
  const allNotes = getNotes().filter((n) => n.status !== "draft");
  const recentNotes = allNotes.slice(0, RECENT_NOTE_LIMIT);
  const projects = getProjects();

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
            <ul className={ `${styles.notes} list-stack`}>
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
