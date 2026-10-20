import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyxwoven.example"),
  title: "NyxWoven — Custom Tattoos, Fine Art, Lasting Stories",
  description:
    "NyxWoven is an appointment-only tattoo and piercing studio for original custom work, fine-line, blackwork, ornamental tattoos, and considered piercing.",
  openGraph: {
    title: "NyxWoven — Custom Tattoos & Piercing",
    description: "A private studio for original tattoos, piercing, and lasting stories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} grain antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
