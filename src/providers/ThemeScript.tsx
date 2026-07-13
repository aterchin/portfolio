// Runs synchronously in <head>, before React hydrates, to set the correct
// data-theme attribute before first paint. This avoids a flash of the wrong
// theme on load. Checks localStorage first (manual override), falls back
// to system preference (prefers-color-scheme).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem('portfolio-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    // localStorage unavailable — fall back to system preference only
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
