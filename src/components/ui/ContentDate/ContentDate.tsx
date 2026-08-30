import { formatLongDate, formatLongDateOrdinal, isAfter } from "@/lib/dates";
import styles from "./ContentDate.module.css";

interface ContentDateProps {
  date: string;
  updated?: string;
  inProgress?: boolean;
}

export function ContentDate({ date, updated, inProgress }: ContentDateProps) {
  const showUpdated = updated !== undefined && isAfter(updated, date);

  return (
    <p className={styles.dates}>
      <time dateTime={date}>{formatLongDate(date)}</time>
      {showUpdated && updated && (
        <>
          {" "}
          <em>
            Last updated{" "}
          </em>
          <time dateTime={updated}>{formatLongDateOrdinal(updated)}</time>
        </>
      )}
      {inProgress && <em> - Work In Progress</em>}
    </p>
  );
}
