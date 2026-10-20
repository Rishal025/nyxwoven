"use client";

import { Aftercare } from "@/components/sections/Aftercare";
import { Artists } from "@/components/sections/Artists";
import { FinalCta } from "@/components/sections/FinalCta";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { Marquee } from "@/components/ui/Marquee";
import type { ArtistId } from "@/data/types";
import { useState } from "react";

export function HomeExperience() {
  const [artistFilter, setArtistFilter] = useState<ArtistId | null>(null);

  return (
    <>
      <Hero />
      <Marquee phrases={["Your story", "Our canvas", "Ink is forever", "Make it yours"]} />
      <Philosophy />
      <Services />
      <Artists onViewWork={(id) => setArtistFilter(id)} />
      <Marquee phrases={["Private sittings", "Original drawing", "Fine line", "Blackwork"]} />
      <GallerySection artistFilter={artistFilter} onClearArtist={() => setArtistFilter(null)} />
      <Studio />
      <Aftercare />
      <FinalCta />
    </>
  );
}
