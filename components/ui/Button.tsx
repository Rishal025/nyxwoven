"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "ghost" | "line";

export function Button({
  className,
  variant = "solid",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-none px-5 py-3 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50",
        variant === "solid" && "bg-ink text-paper hover:bg-ink-soft",
        variant === "ghost" && "border border-ink/15 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        variant === "line" && "border-b border-ink/30 px-0 py-1 text-ink hover:border-ink",
        className,
      )}
      {...props}
    />
  );
}
