import { CodeBlock } from "@/components/ui/CodeBlock/CodeBlock";
import { Aside } from "@/components/mdx/Aside/Aside";
import { Figure } from "@/components/mdx/Figure/Figure";
import type { MDXComponents } from "mdx/types";

// Custom components passed to compileMDX to override default MDX element rendering.
// Add more overrides here as new components are built (e.g. custom blockquote, callout).
export function getMDXComponents(): MDXComponents {
  return {
    // MDX renders fenced code blocks as <pre><code className="language-php">...</code></pre>
    // We intercept at the <pre> level, extract the language from the child <code> className,
    // and pass both to CodeBlock for Prism rendering.
    pre: ({ children, ...props }) => {
      const child = children as React.ReactElement<{
        className?: string;
        children?: string;
      }>;

      const className = child?.props?.className ?? "";
      const lang = className.replace("language-", "") || "plaintext";
      const code = child?.props?.children ?? "";

      return <CodeBlock code={String(code)} lang={lang} />;
    },
    Aside,
    Figure,
  };
}
