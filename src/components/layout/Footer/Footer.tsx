import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} — built with Next.js, hosted on a server I manage myself.</span>
      <Link href="/contact" className={styles.contactLink}>
        Contact
      </Link>
    </footer>
  );
}
