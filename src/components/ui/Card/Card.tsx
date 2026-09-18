import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/ArrowRight/ArrowRight";
import styles from "./Card.module.css";

export interface CardProps {
  href: string;
  title: string;
  subtitle?: string;
  summary: string;
  tags: string[];
  /** Optional content above the title (e.g. ProjectCard meta row) */
  children?: ReactNode;
  /** Patrick Bateman effect */
  shine?: boolean;
  status?: "published" | "draft";
}

const arrowProps = {
  strokeWidth: 1,
} as const;

export function Card({
  href,
  title,
  subtitle,
  summary,
  tags,
  children,
  shine = false,
  status,
}: CardProps) {
  return (
    <Link href={href} className={styles.card}>
      {shine && <div className={styles.patrickBateman} aria-hidden />}
      {children}
      <h3
        className={
          status === "draft"
            ? `list-title ${styles.title} draft-title`
            : `list-title ${styles.title}`
        }
      >
        {title}
      </h3>
      {subtitle && (
        <p className={`list-subtitle ${styles.subtitle}`}>{subtitle}</p>
      )}
      <p className={`list-summary ${styles.summary}`}>{summary}</p>
      <div className={styles.footer}>
        <p className={styles.tags}>{tags.join(" · ")}</p>
        <span className={styles.arrow} aria-hidden>
          <ArrowRight {...arrowProps} />
        </span>
      </div>
    </Link>
  );
}
