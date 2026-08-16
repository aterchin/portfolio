import type { ReactNode } from "react";
import { isValidElement } from "react";

export interface HeadingData {
  title: string;
  level: number;
  id: string;
}

export function extractMdxHeadings(mdxContent: string): HeadingData[] {
  const headings: HeadingData[] = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(mdxContent);
  while (match !== null) {
    const level = match[1].length;
    const title = match[2].trim();

    if (level === 2 || level === 3) {
      const id = headingToId(title);
      headings.push({ title, level, id });
    }

    // get next match
    // Note: the following statement must be
    //   *outside* the `if` statement above,
    //   otherwise an infinite loop will occur
    //   for headings of level greater than 3.
    //   Thanks to Alberto for pointing this out!
    //   https://github.com/bonnie/howd-mdx-toc/issues/7
    match = headingMatcher.exec(mdxContent);
  }

  return headings;
}

/**
 * Flatten a React node tree to plain text — same role as `react-to-text`
 * (not installed: it peers React 18; this project is on React 19).
 */
export function reactNodeToText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return reactNodeToText(node.props.children);
  }
  return "";
}

export function headingToId(heading: string | ReactNode): string {
  return reactNodeToText(heading)
    .toLowerCase()
    // Strip punctuation; \w keeps letters/digits/_ so remove _ separately
    // (Markdown italics use _word_ — without this, ids would keep underscores).
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "")
    .replace(/\s+/g, "-");
}
