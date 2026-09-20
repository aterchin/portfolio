/** Join class names, skipping falsy values (undefined, null, false, ""). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
