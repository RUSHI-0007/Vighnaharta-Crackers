import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShoppingBag, FileSpreadsheet, Phone, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-white border-b border-slate-200">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Festive Banner Card */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-700 text-white shadow-md">
          {/* Subtle decorative background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-10 items-center">
            
            {/* Left Column: Festive Message & Direct Stall Details */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-amber-100 border border-white/20">
                <Sparkles className="h-3.5 w-3.5 text-amber-200" />
                <span>Diwali Festival Wholesale 2026</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-xs">
                  {siteConfig.name.en}
                </h1>
                <p className="text-lg sm:text-2xl font-bold text-amber-200 font-sans">
                  {siteConfig.name.mr}
                </p>
                <p className="text-xs sm:text-sm text-amber-100/90 font-medium">
                  संचालक: <strong>{siteConfig.owner.mr}</strong> ({siteConfig.owner.en}) • फोन: <strong>{siteConfig.phone}</strong>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/95 leading-relaxed max-w-xl">
                १००% ओरिजिनल शिवाकाशी फटाके थेट होलसेल दरात! लहान मुलांचे फुलबाजे, भुईचक्र, आवाज फटाके, आकाशीय स्काय शॉट्स आणि फॅमिली गिफ्ट बॉक्सेस उपलब्ध.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-red-800 font-bold text-xs sm:text-sm px-5 py-3 hover:bg-amber-50 shadow-sm transition-all"
                >
                  <ShoppingBag className="h-4 w-4 text-red-700" />
                  <span>Buy Crackers (Full Catalog)</span>
                </Link>

                <Link
                  href="/price-list"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 shadow-sm transition-all border border-emerald-500"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Quick Shop / Price List</span>
                </Link>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-black/25 hover:bg-black/40 text-white font-semibold text-xs px-4 py-3 border border-white/20 transition-all"
                >
                  <Phone className="h-4 w-4 text-amber-300" />
                  <span>Call {siteConfig.phone}</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-[11px] text-amber-100">
                <MapPin className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                <span>स्टॉल पत्ता: ग्रामपंचायत समोर, गणेगाव खालसा (Ganegaon Khalsa)</span>
              </div>
            </div>

            {/* Right Column: Real Stall Banner Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-xl overflow-hidden bg-black/30 border-2 border-amber-300/40 shadow-xl max-w-sm w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner.png"
                  alt={`${siteConfig.name.en} Stall Photo`}
                  className="w-full h-auto object-cover"
                />
                <div className="p-2.5 bg-black/60 backdrop-blur-xs text-[11px] text-amber-100 flex items-center justify-between">
                  <span>स्टॉल वेळ: <strong>८:०० AM ते १०:०० PM</strong></span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline font-bold"
                  >
                    Google Maps &rarr;
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
