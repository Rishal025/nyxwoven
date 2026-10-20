"use client";

import { artists } from "@/data/artists";
import type { GalleryItem } from "@/data/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const item = index === null ? null : items[index];

  useEffect(() => {
    if (index === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 text-paper sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center"
            onClick={onClose}
          >
            <X />
            <span className="sr-only">Close artwork</span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center sm:inline-flex"
            onClick={() => onIndexChange(((index ?? 0) - 1 + items.length) % items.length)}
          >
            <ChevronLeft />
            <span className="sr-only">Previous artwork</span>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center sm:inline-flex"
            onClick={() => onIndexChange(((index ?? 0) + 1) % items.length)}
          >
            <ChevronRight />
            <span className="sr-only">Next artwork</span>
          </button>

          <div className="grid w-full max-w-5xl gap-6 md:grid-cols-[1.4fr_0.8fr] md:items-center">
            <div className="relative mx-auto flex max-h-[78vh] w-full items-center justify-center overflow-hidden bg-ink">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.aspect === "portrait" ? 720 : 1200}
                height={item.aspect === "portrait" ? 960 : 800}
                className="max-h-[78vh] w-auto object-contain"
                sizes="80vw"
              />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.28em] uppercase opacity-70">{item.style}</p>
              <h3 className="mt-3 font-display text-4xl italic">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-paper/75">{item.description}</p>
              <p className="mt-6 text-sm">
                {artists.find((artist) => artist.id === item.artistId)?.name}
              </p>
              <div className="mt-8 flex gap-3 sm:hidden">
                <button
                  type="button"
                  className="border border-paper/30 px-4 py-2 text-[11px] tracking-[0.2em] uppercase"
                  onClick={() => onIndexChange(((index ?? 0) - 1 + items.length) % items.length)}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="border border-paper/30 px-4 py-2 text-[11px] tracking-[0.2em] uppercase"
                  onClick={() => onIndexChange(((index ?? 0) + 1) % items.length)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
