import Image from "next/image";
import styles from "./Spyder.module.css";

export function Spyder() {
  return (
    <div className={styles.lane} aria-hidden="true">
      <span className={styles.spyder}>
        <Image
          src="/images/spyder.png"
          alt="1961 Ferrari 250 GT California Spyder"
          width={800}
          height={800}
        />
      </span>
    </div>
  );
}
