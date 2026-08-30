import Link from "next/link";
import { InProgressLabel } from "@/components/ui/InProgressLabel/InProgressLabel";
import styles from "./ContentList.module.css";

export interface ContentListItemProps {
  href: string;
  title: string;
  summary: string;
  tags: string[];
  /** Shown above the title — Search uses "Note" / "Work". */
  typeLabel?: string;
  inProgress?: boolean;
}

export interface ContentListProps {
  items: ContentListItemProps[];
  /** Optional class on the <ul> — Search adds top margin after the input. */
  className?: string;
}

function ContentListItem({
  href,
  title,
  summary,
  tags,
  typeLabel,
  inProgress,
}: ContentListItemProps) {
  return (
    <li>
      <Link href={href} className={`list-item ${styles.link}`}>
        {typeLabel && (
          <div className={styles.meta}>
            <span className={styles.type}>{typeLabel}</span>
          </div>
        )}
        <h3 className={styles.title}>
          {title}
          {inProgress && <InProgressLabel />}
        </h3>
        <p className={styles.summary}>{summary}</p>
        {tags.length > 0 && (
          <p className={styles.tags}>{tags.join(" · ")}</p>
        )}
      </Link>
    </li>
  );
}

export function ContentList({ items, className }: ContentListProps) {
  return (
    <ul className={className ? `list-stack ${className}` : "list-stack"}>
      {items.map((item) => (
        <ContentListItem key={item.href} {...item} />
      ))}
    </ul>
  );
}
