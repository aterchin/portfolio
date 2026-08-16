import type { HeadingData } from "@/lib/headings";

import styles from "./ToC.module.css";

export interface ToCProps {
  headings: HeadingData[];
}

/** Level-2 item with any following level-3 headings nested under it. */
interface TocItem extends HeadingData {
  children: HeadingData[];
}

function nestHeadings(headings: HeadingData[]): TocItem[] {
  const tree: TocItem[] = [];

  for (const heading of headings) {
    if (heading.level === 2) {
      tree.push({ ...heading, children: [] });
    } else if (heading.level === 3 && tree.length > 0) {
      // Attach to the most recent h2
      tree[tree.length - 1].children.push(heading);
    }
    // Orphan h3s (before any h2) are skipped — same filter idea as extract
  }

  return tree;
}

export function ToC({ headings }: ToCProps) {
  const items = nestHeadings(headings);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Contents</h2>
      <nav className={styles.nav}>
        <ul className={styles.toc}>
          {items.map(({ id, title, level, children }) => (
            <li key={id}>
              <a href={`#${id}`} className={styles[`heading${level}`]}>
                {title}
              </a>
              {children.length > 0 && (
                <ul>
                  {children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className={styles[`heading${child.level}`]}
                      >
                        {child.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
