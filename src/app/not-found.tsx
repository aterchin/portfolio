import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper/PageWrapper";
import { RollingSkate } from "@/components/not-found/RollingSkate";
import { SectionLabel } from "@/components/ui/SectionLabel/SectionLabel";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <PageWrapper>
      <SectionLabel>404</SectionLabel>
      <div className={styles.content}>
        <blockquote className={styles.quote}>
          <p>
            Life moves pretty fast. If you don&apos;t stop and look around
            once in a while, you could miss it.
          </p>
        </blockquote>
        <p className={styles.message}>Page not found or it has moved.</p>
        <Link href="/" className={styles.homeLink}>
          Go home. Go.
        </Link>
      </div>
      <RollingSkate />
    </PageWrapper>
  );
}
