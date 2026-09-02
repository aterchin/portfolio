import styles from "./SectionLabel.module.css";

interface SectionLabelProps {
  children: React.ReactNode;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className={styles.label}>
      <span>{children}</span>
    </div>
  );
}
