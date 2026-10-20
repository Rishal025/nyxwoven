"use client";

import { artists } from "@/data/artists";
import { galleryItems } from "@/data/gallery";
import { useBooking } from "@/components/providers/BookingProvider";
import { Button } from "@/components/ui/Button";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Artists({
  onViewWork,
}: {
  onViewWork: (artistId: (typeof artists)[number]["id"]) => void;
}) {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  const artist = artists[active];
  const works = galleryItems.filter((item) => item.artistId === artist.id).slice(0, 3);

  return (
    <section id="artists" className="scroll-mt-24 border-t border-line bg-cream px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>The artists</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] tracking-tight">
              Three hands.
              <span className="block italic">One atelier.</span>
            </h2>
          </Reveal>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Artist list">
            {artists.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "font-display text-2xl italic tracking-tight sm:text-3xl",
                  index === active ? "text-ink" : "text-ink/30 hover:text-ink/70",
                )}
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-12">
          <div className="relative lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={artist.id}
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <ClipReveal>
                <ParallaxFrame
                  src={artist.portrait}
                  alt={artist.portraitAlt}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-[min(68vh,38rem)]"
                />
                </ClipReveal>
                <div className="veil pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-[11px] tracking-[0.28em] text-paper/70 uppercase">{artist.specialization}</p>
                  <p className="mt-2 font-display text-4xl italic text-paper sm:text-6xl">{artist.name}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${artist.id}-copy`}
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                exit={{ y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <p className="max-w-lg text-base leading-8 text-ink-soft">{artist.statement}</p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {works.map((work) => (
                    <div key={work.id} className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                      <Image src={work.src} alt={work.alt} fill className="object-cover grayscale" sizes="180px" />
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button type="button" onClick={() => openBooking({ artistId: artist.id })}>
                    Book with {artist.name.split(" ")[0]}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      onViewWork(artist.id);
                      document.getElementById("tattoos")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    View portfolio
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
