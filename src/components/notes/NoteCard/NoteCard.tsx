import { Card } from "@/components/ui/Card/Card";
import type { Note } from "@/lib/types";

export interface NoteCardProps {
  title: Note["title"];
  subtitle?: Note["subtitle"];
  slug: Note["slug"];
  summary: Note["summary"];
  tags: Note["tags"];
}

export function NoteCard({ title, subtitle, slug, summary, tags }: NoteCardProps) {
  return (
    <Card
      href={`/notes/${slug}`}
      title={title}
      subtitle={subtitle}
      summary={summary}
      tags={tags}
    />
  );
}
