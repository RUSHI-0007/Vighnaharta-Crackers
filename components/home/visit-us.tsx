"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/translations";
import { BookOpen, Shield, Droplets, Phone, MapPin, ArrowRight } from "lucide-react";

export function VisitUs() {
  const { t, locale, pick } = useTranslation();

  return (
    <section className="py-12 sm:py-16 bg-[#fff9f0] border-b border-[#e9e0d5]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. Responsible Celebration & Safety Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
              {t.visitUs.badge}
            </span>
            <h2 className="font-heading font-semibold text-[#202d3a] text-2xl sm:text-4xl leading-tight">
              {t.visitUs.heading}
            </h2>
            <p className="text-[#737373] text-xs sm:text-sm leading-relaxed">
              {t.visitUs.desc}
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#b91c32] hover:underline"
              >
                <span>{t.visitUs.readTips}</span>
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
                  {t.visitUs.tip1Title}
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed font-body">
                  {t.visitUs.tip1Desc}
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e9e0d5] rounded-[16px] p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#fbecef] text-[#b91c32] flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-[#202d3a] text-sm sm:text-base">
                  {t.visitUs.tip2Title}
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed font-body">
                  {t.visitUs.tip2Desc}
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e9e0d5] rounded-[16px] p-4 sm:p-5 flex items-start gap-4 shadow-2xs">
              <div className="h-10 w-10 rounded-full bg-[#fbecef] text-[#b91c32] flex items-center justify-center shrink-0">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-[#202d3a] text-sm sm:text-base">
                  {t.visitUs.tip3Title}
                </h3>
                <p className="text-[#737373] text-xs mt-0.5 leading-relaxed font-body">
                  {t.visitUs.tip3Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Direct Stall Contact & Location Banner */}
        <div className="bg-[#f5eddf] border border-[#e9e0d5] rounded-[16px] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
              {pick("LOCAL STALL SERVICE", "स्थानिक स्टॉल सेवा")}
            </span>
            <h3 className="font-heading font-semibold text-[#202d3a] text-2xl sm:text-3xl">
              {pick("Visit our Ganegaon Khalsa stall.", "आमच्या गणेगाव खालसा स्टॉलला भेट द्या.")}
            </h3>
            <p className="text-[#737373] text-xs sm:text-sm leading-relaxed">
              {t.common.stallHours}. {siteConfig.address[locale]}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-[#b91c32] hover:bg-[#991b1b] text-white font-semibold text-xs sm:text-sm h-11 px-5 rounded-[10px] inline-flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span>{pick("Call", "कॉल करा")} +91 {siteConfig.phone}</span>
            </a>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e9e0d5] hover:bg-slate-50 text-[#202d3a] font-semibold text-xs sm:text-sm h-11 px-5 rounded-[10px] inline-flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-2xs"
            >
              <MapPin className="h-4 w-4 text-[#b91c32]" />
              <span>{pick("Directions on Maps", "मॅपवर रस्ता पहा")}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
