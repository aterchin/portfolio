import styles from "./RollingSkate.module.css";

export function RollingSkate() {
  return (
    <div className={styles.lane} aria-hidden="true">
      <img
        className={styles.skate}
        src="/images/not-found/rollerskate.png"
        alt=""
        width={800}
        height={800}
      />
    </div>
  );
}
