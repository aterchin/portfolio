"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { SearchItem, SearchItemType } from "@/lib/search";
import styles from "./Search.module.css";

const TYPE_LABELS: Record<SearchItemType, string> = {
  snippet: "Snippet",
  experiment: "Experiment",
  work: "Work",
};

const FILTERS: { value: SearchItemType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "snippet", label: "Snippets" },
  { value: "experiment", label: "Experiments" },
  { value: "work", label: "Work" },
];

interface SearchProps {
  items: SearchItem[];
}

export function Search({ items }: SearchProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchItemType | "all">("all");

  // Frontmatter-only index (title, tags, summary) — full-text into MDX bodies
  // is a stretch goal, not built yet. Rebuilt only when `items` changes, which
  // is never during a session since it's passed once from the server.
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 2 },
          { name: "tags", weight: 1.5 },
          { name: "summary", weight: 1 },
        ],
        threshold: 0.34,
        ignoreLocation: true,
      }),
    [items]
  );

  const trimmedQuery = query.trim();

  const results = useMemo(() => {
    const matched = trimmedQuery ? fuse.search(trimmedQuery).map((r) => r.item) : items;
    return filter === "all" ? matched : matched.filter((item) => item.type === filter);
  }, [trimmedQuery, filter, fuse, items]);

  const emptyMessage = trimmedQuery
    ? `Nothing matches "${trimmedQuery}". Try a different term.`
    : filter === "all"
      ? "Nothing here yet."
      : `No ${FILTERS.find((f) => f.value === filter)?.label.toLowerCase()} yet.`;

  return (
    <section className={styles.search}>
      <div className={styles.controls}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search snippets, experiments, and work…"
          className={styles.input}
          aria-label="Search site content"
        />
        <div className={styles.filters} role="group" aria-label="Filter by content type">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`${styles.filterBtn} ${
                filter === f.value ? styles.filterBtnActive : ""
              }`}
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <ul className={styles.results}>
          {results.map((item) => (
            <li key={`${item.type}-${item.slug}`} className={styles.resultItem}>
              <Link href={item.href} className={styles.result}>
                <div className={styles.resultMeta}>
                  <span className={styles.type}>{TYPE_LABELS[item.type]}</span>
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.summary}>{item.summary}</p>
                {item.tags.length > 0 && (
                  <p className={styles.tags}>{item.tags.join(" · ")}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
