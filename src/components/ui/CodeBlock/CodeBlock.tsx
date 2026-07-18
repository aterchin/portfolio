import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  return (
    <div className={styles.wrapper}>
      {lang && lang !== "plaintext" && (
        <div className={styles.label}>{lang}</div>
      )}
      <pre className={styles.pre}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
