import { highlightCode } from "@/lib/prism";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const trimmed = code.trim();
  const highlighted = highlightCode(trimmed, lang ?? "plaintext");

  return (
    <div className={styles.wrapper}>
      {lang && lang !== "plaintext" && (
        <div className={styles.label}>{lang}</div>
      )}
      <pre className={styles.pre}>
        <code
          className={lang ? `language-${lang}` : undefined}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
