import styles from "./InProgressLabel.module.css";

/** Inline note status — mono " · WIP" after a title, no pill treatment. */
export function InProgressLabel() {
  return (
    <span className={styles.label} title="In progress">
      {" · WIP"}
    </span>
  );
}
