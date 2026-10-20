import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium tracking-[0.32em] uppercase text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
