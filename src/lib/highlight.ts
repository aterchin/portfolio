import hljs from "highlight.js/lib/core";
import apache from "highlight.js/lib/languages/apache";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import php from "highlight.js/lib/languages/php";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("apache", apache);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("php", php);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

// MDX fence labels that differ from highlight.js language ids.
const LANG_ALIASES: Record<string, string> = {
  apacheconf: "apache",
  sh: "bash",
  shell: "bash",
  js: "javascript",
  ts: "typescript",
  html: "xml",
  markup: "xml",
  plaintext: "plaintext",
  text: "plaintext",
};

const SUPPORTED_LANGS = new Set([
  "php",
  "bash",
  "apache",
  "typescript",
  "javascript",
  "css",
  "xml",
  "json",
]);

function escapeHtml(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function resolveLang(lang: string): string {
  return LANG_ALIASES[lang] ?? lang;
}

export function highlightCode(code: string, lang: string): string {
  const resolved = resolveLang(lang);

  if (resolved === "plaintext" || !SUPPORTED_LANGS.has(resolved)) {
    return escapeHtml(code);
  }

  if (!hljs.getLanguage(resolved)) {
    return escapeHtml(code);
  }

  return hljs.highlight(code, { language: resolved, ignoreIllegals: true }).value;
}
