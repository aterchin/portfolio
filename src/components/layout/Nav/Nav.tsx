"use client";

import Link from "next/link";
import { useTheme } from "@/providers/ThemeProvider";
import styles from "./Nav.module.css";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/snippets", label: "Snippets" },
  { href: "/experiments", label: "Experiments" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.wordmark}>
        reallyslowwebsites<span>.com</span>
      </Link>
      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? "light" : "dark"}
      </button>
    </nav>
  );
}
