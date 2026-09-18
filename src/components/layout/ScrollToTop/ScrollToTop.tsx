"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Next.js keeps the previous scroll position when the new page's top
 * is still in the viewport (common with a sticky nav). Force document
 * top on real route changes so each page starts at scrollY = 0.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }

    // "instant" overrides CSS scroll-behavior: smooth on :root
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
