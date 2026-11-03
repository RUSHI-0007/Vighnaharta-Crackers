import { siteConfig } from "@/config/site";
import { MapPin, Phone, ExternalLink, Clock, Store, Sparkles, CheckCircle2 } from "lucide-react";

export function VisitUs() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-[#0e153b] to-[#090d29] p-6 sm:p-10 md:p-12 overflow-hidden relative shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Stall details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                <Store className="h-3.5 w-3.5" />
                <span>Visit Our Physical Stall</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Experience Fireworks in Person at Our Stall
                </h2>
                <p className="text-xs sm:text-sm text-amber-300 font-medium">
                  {siteConfig.name.mr} • संचालक: {siteConfig.owner.mr} ({siteConfig.owner.en})
                </p>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Visit with your family to browse our complete collection of genuine Sivakasi fireworks at factory wholesale rates. Take advantage of festive combo offers, bulk box deals, and personalized recommendations.
              </p>

              <div className="space-y-3.5 pt-2 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="block text-foreground font-semibold">Stall Address:</strong>
                    <span className="text-muted-foreground">{siteConfig.address.en}</span>
                    <span className="block text-xs text-amber-400/80 mt-0.5">({siteConfig.address.mr})</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-foreground font-semibold">Operating Hours:</strong>
                    <span className="text-muted-foreground ml-2">8:00 AM to 10:00 PM (All 7 Days)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-foreground font-semibold">Payment Accepted:</strong>
                    <span className="text-muted-foreground ml-2">Cash, Google Pay, PhonePe, Paytm UPI</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-orange-500/25 min-h-[46px]"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call {siteConfig.phone}</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-secondary/80 px-5 py-3 text-xs sm:text-sm font-bold text-foreground hover:bg-secondary active:scale-95 transition-all min-h-[46px]"
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Right Column: Stall Banner Image Presentation */}
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl overflow-hidden border border-border/80 bg-black/60 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner.png"
                  alt={`${siteConfig.name.en} Stall Banner`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Official Stall Banner</span>
                  </div>
                  <span className="text-[11px] text-white/80 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-md font-mono">
                    Ganegaon Khalsa
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
