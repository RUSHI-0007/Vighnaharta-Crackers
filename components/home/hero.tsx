import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowRight, Sparkles, Package, MapPin, Handshake } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-[#b91c32] text-white">
      {/* 1. Main Festive Banner Container */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-[11px] sm:text-[13px] tracking-[3px] text-[#e9b94f] font-semibold uppercase block">
                FESTIVE SEASON COLLECTION
              </span>
              <p className="font-heading text-lg sm:text-xl text-[#f5eddf] font-medium">
                {siteConfig.name.mr}
              </p>
            </div>

            <h1 className="font-heading font-medium text-white text-4xl sm:text-6xl lg:text-[72px] leading-[1.05] tracking-tight">
              Make room for a little more wonder.
            </h1>

            <p className="text-[#f5eddf] text-sm sm:text-base max-w-lg leading-relaxed font-normal">
              Bright, crackling moments for your family Diwali. Thoughtfully packaged, fairly priced, and ready for you in Ganegaon Khalsa.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="bg-[#e9b94f] hover:bg-[#d4a339] text-[#202d3a] font-semibold text-xs sm:text-sm h-12 px-6 rounded-[10px] inline-flex items-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <span>Explore the collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm h-12 px-6 rounded-[10px] inline-flex items-center gap-2 transition-colors"
              >
                <span>Find our stall</span>
              </Link>
            </div>
          </div>

          {/* Right: Still Life Photograph */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-[16px] overflow-hidden w-full max-w-[500px] h-[320px] sm:h-[400px] shadow-xl border border-white/10">
              <Image
                src="/images/hero-festive.webp"
                alt="Festive Cracker Collection"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute bottom-4 left-4 bg-[#fff9f0] text-[#b91c32] rounded-[10px] px-4 py-2.5 flex items-center gap-3 shadow-md">
                <span className="font-heading font-medium text-[16px] sm:text-[18px]">
                  The joy is in the choosing.
                </span>
                <Sparkles className="h-4 w-4 text-[#b91c32]" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Service Promises Bar (Clean, truthful, no unconfirmed claims) */}
      <div className="bg-[#f5eddf] border-b border-[#e9e0d5] px-4 sm:px-8 lg:px-20 py-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-[#202d3a] shrink-0" />
            <div>
              <p className="font-semibold text-[#202d3a] text-[13px]">
                Thoughtfully selected
              </p>
              <p className="text-[#737373] text-[11px]">
                Clear pack sizes and honest wholesale pricing.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-[#202d3a] shrink-0" />
            <div>
              <p className="font-semibold text-[#202d3a] text-[13px]">
                Local, not long-distance
              </p>
              <p className="text-[#737373] text-[11px]">
                Stall pickup & local service in Ganegaon Khalsa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-[#202d3a] shrink-0" />
            <div>
              <p className="font-semibold text-[#202d3a] text-[13px]">
                A real stall, a real team
              </p>
              <p className="text-[#737373] text-[11px]">
                Managed personally by {siteConfig.owner.en}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
