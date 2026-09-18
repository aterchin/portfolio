// Runs synchronously in <head>, before React hydrates, to set the correct
// data-theme attribute before first paint. This avoids a flash of the wrong
// theme on load. Checks localStorage first (manual override), otherwise
// defaults to dark.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = window.localStorage.getItem('portfolio-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
