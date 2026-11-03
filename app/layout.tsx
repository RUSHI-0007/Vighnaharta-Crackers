import type { Metadata, Viewport } from "next";
import { Yatra_One, Mukta } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteConfig } from "@/config/site";

const yatraOne = Yatra_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  variable: "--font-yatra",
  display: "swap",
});

const mukta = Mukta({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-mukta",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name.en} | Diwali Wholesale Firecrackers Stall`,
  description: `${siteConfig.tagline.en} - ${siteConfig.address.en}. Premium Sivakasi firecrackers online at wholesale prices.`,
  keywords: [
    "firecrackers",
    "fataka stall",
    "diwali crackers",
    "wholesale fireworks",
    "ganegaon khalsa",
    "vighnaharta",
    "sivakasi crackers",
  ],
};

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yatraOne.variable} ${mukta.variable}`}>
      <body className="antialiased min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-body selection:bg-red-600 selection:text-white">
        {children}
        <Toaster
          position="top-center"
          richColors
        />
      </body>
    </html>
  );
}
