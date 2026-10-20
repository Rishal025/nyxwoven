"use client";

import { navItems } from "@/data/nav";
import { cn } from "@/lib/cn";
import { useBooking } from "@/components/providers/BookingProvider";
import { Mark } from "@/components/ui/Wordmark";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || menuOpen ? "border-b border-line bg-paper/92 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="#top" className="flex min-w-0 items-center gap-3 text-ink" onClick={() => setMenuOpen(false)}>
          <Mark className="h-7 w-10 shrink-0" />
          <span className="font-display text-xl italic tracking-tight sm:text-2xl">NyxWoven</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-[11px] tracking-[0.22em] uppercase text-ink/70 hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => openBooking()}
            className="bg-ink px-3 py-2.5 text-[10px] font-medium tracking-[0.24em] text-paper uppercase transition-colors hover:bg-ink-soft sm:px-5"
          >
            Book now
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      <motion.div className="h-[2px] origin-left bg-ink" style={{ scaleX: scrollYProgress }} />

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            className="border-t border-line bg-paper xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex min-h-[calc(100dvh-4.25rem)] flex-col gap-1 px-6 py-10" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl italic tracking-tight text-ink"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  {item.label}
                </motion.a>
              ))}
              <button
                type="button"
                className="mt-10 self-start bg-ink px-6 py-3 text-[11px] tracking-[0.24em] text-paper uppercase"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
              >
                Book a session
              </button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
