import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>Why am I here?</h1>
      <p className={styles.body}>
        Fifteen years across LAMP stacks, WordPress, React, Drupal, Linux servers and I needed a place to organize it.
      </p>
      <p className={styles.body}><span className="text-nowrap"><strong>This is my notebook.</strong></span></p>
      <div className={styles.ctaRow}>
        <Link href="/work" className={styles.btnPrimary}>View work</Link>
        <Link href="/contact" className={styles.btnGhost}>Get in touch</Link>
      </div>
    </section>
  );
}
