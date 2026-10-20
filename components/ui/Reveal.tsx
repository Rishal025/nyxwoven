"use client";

import { cn } from "@/lib/cn";
import { useSeen } from "@/lib/useSeen";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>();

  return (
    <div ref={ref} className={cn("view-reveal", seen && "is-seen", className)}>
      {children}
    </div>
  );
}
