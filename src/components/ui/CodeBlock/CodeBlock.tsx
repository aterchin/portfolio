import { highlightCode } from "@/lib/highlight";
import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
  code: string;
  lang?: string;
  // Opt-in: fence meta `wide` (```bash wide) overflows the prose column
  // over the ToC track. Layout sets --code-wide-extra; sticky ToC is unchanged.
  wide?: boolean;
}

export function CodeBlock({ code, lang, wide = false }: CodeBlockProps) {
  const trimmed = code.trim();
  const language = lang ?? "plaintext";
  const highlighted = highlightCode(trimmed, language);

  return (
    <div className={`${styles.wrapper}${wide ? " code-wide" : ""}`}>
      <pre className={`${styles.pre} language-${language}`}>
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
