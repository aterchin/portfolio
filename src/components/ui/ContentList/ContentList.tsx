import Link from "next/link";
import styles from "./ContentList.module.css";

export interface ContentListItemProps {
  href: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  /** Shown above the title — Search uses "Note" / "Work". */
  typeLabel?: string;
  status?: "published" | "draft";
}

export interface ContentListProps {
  items: ContentListItemProps[];
  /** Optional class on the <ul> — Search adds top margin after the input. */
  className?: string;
}

function ContentListItem({
  href,
  title,
  subtitle,
  summary,
  tags,
  typeLabel,
  status,
}: ContentListItemProps) {
  return (
    <li>
      <Link href={href} className="list-item">
        {typeLabel && (
          <div className={styles.meta}>
            <span className={styles.type}>{typeLabel}</span>
          </div>
        )}
        <h3
          className={
            status === "draft" ? "list-title draft-title" : "list-title"
          }
        >
          {title}
        </h3>
        {subtitle && <p className="list-subtitle">{subtitle}</p>}
        <p className="list-summary">{summary}</p>
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
