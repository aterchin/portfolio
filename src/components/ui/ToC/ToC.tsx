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

/** True when at least one h2 exists — orphan h3s alone do not count. */
export function hasTocHeadings(headings: HeadingData[]): boolean {
  return headings.some((heading) => heading.level === 2);
}

export function ToC({ headings }: ToCProps) {
  const items = nestHeadings(headings);

  // nestHeadings drops orphan h3s; without an h2 there is nothing to show
  if (items.length === 0) return null;

  return (
    <div className="sticky-rail">
      <h2 className="side-label">Table of Contents</h2>
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
