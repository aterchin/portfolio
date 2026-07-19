import Link from "next/link";
import { normalizeTag } from "@/lib/tags";
import styles from "./Tag.module.css";

type TagAccent = "terracotta" | "seafoam" | "yellow" | "periwinkle";

interface TagProps {
  children: string;
  accent?: TagAccent;
  // When true, renders as a <Link> to /tags/[normalized].
  // Keep false (default) inside card components to avoid nested anchor tags.
  linked?: boolean;
}

export function Tag({ children, accent = "terracotta", linked = false }: TagProps) {
  const className = `${styles.tag} ${styles[accent]}`;

  if (linked) {
    return (
      <Link href={`/tags/${normalizeTag(children)}`} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}
