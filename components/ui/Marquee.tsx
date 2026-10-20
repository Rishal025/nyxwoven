export function Marquee({ phrases }: { phrases: string[] }) {
  const line = phrases.join("  /  ");

  return (
    <div className="marquee border-y border-ink bg-ink py-5 text-paper sm:py-7" aria-hidden="true">
      <div className="marquee-track">
        <span>{line}  /  </span>
        <span>{line}  /  </span>
      </div>
      <div className="marquee-track marquee-track-reverse mt-2">
        <span>{line}  /  </span>
        <span>{line}  /  </span>
      </div>
    </div>
  );
}
