import { Button } from "@/components/ui/Button/Button";
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
        <Button variant="primary">View work</Button>
        <Button variant="ghost">Get in touch</Button>
      </div>
    </section>
  );
}
