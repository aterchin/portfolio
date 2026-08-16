import type { ReactNode } from "react";
import { headingToId } from "@/lib/headings";

/**
 * MDX override for ## / ### — registered as h2/h3 in getMDXComponents().
 * Adds a stable id so the ToC (and in-page anchors) can link here.
 *
 * Stays a Server Component: no "use client". compileMDX runs this on the
 * server; the browser just receives normal <h2 id="…"> HTML.
 */
export interface MdxHeadingProps {
  // String literal union — only real heading tags, so <Tag> is type-safe
  // (a plain `string` would let you pass "div" and break semantics).
  as: "h2" | "h3";
  // ReactNode, not string: MDX may pass plain text, arrays, or nested nodes
  // (e.g. emphasis). headingToId flattens via reactNodeToText.
  children?: ReactNode;
  className?: string;
  // Accepted so we can strip it — we always prefer headingToId(children)
  // over whatever id MDX might pass, so ToC hrefs stay in sync.
  id?: string;
}

export function MdxHeading({
  // Rename while destructuring: `as` is reserved-ish in JSX; you can't
  // write <as>. Tag becomes the intrinsic element (<h2> or <h3>).
  as: Tag,
  children,
  className,
  // Pull id out so it is NOT in ...rest (otherwise {...rest} could
  // override id={headingId} below).
  id,
  ...rest
}: MdxHeadingProps) {
  void id; // intentionally unused — see props comment above

  const headingId = headingToId(children);

  return (
    <Tag id={headingId} className={className} {...rest}>
      {children}
    </Tag>
  );
}
