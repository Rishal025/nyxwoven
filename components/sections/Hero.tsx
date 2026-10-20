"use client";

import { artists } from "@/data/artists";
import { galleryItems, studioInterior } from "@/data/gallery";
import { useBooking } from "@/components/providers/BookingProvider";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const heroImages = [
  { ...galleryItems.find((item) => item.id === "serpent-rose")!, caption: "Serpent & Rose" },
  { ...galleryItems.find((item) => item.id === "solar-hands")!, caption: "Solar Hands" },
  { ...galleryItems.find((item) => item.id === "nocturne-moth")!, caption: "Nocturne Moth" },
  { ...galleryItems.find((item) => item.id === "lunar-neck")!, caption: "Lunar Neck" },
  { ...studioInterior, caption: "The atelier" },
  { ...galleryItems.find((item) => item.id === "lion-compass")!, caption: "Lion Compass" },
];

export function Hero() {
  const { openBooking } = useBooking();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const headlineY = useTransform(scrollYProgress, [0.15, 1], [0, 120]);
  const headlineScale = useTransform(scrollYProgress, [0.2, 1], [1, 0.86]);
  const headlineOpacity = useTransform(scrollYProgress, [0.35, 1], [1, 0.15]);

  return (
    <section ref={sectionRef} id="top" className="relative px-5 pb-10 pt-28 sm:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="page-enter flex flex-col items-center text-center">
          <Wordmark />
          <p className="mt-5 text-[11px] tracking-[0.38em] text-muted uppercase">
            Custom tattoos / Fine art / Lasting stories
          </p>
        </div>

        <motion.div style={{ y: gridY }} className="mt-10 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 md:grid-cols-3">
          {heroImages.map((image, index) => (
            <figure
              key={image.src}
              className="hero-unmask group relative aspect-[4/3] overflow-hidden bg-paper-2"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="hero-zoom image-zoom object-cover grayscale"
                style={{ animationDelay: `${index * 90}ms` }}
                priority={index < 3}
              />
              <figcaption className="veil pointer-events-none absolute inset-x-0 bottom-0 px-3 py-3 text-[10px] tracking-[0.18em] text-paper uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 sm:text-[11px]">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <div className="view-reveal mt-12 grid items-center gap-8 border-t border-line pt-10 md:grid-cols-[1.15fr_auto] md:gap-16">
          <div>
            <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05] tracking-tight">
              Explore our artists
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              Each artist brings a unique perspective, style and story. Find the one who resonates with yours.
            </p>
            <a href="#artists" className="mt-5 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
              View artists
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            {artists.map((artist) => (
              <a
                key={artist.id}
                href="#artists"
                className="group relative h-[4.6rem] w-[4.6rem] overflow-hidden bg-paper-2 sm:h-24 sm:w-24"
              >
                <Image
                  src={artist.portrait}
                  alt={artist.portraitAlt}
                  fill
                  className="image-zoom object-cover grayscale"
                  sizes="96px"
                />
              </a>
            ))}
            <a
              href="#artists"
              className="ml-2 hidden h-10 w-10 items-center justify-center border border-line sm:inline-flex"
              aria-label="View artists"
            >
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="mt-12 text-center text-[11px] tracking-[0.42em] text-muted uppercase">
          Your story / Our canvas
        </p>

        <motion.div
          style={{ y: headlineY, scale: headlineScale, opacity: headlineOpacity }}
          className="mt-16 origin-left md:mt-20"
        >
          <h1 className="max-w-[11ch] font-display text-[clamp(3.2rem,11vw,8.4rem)] leading-[0.86] tracking-tight">
            Ink is forever.
            <span className="block italic">Make it yours.</span>
          </h1>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-7 text-muted">
              Appointment-only tattoo and piercing. Original drawing, private sittings, work meant to last.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => openBooking()}>
                Book your session
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => document.getElementById("tattoos")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discover the work
              </Button>
            </div>
          </div>
        </motion.div>

        <a
          href="#studio"
          className="scroll-cue mt-14 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] text-muted uppercase"
        >
          <ArrowDown className="h-4 w-4" />
          Scroll
        </a>
      </div>
    </section>
  );
}
