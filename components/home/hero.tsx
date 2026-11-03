import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { Phone, ArrowRight, ShieldCheck, Flame, Sparkles, MapPin, CheckCircle2, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-12 md:py-16 lg:py-20">
      {/* Background fireworks sparks/particles */}
      <Particles quantity={45} color="#F59E0B" className="opacity-80" />

      {/* Atmospheric lighting glows */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-amber-500/15 to-orange-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-rose-500/10 to-amber-400/15 blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Festive Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-sm shadow-amber-500/10 backdrop-blur-md">
              <span className="text-sm">🪔</span>
              <span className="tracking-wide uppercase">Diwali 2026 Mega Sale • Sivakasi Wholesale</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Light Up Your Diwali With{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Wholesale Fireworks
                </span>
              </h1>
              <p className="font-heading text-lg sm:text-xl text-amber-300/90 font-medium pt-1">
                {siteConfig.name.mr} ({siteConfig.name.en})
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              Authentic Sivakasi sparklers, rockets, ground chakkars, aerial sky shots, and grand family gift boxes at guaranteed wholesale rates. Order online for quick stall pickup or local doorstep delivery!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Link href="/shop">
                <ShimmerButton className="text-sm font-bold shadow-xl shadow-orange-500/25 px-6 py-3.5">
                  <Flame className="h-4 w-4 mr-2 text-amber-200 fill-current" />
                  <span>Explore Fireworks Collection</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </ShimmerButton>
              </Link>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-card/80 px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary hover:text-white active:scale-95 transition-all min-h-[48px] shadow-sm"
              >
                <Phone className="h-4 w-4 text-primary" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </div>

            {/* Trust Highlights Grid */}
            <div className="pt-6 border-t border-border/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-medium text-foreground/90">100% Genuine Sivakasi</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="font-medium text-foreground/90">Up to 35% Wholesale Off</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium text-foreground/90">Local Ganegaon Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-rose-400 shrink-0" />
                <span className="font-medium text-foreground/90">UPI & COD Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Festive Stall Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl border border-border/80 bg-gradient-to-b from-[#111947] to-[#0A0E29] p-4 sm:p-5 shadow-2xl shadow-black/60 overflow-hidden">
              
              {/* Top Status Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-foreground">Stall Open Daily</span>
                  <span className="text-[11px] text-muted-foreground">(8 AM – 10 PM)</span>
                </div>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                  Ganegaon Khalsa
                </span>
              </div>

              {/* Banner Graphic Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-border bg-black/40 aspect-[16/10] shadow-inner mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner.png"
                  alt={`${siteConfig.name.mr} Banner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 sm:p-4">
                  <div>
                    <p className="text-white font-heading text-base sm:text-lg font-bold drop-shadow">
                      {siteConfig.name.mr}
                    </p>
                    <p className="text-[11px] text-amber-300 font-medium drop-shadow">
                      {siteConfig.tagline.en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Perks Strip */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-secondary/50 border border-border/60 p-2.5">
                  <span className="block font-heading text-base font-bold text-amber-400">35%</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Max Savings</span>
                </div>
                <div className="rounded-xl bg-secondary/50 border border-border/60 p-2.5">
                  <span className="block font-heading text-base font-bold text-primary">100+</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Varieties</span>
                </div>
                <div className="rounded-xl bg-secondary/50 border border-border/60 p-2.5">
                  <span className="block font-heading text-base font-bold text-emerald-400">Local</span>
                  <span className="text-[10px] text-muted-foreground font-medium">Free Delivery</span>
                </div>
              </div>

              {/* Direct Location Link */}
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span className="truncate">{siteConfig.address.en}</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-bold shrink-0 ml-2"
                >
                  View Map &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
