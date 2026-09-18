import Link from "next/link";
import { ArrowRight } from "@/components/ui/ArrowRight/ArrowRight";
import styles from "./Hero.module.css";

const arrowProps = {
  strokeWidth: 1,
} as const;

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.heading}>Hey, I&apos;m Adam.</h1>
        <p className={styles.body}>
          Fifteen years across LAMP stacks and I needed a place to organize it.
        </p>
        <p className={styles.body}>
          <span className="text-nowrap"><strong>This is my notebook.</strong></span>
        </p>
      </div>
      <nav className={styles.links} aria-label="Hero">
        <Link href="/work" className="text-cta">
          View work
          <span className="text-cta-arrow" aria-hidden>
            <ArrowRight {...arrowProps} />
          </span>
        </Link>
        <Link href="/contact" className="text-cta">
          Get in touch
          <span className="text-cta-arrow" aria-hidden>
            <ArrowRight {...arrowProps} />
          </span>
        </Link>
      </nav>
    </section>
  );
}
