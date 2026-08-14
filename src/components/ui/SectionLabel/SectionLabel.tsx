import Link from "next/link";
import styles from "./SectionLabel.module.css";

interface SectionLabelProps {
  children: React.ReactNode;
  /** Optional trailing action — e.g. "View all →" linking to an index page. */
  href?: string;
  actionLabel?: string;
}

export function SectionLabel({ children, href, actionLabel }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <span>{children}</span>
      {href && actionLabel ? (
        <Link href={href} className={styles.action}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
