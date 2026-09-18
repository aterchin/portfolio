import Image from "next/image";
import styles from "./RollingSkate.module.css";

export function RollingSkate() {
  return (
    <div className={styles.lane} aria-hidden="true">
      <Image
        className={styles.skate}
        src="/images/rollerskate.png"
        alt=""
        width={800}
        height={800}
      />
    </div>
  );
}
