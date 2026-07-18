import Link from "next/link";
import type { Experiment } from "@/lib/types";
import styles from "./ExperimentCard.module.css";

type ExperimentCardProps = Pick<Experiment, "title" | "slug" | "status" | "summary">;

export function ExperimentCard({ title, slug, status, summary }: ExperimentCardProps) {
  const isWIP = status === "in-progress";

  return (
    <Link href={`/experiments/${slug}`} className={styles.card}>
      <div className={styles.header}>
        {/*
          WIP indicator — controlled entirely by the `status` field in frontmatter.
          To hide it: change `status: in-progress` to `status: published` in the MDX file.
          To show it: change `status: published` to `status: in-progress`.
          No code change required — the frontmatter field is the only toggle.
        */}
        {isWIP && <span className={styles.wip}>In progress</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.footer}>
        <span className={styles.arrow} aria-hidden>→</span>
      </div>
    </Link>
  );
}
