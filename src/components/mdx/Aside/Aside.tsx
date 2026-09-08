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

const variantAriaLabels: Record<AsideVariant, string> = {
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

  return (
    <aside
      className={`${styles.aside} ${styles[variant]}`}
      role="note"
      aria-label={title ?? variantAriaLabels[variant]}
    >
      <span className={styles.badge} aria-hidden="true">
        <Icon size={16} strokeWidth={1.5} className={styles.icon} />
      </span>
      <div className={styles.content}>
        {title ? <span className={styles.label}>{title}</span> : null}
        <div className={styles.body}>{children}</div>
      </div>
    </aside>
  );
}
