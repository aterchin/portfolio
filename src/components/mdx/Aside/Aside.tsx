import {
  CircleAlert,
  CircleCheck,
  Info,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
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

const variantIcons: Record<AsideVariant, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

const variantTitles: Record<AsideVariant, string> = {
  info: "Info",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

export function Aside({
  variant = "info",
  title,
  children,
}: AsideProps) {
  const Icon = variantIcons[variant];
  const resolvedTitle = title ?? variantTitles[variant];

  return (
    <aside
      className={`${styles.aside} ${styles[variant]}`}
      role="note"
      aria-label={resolvedTitle}
    >
      <div className={styles.content}>
        <span className={styles.badge} aria-hidden="true">
          <Icon size={32} strokeWidth={1.5} className={styles.icon} />
        </span>
        <span className={styles.label}>{resolvedTitle}</span>
        <div className={styles.body}>{children}</div>
      </div>
    </aside>
  );
}
