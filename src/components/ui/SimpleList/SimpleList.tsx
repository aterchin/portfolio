import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./SimpleList.module.css";


const chevronProps = {
  strokeWidth: 1,
} as const;

interface BaseListItemProps extends React.PropsWithChildren {
  className?: string;
}

// title is not required since href is not passed
interface TextListItemProps extends BaseListItemProps {
  href?: never;
  title?: string; 
}

// href is passed, thus title is required
interface LinkListItemProps extends BaseListItemProps {
  href: string; 
  title: string;
}

// combine them into a union type
export type SimpleListItemProps = TextListItemProps | LinkListItemProps;

export interface SimpleListProps {
  items: SimpleListItemProps[];
  className?: string;
}

const SimpleListItem = ({ href, title, className, children }: SimpleListItemProps) => {
  if (href) {
    return (
      <li className={cn(styles["list-item"], className)}>
        <Link href={href}>
          <span className={styles["list-arrow"]} aria-hidden>
            <ChevronRight {...chevronProps} />
          </span>
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li className={cn(styles["list-item"], className)}>
      {title && <span>{title}</span>}
      {children}
    </li>
  );
}

export function SimpleList({ items, className }: SimpleListProps) {
  return (
    <ul className={cn(styles["list-simple"], className)}>
      {items.map((item, index) => (
        <SimpleListItem key={index} {...item} />
      ))}
    </ul>
  );
}
