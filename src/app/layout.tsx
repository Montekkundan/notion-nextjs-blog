import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { DynamicFooter } from "./dynamic-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://montek.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Montek Kundan",
    template: "%s | Montek Kundan",
  },
  description: "Digital garden of Montek Kundan",
  openGraph: {
    title: "Montek Kundan",
    description: "Digital garden of Montek Kundan",
    url: "https://montek.dev/",
    siteName: "Montek Kundan",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Montek Kundan Open Graph Image",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@montekundan",
    title: "Montek Kundan",
    description: "Digital garden of Montek Kundan",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Montek Kundan Twitter Card",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="antialiased tracking-tight">
        <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
          <main className="max-w-[60ch] mx-auto w-full space-y-6">
            {children}
          </main>
          <DynamicFooter />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
