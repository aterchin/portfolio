import styles from "./Tag.module.css";

type TagAccent = "terracotta" | "seafoam" | "yellow" | "periwinkle";

interface TagProps {
  children: React.ReactNode;
  accent?: TagAccent;
}

export function Tag({ children, accent = "terracotta" }: TagProps) {
  return <span className={`${styles.tag} ${styles[accent]}`}>{children}</span>;
}
