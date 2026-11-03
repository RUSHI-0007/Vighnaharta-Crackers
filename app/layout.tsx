import type { Metadata, Viewport } from "next";
import { Yatra_One, Mukta, Outfit, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteConfig } from "@/config/site";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
  themeColor: "#b91c32",
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
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${yatraOne.variable} ${mukta.variable}`}
    >
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col font-body selection:bg-primary selection:text-primary-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
