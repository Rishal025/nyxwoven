"use client";

import { services } from "@/data/services";
import { useBooking } from "@/components/providers/BookingProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Services() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  const service = services[active];

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#piercing") {
        const index = services.findIndex((item) => item.id === "piercing");
        if (index >= 0) setActive(index);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <Eyebrow>The work</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.95] tracking-tight">
            Six languages. One studio hand.
          </h2>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-[minmax(16rem,0.78fr)_minmax(0,1.22fr)]">
          <div className="flex gap-2 overflow-x-auto border-b border-line px-5 py-4 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:px-0 lg:py-0">
            {services.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  id={item.id === "piercing" ? "piercing" : undefined}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => {
                    if (window.matchMedia("(min-width: 1024px)").matches) setActive(index);
                  }}
                  className={cn(
                    "scroll-mt-28 shrink-0 border px-4 py-3 text-left transition-colors duration-300 lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-8 lg:py-7",
                    selected
                      ? "border-ink bg-ink text-paper lg:bg-paper lg:text-ink"
                      : "border-line text-muted hover:text-ink",
                  )}
                >
                  <span className="block text-[10px] tracking-[0.24em] uppercase opacity-70">{item.eyebrow}</span>
                  <span className={cn("mt-1 block font-display text-2xl italic tracking-tight lg:text-[2rem]", selected && "lg:translate-x-1")}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[32rem] lg:min-h-[46rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={service.id}
                className="absolute inset-0 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative min-h-[18rem] flex-1 overflow-hidden bg-paper-2">
                  <div className="view-unmask absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="ken-in object-cover grayscale"
                  />
                  </div>
                  <p className="absolute right-4 bottom-4 font-display text-5xl italic text-paper/30 lg:text-7xl">
                    0{active + 1}
                  </p>
                </div>
                <div className="bg-paper px-5 py-8 sm:px-10">
                  <p className="max-w-lg text-sm leading-7 text-muted">{service.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm text-ink-soft">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className="mt-2 h-px w-6 shrink-0 bg-line-strong" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Button type="button" variant="line" className="mt-7" onClick={() => openBooking({ serviceId: service.id })}>
                    Book this sitting
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
