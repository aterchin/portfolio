import type { ReactElement, ReactNode } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock/CodeBlock";
import { Aside } from "@/components/mdx/Aside/Aside";
import { Figure } from "@/components/mdx/Figure/Figure";
import { MdxHeading } from "@/components/mdx/MdxHeading/MdxHeading";
import { MdxLink } from "@/components/mdx/MdxLink/MdxLink";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import type { MDXComponents } from "mdx/types";

type CodeChildProps = {
  className?: string;
  children?: string;
};

type PreOverrideProps = {
  children?: ReactNode;
  wide?: boolean;
};

// Shared compileMDX options so every MDX page gets the same plugin pipeline.
export const mdxRemoteOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    // rehype (not remark): this package runs after markdown becomes HTML-ish nodes
    rehypePlugins: [rehypeMdxCodeProps],
  },
};

// Custom components passed to compileMDX to override default MDX element rendering.
// Add more overrides here as new components are built (e.g. custom blockquote, callout).
export function getMDXComponents(): MDXComponents {
  return {
    // MDX renders fenced code blocks as <pre><code className="language-php">...</code></pre>
    // We intercept at the <pre> level, extract the language from the child <code> className,
    // and pass both to CodeBlock for highlight.js rendering.
    // Fence meta like `wide` is turned into props by rehype-mdx-code-props.
    pre: ({ children, wide }: PreOverrideProps) => {
      const child = children as ReactElement<CodeChildProps>;

      const className = child?.props?.className ?? "";
      const lang = className.replace("language-", "") || "plaintext";
      const code = child?.props?.children ?? "";

      return <CodeBlock code={String(code)} lang={lang} wide={Boolean(wide)} />;
    },
    a: (props) => <MdxLink {...props} />,
    h2: (props) => <MdxHeading as="h2" {...props} />,
    h3: (props) => <MdxHeading as="h3" {...props} />,
    Aside,
    Figure,
  };
}
