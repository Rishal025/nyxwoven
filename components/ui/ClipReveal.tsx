"use client";

import { cn } from "@/lib/cn";
import { useSeen } from "@/lib/useSeen";
import type { ReactNode } from "react";

export function ClipReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>();

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className={cn("view-unmask h-full", seen && "is-seen")}>
        {children}
      </div>
    </div>
  );
}
