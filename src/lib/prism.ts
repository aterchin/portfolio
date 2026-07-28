import Prism from "prismjs";

// Register grammars once at module load. Order matters — each language
// imports only its dependencies (e.g. php → markup-templating → markup).
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-php";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-apacheconf";
import "prismjs/components/prism-json";

// MDX fence labels that differ from Prism's internal language ids.
const LANG_ALIASES: Record<string, string> = {
  apache: "apacheconf",
  sh: "bash",
  shell: "bash",
  js: "javascript",
  ts: "typescript",
  html: "markup",
  plaintext: "plaintext",
  text: "plaintext",
};

const SUPPORTED_LANGS = new Set([
  "php",
  "bash",
  "apacheconf",
  "typescript",
  "javascript",
  "css",
  "markup",
  "json",
]);

// @types/prismjs omits util — present at runtime in prism-core
function encodeHtml(code: string): string {
  const { encode } = (Prism as unknown as {
    util: { encode: (tokens: string) => string };
  }).util;

  return encode(code);
}

function resolveLang(lang: string): string {
  return LANG_ALIASES[lang] ?? lang;
}

export function highlightCode(code: string, lang: string): string {
  const resolved = resolveLang(lang);

  if (resolved === "plaintext" || !SUPPORTED_LANGS.has(resolved)) {
    return encodeHtml(code);
  }

  const grammar = Prism.languages[resolved];

  if (!grammar) {
    return encodeHtml(code);
  }

  return Prism.highlight(code, grammar, resolved);
}
