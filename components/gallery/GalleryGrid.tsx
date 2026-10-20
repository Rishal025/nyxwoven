"use client";

import { artists } from "@/data/artists";
import { galleryFilters, galleryItems } from "@/data/gallery";
import type { ArtistId, GalleryCategory } from "@/data/types";
import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

export function GalleryGrid({ artistFilter }: { artistFilter?: ArtistId | null }) {
  const [category, setCategory] = useState<"all" | GalleryCategory>("all");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesArtist = !artistFilter || item.artistId === artistFilter;
      return matchesCategory && matchesArtist;
    });
  }, [artistFilter, category]);

  return (
    <div>
      <div
        className="sticky top-[4.25rem] z-20 -mx-5 flex gap-2 overflow-x-auto bg-paper/90 px-5 py-3 backdrop-blur-md [scrollbar-width:none] sm:mx-0 sm:px-0"
        role="tablist"
        aria-label="Artwork categories"
      >
        {galleryFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={category === filter.id}
            onClick={() => setCategory(filter.id)}
            className={cn(
              "shrink-0 px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors",
              category === filter.id ? "bg-ink text-paper" : "border border-line text-ink hover:border-ink",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group mb-3 block w-full break-inside-avoid overflow-hidden bg-paper-2 text-left"
            onClick={() => setActive(items.findIndex((entry) => entry.id === item.id))}
          >
            <span className="relative block overflow-hidden">
              <span className="view-unmask block">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.aspect === "portrait" ? 720 : 960}
                height={item.aspect === "portrait" ? 960 : item.aspect === "square" ? 960 : 720}
                className="image-zoom h-auto w-full object-cover grayscale"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              </span>
              <span className="veil absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-3 py-3 text-paper opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                <span className="font-display text-lg italic">{item.title}</span>
                <span className="text-[10px] tracking-[0.16em] uppercase">
                  {artists.find((artist) => artist.id === item.artistId)?.name}
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-sm text-muted">No artwork in this collection yet.</p>
      ) : null}

      <Lightbox items={items} index={active} onClose={() => setActive(null)} onIndexChange={setActive} />
    </div>
  );
}
