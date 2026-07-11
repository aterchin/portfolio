import styles from "./PageWrapper.module.css";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return <main className={styles.wrapper}>{children}</main>;
}
