"use client";

import { BookingForm } from "@/components/booking/BookingForm";
import { useBooking } from "@/components/providers/BookingProvider";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function BookingDrawer() {
  const { open, closeBooking, prefill } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, closeBooking]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close booking"
            className="absolute inset-0 bg-ink/45"
            onClick={closeBooking}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            tabIndex={-1}
            ref={panelRef}
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-hidden bg-paper shadow-2xl outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 id="booking-title" className="font-display text-2xl italic tracking-tight">
                Book a session
              </h2>
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={closeBooking}>
                <X />
                <span className="sr-only">Close booking</span>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden px-6 py-6">
              <BookingForm prefill={prefill} onClose={closeBooking} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
