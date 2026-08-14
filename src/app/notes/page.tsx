import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import { NoteCard } from "@/components/notes/NoteCard/NoteCard";
import { getNotes } from "@/lib/mdx";
import styles from "./page.module.css";

export const metadata = { title: "Notes" };

export default function NotesPage() {
  const notes = getNotes();

  return (
    <PageWrapper>
      <SectionLabel>Notes</SectionLabel>
      <div className={styles.grid}>
        {notes.map((note) => (
          <NoteCard key={note.slug} {...note} />
        ))}
      </div>
    </PageWrapper>
  );
}
