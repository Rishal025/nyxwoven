"use client";

import { useBooking } from "@/components/providers/BookingProvider";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function FinalCta() {
  const { openBooking } = useBooking();

  return (
    <section className="relative isolate min-h-[32rem] overflow-hidden border-t border-line sm:min-h-[40rem]">
      <div className="view-parallax absolute -top-[22%] h-[144%] w-full">
        <Image
          src="/images/cta-ink-detail.jpg"
          alt="Close detail of ornamental black ink on skin"
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/88 to-paper/25" />
      <div className="relative mx-auto flex min-h-[32rem] max-w-6xl items-end px-5 py-20 sm:min-h-[40rem] sm:px-8 lg:py-24">
        <div className="view-reveal max-w-2xl">
          <p className="text-[11px] tracking-[0.32em] text-muted uppercase">The next line</p>
          <h2 className="mt-4 font-display text-[clamp(3rem,10vw,7.2rem)] leading-[0.86] tracking-tight">
            Ready to
            <span className="block italic">make it yours?</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted">
            Send a sitting request. We review every idea by hand — this is a conversation, not an instant confirmation.
          </p>
          <Button type="button" className="mt-8" onClick={() => openBooking()}>
            Book a session
          </Button>
        </div>
      </div>
    </section>
  );
}
