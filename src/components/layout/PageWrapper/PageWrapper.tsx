import { cn } from "@/lib/cn";
import styles from "./PageWrapper.module.css";

export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn(styles.wrapper, className)}>{children}</main>;
}
