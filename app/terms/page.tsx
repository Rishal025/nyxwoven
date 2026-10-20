import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — NyxWoven",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-32 sm:px-8">
      <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Legal</p>
      <h1 className="mt-4 font-display text-5xl italic">Terms</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-muted">
        <p>
          This page is a placeholder for the studio’s terms of service. It does not create a contract. Replace it with reviewed legal language before launch.
        </p>
        <p>
          Submitting a sitting request does not confirm an appointment, deposit, or design agreement.
        </p>
      </div>
    </article>
  );
}
