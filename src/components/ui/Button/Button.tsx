import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.ghost;
  return (
    <button className={cn(variantClass, className)} {...rest}>
      {children}
    </button>
  );
}
