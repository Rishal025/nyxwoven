"use client";

import { studio } from "@/data/studio";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Studio() {
  return (
    <section className="border-t border-line px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <ClipReveal>
            <ParallaxFrame
              src="/images/studio-interior.jpg"
              alt="Atmospheric tattoo studio interior"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[16/10]"
            />
          </ClipReveal>
          <div className="relative z-10 mt-3 grid grid-cols-2 gap-3 sm:-mt-16 sm:ml-8 sm:w-[72%]">
            <ClipReveal delay={0.08}>
              <ParallaxFrame
                src="/images/studio-station.jpg"
                alt="Prepared tattoo workstation"
                sizes="30vw"
                className="aspect-[4/5] border-[6px] border-paper"
              />
            </ClipReveal>
            <ClipReveal delay={0.14} className="sm:mt-10">
              <ParallaxFrame
                src="/images/studio-consultation.jpg"
                alt="Custom tattoo design being drawn at a desk"
                sizes="30vw"
                className="aspect-square"
              />
            </ClipReveal>
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <Eyebrow>The sitting</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95] tracking-tight">
              A quiet room for permanent work.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted">
              Visiting NyxWoven is unhurried. You arrive for a conversation, a drawing, or a sitting — never a crowd. Hygiene is visible. Music is optional. The work is the point.
            </p>
          </Reveal>
          <ol className="relative mt-10 space-y-0 border-l border-line pl-6">
            {studio.visit.map((item, index) => (
              <li key={item.title} className="relative pb-8 last:pb-0">
                <Reveal>
                <span className="absolute top-1.5 -left-[1.9rem] h-2 w-2 rounded-full bg-ink" />
                <p className="text-[11px] tracking-[0.22em] text-muted uppercase">0{index + 1}</p>
                <h3 className="mt-1 font-display text-2xl italic">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink-soft">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <dl className="mt-10 grid gap-6 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-[11px] tracking-[0.22em] text-muted uppercase">Hours</dt>
              <dd className="mt-2 leading-6">{studio.hoursNote}</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.22em] text-muted uppercase">Location</dt>
              <dd className="mt-2 leading-6">{studio.locationNote}</dd>
            </div>
          </dl>
          <a
            href={`mailto:${studio.contactEmail}`}
            className="mt-8 inline-block text-[11px] tracking-[0.22em] uppercase underline-offset-4 hover:underline"
          >
            Write to the studio
          </a>
        </div>
      </div>
    </section>
  );
}
