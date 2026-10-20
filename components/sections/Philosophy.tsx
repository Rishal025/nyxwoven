"use client";

import { studio } from "@/data/studio";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <section id="studio" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:items-start">
        <div className="lg:sticky lg:top-28 lg:col-span-7 lg:pr-8">
          <Reveal>
            <Eyebrow>The studio</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.9] tracking-tight">
              Your skin.
              <span className="block italic">Your story.</span>
              <span className="block">Our craft.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted">{studio.philosophy}</p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-5 lg:pt-16">
          <ClipReveal>
            <ParallaxFrame
              src="/images/portrait-neck-ink.jpg"
              alt="Fine-line neck tattoos in an editorial portrait"
              sizes="(max-width: 1024px) 90vw, 34vw"
              className="aspect-[4/5] ml-auto w-[88%]"
            />
          </ClipReveal>
          <ClipReveal delay={0.12} className="relative z-10 -mt-16 w-[72%] sm:-mt-24">
            <ParallaxFrame
              src="/images/studio-interior.jpg"
              alt="NyxWoven studio interior with a leather chair and framed work"
              sizes="(max-width: 1024px) 70vw, 28vw"
              className="aspect-[4/3] border-[8px] border-paper"
            />
          </ClipReveal>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl overflow-x-auto border-t border-line pt-10 [scrollbar-width:none] sm:mt-24">
        <ul className="flex min-w-max gap-12 sm:grid sm:min-w-0 sm:grid-cols-4 sm:gap-10">
          {studio.principles.map((item, index) => (
            <li key={item.title} className="w-56 shrink-0 sm:w-auto">
              <Reveal>
              <p className="font-display text-6xl italic leading-none text-ink/12">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl italic">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
