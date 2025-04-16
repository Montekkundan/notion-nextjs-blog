import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { DynamicFooter } from "./dynamic-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://notion-nextjs-blog-delta.vercel.app/"),
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
    url: "https://notion-nextjs-blog-delta.vercel.app/",
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
      suppressHydrationWarning
    >
      <body className="antialiased tracking-tight dark:bg-zinc-950 bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
            {/* REMOVE THIS BUTTON AFTER DEPLOYMENT */}
            <button className="fixed top-4 left-4 z-50">
              <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMontekkundan%2Fnotion-nextjs-blog&env=NOTION_ACCESS_TOKEN,NOTION_POST_DATABASE_ID&envDescription=Set%20NOTION_ACCESS_TOKEN%20(your%20Notion%20integration%20API%20key)%20and%20NOTION_POST_DATABASE_ID%20(your%20Notion%20database%20ID)%3B%20see%20Notion%20API%20docs%20for%20details.&envLink=https%3A%2F%2Fdevelopers.notion.com%2Fdocs%2Fgetting-started">
                <img src="https://vercel.com/button" alt="Deploy with Vercel" />
              </a>
            </button>
            <ThemeToggle />
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              {children}
            </main>
            <DynamicFooter />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
