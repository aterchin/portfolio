import type { ComponentPropsWithoutRef } from "react";

function isExternalHref(href: string | undefined): href is string {
  if (!href) return false;
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

/**
 * MDX override for markdown links — registered as `a` in getMDXComponents().
 * External http(s) links open in a new tab with rel="noopener noreferrer"
 * and an `external` class for the prose ↗ icon (utils.css).
 */
export function MdxLink({
  href,
  children,
  className,
  target,
  rel,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  const isExternal = isExternalHref(href);
  const classes = [className, isExternal ? "external" : undefined]
    .filter(Boolean)
    .join(" ");

  if (isExternal) {
    return (
      <a
        href={href}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        className={classes || undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={className} target={target} rel={rel} {...rest}>
      {children}
    </a>
  );
}
