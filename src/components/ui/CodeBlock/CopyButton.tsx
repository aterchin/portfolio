"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./CopyButton.module.css";

export interface CopyButtonProps {
  code: string;
  // Parent layout hook (CodeBlock positions / hover-reveals this button).
  className?: string;
}

const iconProps = {
  size: 16,
  strokeWidth: 1.5,
  "aria-hidden": true,
} as const;

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
      {copied ? <Check {...iconProps} /> : <Copy {...iconProps} />}
    </button>
  );
}
