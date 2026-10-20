"use client";

import { BookingDrawer } from "@/components/booking/BookingDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BookingProvider } from "@/components/providers/BookingProvider";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <BookingDrawer />
    </BookingProvider>
  );
}
