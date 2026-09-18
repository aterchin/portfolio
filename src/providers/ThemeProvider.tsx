"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "portfolio-theme";
const TRANSITION_CLASS = "theme-transition";

function getThemeFromDom(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Parse a CSS time token like "200ms" or "0.2s" into milliseconds. */
function cssTimeToMs(value: string): number {
  const trimmed = value.trim();
  if (trimmed.endsWith("ms")) return parseFloat(trimmed) || 0;
  if (trimmed.endsWith("s")) return (parseFloat(trimmed) || 0) * 1000;
  return parseFloat(trimmed) || 0;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // ThemeScript sets data-theme before paint. useSyncExternalStore reads that
  // DOM attribute as the source of truth — no setState-in-effect sync needed.
  const theme = useSyncExternalStore(subscribe, getThemeFromDom, () => "dark" as Theme);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion) {
      root.classList.add(TRANSITION_CLASS);
    }

    root.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);

    if (!reduceMotion) {
      const duration =
        cssTimeToMs(getComputedStyle(root).getPropertyValue("--duration-base")) || 200;
      window.setTimeout(() => {
        root.classList.remove(TRANSITION_CLASS);
      }, duration);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
