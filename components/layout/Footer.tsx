import { navItems } from "@/data/nav";
import { studio } from "@/data/studio";
import { Mark } from "@/components/ui/Wordmark";
import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <Mark className="h-8 w-12" />
            <span className="font-display text-3xl italic">NyxWoven</span>
          </div>
          <p className="mt-8 hidden font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.85] tracking-tight lg:block">
            Ink is forever.
          </p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
            An appointment-only tattoo and piercing studio. Private sittings, original drawing, and work meant to last.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.28em] text-muted uppercase">
            Your story / Our canvas
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[11px] tracking-[0.24em] text-muted uppercase">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[11px] tracking-[0.24em] text-muted uppercase">Visit</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-soft">
            <li>{studio.locationNote}</li>
            <li>{studio.hoursNote}</li>
            <li>
              <a className="underline-offset-4 hover:underline" href={`mailto:${studio.contactEmail}`}>
                {studio.contactEmail}
              </a>
            </li>
            <li>{studio.contactPhone}</li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="text-[11px] tracking-[0.24em] text-muted uppercase">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" className="hover:underline">
                Pinterest
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-[11px] tracking-[0.18em] text-muted uppercase sm:px-8">
          © {new Date().getFullYear()} NyxWoven. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
