"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { Search } from "@/components/layout/Search/Search";
import type { SearchItem } from "@/lib/search";
import { useTheme } from "@/providers/ThemeProvider";
import styles from "./Nav.module.css";

const links = [
  { href: "/work", label: "Work", tone: "accent" },
  { href: "/about", label: "About", tone: "seafoam" },
  { href: "/notes", label: "Notes", tone: "yellow" },
  { href: "/contact", label: "contact", tone: "periwinkle" },
] as const;

const iconProps = {
  size: 20,
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

export interface NavProps {
  searchItems: SearchItem[];
  exampleTags: string[];
}

export function Nav({ searchItems, exampleTags }: NavProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const menuId = useId();
  const [openedAtPath, setOpenedAtPath] = useState<string | null>(null);
  const isOpen = openedAtPath === pathname;

  const closeMenu = useCallback(() => setOpenedAtPath(null), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
      <Link href="/" className={`${styles.wordmark} typewriter`}>
        <span>reallyslowwebsites<span>.com</span></span>
      </Link>

      <div className={styles.navEnd}>
        <div
          id={menuId}
          className={`${styles.menuPanel} ${isOpen ? styles.menuPanelOpen : ""}`}
        >
          <ul className={styles.links}>
            {links.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <li
                  key={link.href}
                  className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                  data-tone={link.tone}
                >
                  <Link href={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.actions}>
          <Search
            items={searchItems}
            exampleTags={exampleTags}
            menuOpen={isOpen}
            onActivate={closeMenu}
          />
          <button
            type="button"
            className={`icon-button ${styles.menuButton}`}
            onClick={() => setOpenedAtPath(isOpen ? null : pathname)}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X {...iconProps} /> : <Menu {...iconProps} />}
          </button>
          <button
            type="button"
            className={`icon-button ${styles.themeToggle}`}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun {...iconProps} /> : <Moon {...iconProps} />}
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`backdrop ${styles.backdrop} ${isOpen ? "backdrop-open" : ""}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMenu}
      />
      </div>
      <div className="squiggle squiggle-bottom" aria-hidden="true" />
    </nav>
  );
}
