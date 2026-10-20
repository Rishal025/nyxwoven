import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — NyxWoven",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-32 sm:px-8">
      <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Legal</p>
      <h1 className="mt-4 font-display text-5xl italic">Privacy</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
        <p>
          This page is a placeholder. When the studio publishes its privacy policy, replace this copy with the official notice covering how booking requests, contact details, and reference images are stored and used.
        </p>
        <p>
          Booking requests submitted through this website currently remain in the browser session as a demonstration and are not sent to a live server.
        </p>
      </div>
    </article>
  );
}
