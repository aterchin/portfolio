"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyButton.module.css";

export interface CopyButtonProps {
  code: string;
  // Parent layout hook (CodeBlock positions / hover-reveals this button).
  className?: string;
}

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="5.5"
        y="5.5"
        width="8"
        height="9"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 5.5V4.25A1.25 1.25 0 009.25 3H3.75A1.25 1.25 0 002.5 4.25v8A1.25 1.25 0 003.75 13.5H5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${className ?? ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
}
