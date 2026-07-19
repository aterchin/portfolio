import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Full-stack developer — available for hire</p>
      <h1 className={styles.heading}>Builds things that actually work.</h1>
      <p className={styles.body}>
        Fifteen years across LAMP stacks, Drupal, WordPress, Linux servers, and now
        Next.js. I work well with teams who know what they want and clients who
        don&apos;t quite know yet.
      </p>
      <div className={styles.ctaRow}>
        <Link href="/work" className={styles.btnPrimary}>View work</Link>
        <Link href="/contact" className={styles.btnGhost}>Get in touch</Link>
      </div>
    </section>
  );
}
