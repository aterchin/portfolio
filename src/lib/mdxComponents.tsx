import type { ReactElement, ReactNode } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock/CodeBlock";
import { Aside } from "@/components/mdx/Aside/Aside";
import { Figure } from "@/components/mdx/Figure/Figure";
import { MdxHeading } from "@/components/mdx/MdxHeading/MdxHeading";
import { remarkFencedCodeMeta } from "@/lib/remarkFencedCodeMeta";
import type { MDXComponents } from "mdx/types";

type CodeChildProps = {
  className?: string;
  children?: string;
  "data-wide"?: unknown;
};

type PreOverrideProps = {
  children?: ReactNode;
  "data-wide"?: unknown;
};

function isWideFlag(value: unknown): boolean {
  return value === true || value === "" || value === "true";
}

// Shared compileMDX options so every MDX page gets the same remark pipeline.
export const mdxRemoteOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkFencedCodeMeta],
  },
};

// Custom components passed to compileMDX to override default MDX element rendering.
// Add more overrides here as new components are built (e.g. custom blockquote, callout).
export function getMDXComponents(): MDXComponents {
  return {
    // MDX renders fenced code blocks as <pre><code className="language-php">...</code></pre>
    // We intercept at the <pre> level, extract the language from the child <code> className,
    // and pass both to CodeBlock for highlight.js rendering.
    pre: ({ children, ...props }: PreOverrideProps) => {
      const child = children as ReactElement<CodeChildProps>;

      const className = child?.props?.className ?? "";
      const lang = className.replace("language-", "") || "plaintext";
      const code = child?.props?.children ?? "";
      const wide =
        isWideFlag(props["data-wide"]) || isWideFlag(child?.props?.["data-wide"]);

      return <CodeBlock code={String(code)} lang={lang} wide={wide} />;
    },
    h2: (props) => <MdxHeading as="h2" {...props} />,
    h3: (props) => <MdxHeading as="h3" {...props} />,
    Aside,
    Figure,
  };
}
