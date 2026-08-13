import { highlightCode } from "@/lib/highlight";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const trimmed = code.trim();
  const language = lang ?? "plaintext";
  const highlighted = highlightCode(trimmed, language);

  return (
    <div className={styles.wrapper}>
      <pre className={`${styles.pre} language-${language}`}>
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
