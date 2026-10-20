"use client";

import { aftercareItems } from "@/data/aftercare";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export function Aftercare() {
  const [openId, setOpenId] = useState(aftercareItems[0]?.id ?? "");

  return (
    <section id="aftercare" className="relative scroll-mt-24 overflow-hidden border-t border-line bg-paper-2 px-5 py-24 sm:px-8 lg:py-32">
      <p className="view-scale pointer-events-none absolute -right-6 top-10 hidden font-display text-[12rem] leading-none text-ink/[0.04] italic select-none lg:block">
        Heal
      </p>
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <Eyebrow>Aftercare</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.95] tracking-tight">
              Healing is part of the drawing.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted">
              General guidance only. Your artist’s instructions come first, and a healthcare professional should be contacted about anything concerning. This is not medical advice.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          {aftercareItems.map((item, index) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="border-t border-line last:border-b">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenId(open ? "" : item.id)}
                  >
                    <span className="font-display text-xl italic leading-snug sm:text-2xl">
                      <span className="mr-3 font-display text-ink/25">0{index + 1}</span>
                      {item.title}
                    </span>
                    {open ? <Minus className="mt-2 h-4 w-4 shrink-0" /> : <Plus className="mt-2 h-4 w-4 shrink-0" />}
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 pl-11 text-sm leading-7 text-muted sm:pl-12">{item.body}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
