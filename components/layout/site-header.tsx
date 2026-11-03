"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CartButton } from "@/components/cart/cart-button";
import { Phone, PackageSearch, Sparkles, MapPin } from "lucide-react";

export function SiteHeader({ onOpenCart }: { onOpenCart: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-[#080c24]/90 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 sm:h-20 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {siteConfig.name.en}
              </h1>
              <span className="hidden md:inline-block rounded-md bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                Wholesale
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
              <span>{siteConfig.name.mr}</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="hidden sm:inline flex items-center gap-0.5">
                <MapPin className="h-2.5 w-2.5 text-accent" />
                Ganegaon Khalsa
              </span>
            </p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-foreground/90 hover:text-white hover:bg-secondary/70 transition-colors min-h-[40px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Shop Fireworks</span>
          </Link>

          <Link
            href="/track"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/60 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition-colors min-h-[40px]"
          >
            <PackageSearch className="h-3.5 w-3.5 text-accent" />
            <span>Track Order</span>
          </Link>

          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-2 text-xs font-bold text-primary hover:bg-primary/20 transition-all min-h-[40px]"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span>Call {siteConfig.phone}</span>
          </a>

          <CartButton onClick={onOpenCart} />
        </nav>
      </div>
    </header>
  );
}
