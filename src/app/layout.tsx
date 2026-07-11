import type { Metadata } from "next";
import { Newsreader, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ThemeScript } from "@/providers/ThemeScript";
import { Nav } from "@/components/layout/Nav/Nav";
import { Footer } from "@/components/layout/Footer/Footer";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Full-stack developer portfolio — case studies, snippets, and experiments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
