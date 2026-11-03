import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BookOpen, Shield, Droplets, Phone, MapPin, ArrowRight } from "lucide-react";

export function VisitUs() {
  return (
    <section className="py-12 sm:py-16 bg-[#fff9f0] border-b border-[#e9e0d5]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. Responsible Celebration & Safety Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
              RESPONSIBLE CELEBRATION
            </span>
            <h2 className="font-heading font-semibold text-[#202d3a] text-2xl sm:text-4xl leading-tight">
              Safety at the heart of every spark.
            </h2>
            <p className="text-[#737373] text-xs sm:text-sm leading-relaxed">
              We care about safe festive traditions. Follow simple safety habits to keep everyone protected and smiling.
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#b91c32] hover:underline"
              >
                <span>Read stall safety tips & directions</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-[#e9e0d5] rounded-[16px] p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#fbecef] text-[#b91c32] flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-[#202d3a] text-sm sm:text-base">
                  Always read directions before lighting
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed">
                  Ignite fireworks only in open outdoor areas away from dry grass, vehicles, and overhead wires.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e9e0d5] rounded-[16px] p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#fbecef] text-[#b91c32] flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-[#202d3a] text-sm sm:text-base">
                  Adult supervision mandatory for children
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed">
                  Never leave youngsters unattended with sparklers, flower pots, or ground chakkars.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e9e0d5] rounded-[16px] p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#fbecef] text-[#b91c32] flex items-center justify-center shrink-0">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-[#202d3a] text-sm sm:text-base">
                  Keep water and sand buckets ready
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed">
                  Immerse spent sparkler sticks immediately in a bucket of water to avoid accidental burns.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Direct Stall Contact & Location Banner */}
        <div className="bg-[#f5eddf] border border-[#e9e0d5] rounded-[16px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
              LOCAL STALL SERVICE
            </span>
            <h3 className="font-heading font-semibold text-[#202d3a] text-2xl sm:text-3xl">
              Visit our Ganegaon Khalsa stall.
            </h3>
            <p className="text-[#737373] text-xs sm:text-sm leading-relaxed">
              Open daily 8:00 AM – 10:00 PM throughout the festive season. {siteConfig.address.en}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-[#b91c32] hover:bg-[#991b1b] text-white font-semibold text-xs sm:text-sm h-11 px-5 rounded-[10px] inline-flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call +91 {siteConfig.phone}</span>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e9e0d5] hover:bg-slate-50 text-[#202d3a] font-semibold text-xs sm:text-sm h-11 px-5 rounded-[10px] inline-flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-2xs"
            >
              <MapPin className="h-4 w-4 text-[#b91c32]" />
              <span>Directions on Maps</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
