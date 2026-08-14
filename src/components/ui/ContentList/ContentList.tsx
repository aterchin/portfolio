import Link from "next/link";
import styles from "./ContentList.module.css";

export interface ContentListItemProps {
  href: string;
  title: string;
  summary: string;
  tags: string[];
  /** Shown above the title — Search uses "Note" / "Work". */
  typeLabel?: string;
  /** e.g. "In progress" on notes. */
  badge?: string;
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
  badge,
}: ContentListItemProps) {
  const showMeta = Boolean(typeLabel || badge);

  return (
    <li className={styles.item}>
      <Link href={href} className={styles.link}>
        {showMeta && (
          <div className={styles.meta}>
            {typeLabel && <span className={styles.type}>{typeLabel}</span>}
            {badge && <span className={styles.badge}>{badge}</span>}
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
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
    <ul className={className ? `${styles.list} ${className}` : styles.list}>
      {items.map((item) => (
        <ContentListItem key={item.href} {...item} />
      ))}
    </ul>
  );
}
