/**
 * Copies fenced-code meta (the text after the language, e.g. ```bash wide)
 * onto the <pre> as data attributes so MDX component overrides can read them.
 *
 * mdast `code` nodes already have `.meta`; without this, that string is dropped
 * when remark-rehype builds the <pre><code> tree.
 */

type HastProperties = Record<string, unknown>;

type MdasNode = {
  type: string;
  meta?: string | null;
  data?: {
    hProperties?: HastProperties;
  };
  children?: MdasNode[];
};

function applyMeta(node: MdasNode) {
  if (node.type === "code" && node.meta) {
    const tokens = node.meta.split(/\s+/).filter(Boolean);
    if (tokens.includes("wide")) {
      node.data ??= {};
      node.data.hProperties = {
        ...node.data.hProperties,
        dataWide: true,
      };
    }
  }

  node.children?.forEach(applyMeta);
}

export function remarkFencedCodeMeta() {
  return (tree: MdasNode) => {
    applyMeta(tree);
  };
}
