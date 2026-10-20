import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 58"
      aria-hidden="true"
      className={cn("text-ink", className)}
    >
      <path
        d="M10 8c0 18 10 34 34 34S78 26 78 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M22 8c0 14 8 26 22 26s22-12 22-26"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M36 50c5-9 16-14 28-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("flex flex-col items-center text-ink", className)}>
      <Mark className={cn("h-10 w-14", markClassName)} />
      <span className="font-display text-[clamp(2rem,5vw,3.4rem)] italic leading-none tracking-tight">
        NyxWoven
      </span>
    </span>
  );
}
