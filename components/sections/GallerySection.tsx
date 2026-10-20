"use client";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { artists } from "@/data/artists";
import type { ArtistId } from "@/data/types";

export function GallerySection({
  artistFilter,
  onClearArtist,
}: {
  artistFilter?: ArtistId | null;
  onClearArtist?: () => void;
}) {
  const artist = artists.find((item) => item.id === artistFilter);

  return (
    <section id="tattoos" className="scroll-mt-24 border-t border-line px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] tracking-tight">
            Work on skin, shown as it sits.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            Filter by language. Open a piece. The artwork keeps its own proportions.
          </p>
          {artist ? (
            <p className="mt-4 text-sm">
              Showing work by {artist.name}.{" "}
              <button type="button" className="underline underline-offset-4" onClick={onClearArtist}>
                View all artists
              </button>
            </p>
          ) : null}
        </Reveal>
        <div className="mt-10">
          <GalleryGrid artistFilter={artistFilter} />
        </div>
      </div>
    </section>
  );
}
