import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeScript } from "@/providers/ThemeScript";
import { Nav } from "@/components/layout/Nav/Nav";
import { Footer } from "@/components/layout/Footer/Footer";
import { getSearchIndex } from "@/lib/search";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Really Slow Websites | Adam Terchin",
  description: "Full stack developer portfolio, notebook, and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = getSearchIndex();
  const exampleTags = [...new Set(searchItems.flatMap((item) => item.tags))];

  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <Nav searchItems={searchItems} exampleTags={exampleTags} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
