export interface HeadingData {
  title: string;
  level: number;
}

export function extractMdxHeadings(mdxContent: string): HeadingData[] {
  const headings: HeadingData[] = [];

  // match the `#` syntax for headings
  const headingMatcher = /^(#+)\s(.+)$/gm;

  let match = headingMatcher.exec(mdxContent);
  while (match !==null) {
    const level = match[1].length
    const title = match[2].trim();

    if (level === 2 || level === 3) {
      // record this heading
      headings.push({title, level});
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