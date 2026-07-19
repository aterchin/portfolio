import Link from "next/link";
import { normalizeTag } from "@/lib/tags";
import styles from "./Tag.module.css";

interface TagProps {
  children: string;
  // When true, renders as a <Link> to /tags/[normalized].
  // Keep false (default) inside card components to avoid nested anchor tags.
  linked?: boolean;
}

export function Tag({ children, linked = false }: TagProps) {
  if (linked) {
    return (
      <Link href={`/tags/${normalizeTag(children)}`} className={styles.tag}>
        {children}
      </Link>
    );
  }

  return <span className={styles.tag}>{children}</span>;
}
