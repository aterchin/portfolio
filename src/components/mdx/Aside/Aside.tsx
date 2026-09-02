import styles from "./Aside.module.css";

// Union type restricts variant to exactly these four strings —
// MDX will typecheck if you pass an invalid value in a .tsx file,
// but in .mdx files it's just a string at authoring time.
export type AsideVariant = "info" | "success" | "warning" | "error";

interface AsideProps {
  variant?: AsideVariant;
  title?: string;
  children: React.ReactNode;
}

const defaultLabels: Record<AsideVariant, string> = {
  info: "",
  success: "",
  warning: "",
  error: "",
};

export function Aside({
  variant = "info",
  title,
  children,
}: AsideProps) {
  const label = title ?? defaultLabels[variant];

  return (
    <aside
      className={`${styles.aside} ${styles[variant]}`}
      role="note"
      aria-label={label || undefined}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}