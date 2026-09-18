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
import { Search as SearchLucide, Trash, TrashOff, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { ContentList } from "@/components/ui/ContentList/ContentList";
import type { SearchItem, SearchItemType } from "@/lib/search";
import styles from "./Search.module.css";

const TYPE_LABELS: Record<SearchItemType, string> = {
  note: "Note",
  work: "Work",
};

const CLEAR_FEEDBACK_MS = 600;
/* Keep in sync with --duration-slow on the overlay exit transition */
const OVERLAY_EXIT_MS = 350;

const iconProps = {
  size: 20,
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

export interface SearchProps {
  items: SearchItem[];
  exampleTags: string[];
  menuOpen?: boolean;
  onActivate?: () => void;
}

export function Search({ items, exampleTags, menuOpen = false, onActivate }: SearchProps) {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(exampleTags[0] ?? "CSS");
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);
  const [justCleared, setJustCleared] = useState(false);
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const clearTimeoutRef = useRef<number | null>(null);
  const scrollUnlockTimeoutRef = useRef<number | null>(null);
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
          { name: "subtitle", weight: 1.25 },
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
    setJustCleared(false);
    if (clearTimeoutRef.current !== null) {
      window.clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = null;
    }
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
    if (isOpen) {
      if (scrollUnlockTimeoutRef.current !== null) {
        window.clearTimeout(scrollUnlockTimeoutRef.current);
        scrollUnlockTimeoutRef.current = null;
      }
      const previousBody = document.body.style.overflow;
      const previousHtml = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        scrollUnlockTimeoutRef.current = window.setTimeout(() => {
          document.body.style.overflow = previousBody;
          document.documentElement.style.overflow = previousHtml;
          scrollUnlockTimeoutRef.current = null;
        }, OVERLAY_EXIT_MS);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current !== null) {
        window.clearTimeout(clearTimeoutRef.current);
      }
      if (scrollUnlockTimeoutRef.current !== null) {
        window.clearTimeout(scrollUnlockTimeoutRef.current);
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (justCleared) {
      setJustCleared(false);
      if (clearTimeoutRef.current !== null) {
        window.clearTimeout(clearTimeoutRef.current);
        clearTimeoutRef.current = null;
      }
    }
    setQuery(event.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    setJustCleared(true);
    if (clearTimeoutRef.current !== null) {
      window.clearTimeout(clearTimeoutRef.current);
    }
    clearTimeoutRef.current = window.setTimeout(() => {
      setJustCleared(false);
      inputRef.current?.focus();
    }, CLEAR_FEEDBACK_MS);
  };

  return (
    <div className={styles.search}>
      <button
        ref={triggerRef}
        type="button"
        className="icon-button"
        onClick={openPanel}
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label="Open search"
      >
        <SearchLucide {...iconProps} />
      </button>

      <button
        type="button"
        className={`backdrop ${styles.backdrop} ${isOpen ? "backdrop-open" : ""}`}
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
              className="icon-button"
              onClick={closePanel}
              aria-label="Close search"
            >
              <X {...iconProps} />
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
            {(query.length > 0 || justCleared) && (
              <button
                type="button"
                className={`icon-button ${styles.clear}`}
                onClick={clearQuery}
                aria-label="Clear search"
                disabled={justCleared}
              >
                {justCleared ? (
                  <TrashOff {...iconProps} />
                ) : (
                  <Trash {...iconProps} />
                )}
              </button>
            )}
          </div>
          {trimmedQuery ? (
            results.length === 0 ? (
              <p className={styles.empty}>
                Nothing matches “{trimmedQuery}”. Try a different term.
              </p>
            ) : (
              <ContentList
                className={styles.results}
                items={results.map((item) => ({
                  href: item.href,
                  title: item.title,
                  subtitle: item.subtitle,
                  summary: item.summary,
                  tags: item.tags,
                  typeLabel: TYPE_LABELS[item.type],
                  status: item.status,
                }))}
              />
            )
          ) : (
            <p className={styles.hint}>
              Search notes and work by title, tag, or summary.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
