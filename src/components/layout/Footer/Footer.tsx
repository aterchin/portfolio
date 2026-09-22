import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="squiggle squiggle-top" aria-hidden="true" />
      <span>© {new Date().getFullYear()} — built with Next.js, hosted on my little Linode server.</span>
    </footer>
  );
}
