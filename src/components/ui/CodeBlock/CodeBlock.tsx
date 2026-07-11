import { codeToHtml } from "shiki";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export async function CodeBlock({ code, lang = "plaintext" }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "github-dark",
  });

  return (
    <div className={styles.wrapper}>
      {lang !== "plaintext" && (
        <div className={styles.label}>{lang}</div>
      )}
      {/* Shiki returns a fully formed <pre><code>...</code></pre> with inline styles */}
      <div
        className={styles.code}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
