"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SearchItem, SearchItemType } from "@/lib/search";
import styles from "./Search.module.css";

const TYPE_LABELS: Record<SearchItemType, string> = {
  snippet: "Snippet",
  experiment: "Experiment",
  work: "Work",
};

export interface SearchProps {
  items: SearchItem[];
  exampleTags: string[];
  menuOpen?: boolean;
  onActivate?: () => void;
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.5 12.5L16.5 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Search({ items, exampleTags, menuOpen = false, onActivate }: SearchProps) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(exampleTags[0] ?? "CSS");
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  if (menuOpen && openedAtPath !== null) {
    setOpenedAtPath(null);
  }

  const isOpen = openedAtPath === pathname;

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
    if (!trimmedQuery) return [];
    return fuse.search(trimmedQuery).map((r) => r.item);
  }, [trimmedQuery, fuse]);

  const closePanel = useCallback(() => {
    setOpenedAtPath(null);
    triggerRef.current?.focus();
  }, []);

  const openPanel = useCallback(() => {
    onActivate?.();
    if (exampleTags.length > 0) {
      setPlaceholder(
        exampleTags[Math.floor(Math.random() * exampleTags.length)] ?? "CSS"
      );
    }
    setOpenedAtPath(pathname);
  }, [onActivate, pathname, exampleTags]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanel();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.search}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={openPanel}
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label="Open search"
      >
        <SearchIcon />
      </button>

      <button
        type="button"
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={closePanel}
      />
      <div
        id={listId}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""} ${
          trimmedQuery ? styles.overlayFilled : ""
        }`}
        role="dialog"
        aria-label="Search"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className={styles.inner}>
          <div className={styles.toolbar}>
            <button
              type="button"
              className={styles.close}
              onClick={closePanel}
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </div>
          <div className={styles.field}>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleChange}
              placeholder={placeholder}
              className={styles.input}
              aria-label="Search site content"
              aria-autocomplete="list"
            />
            {query.length > 0 && (
              <button
                type="button"
                className={styles.clear}
                onClick={clearQuery}
              >
                Clear
              </button>
            )}
          </div>
          {trimmedQuery ? (
            results.length === 0 ? (
              <p className={styles.empty}>
                Nothing matches “{trimmedQuery}”. Try a different term.
              </p>
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
            )
          ) : (
            <p className={styles.hint}>
              Search snippets, experiments, and work by title, tag, or summary.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
