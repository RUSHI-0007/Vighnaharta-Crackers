import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Us & Stall Location | ${siteConfig.name.en}`,
  description: `Visit ${siteConfig.name.en} opposite Grampanchayat, Ganegaon Khalsa. Call Akshay Bendbhar at 9561851896 for Diwali wholesale cracker orders.`,
};

export default function ContactPage() {
  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-6 sm:py-10">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pb-2 border-b border-slate-200">
          <Link href="/" className="hover:text-red-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-900 font-bold">Contact Us & Stall Info</span>
        </nav>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Contact Vighnaharta Fataka Stall
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            विघ्नहर्ता फटाका स्टॉल • गणेगाव खालसा | संचालक: अक्षय बेंडभर
          </p>
        </div>

        {/* 2-Column Info & Stall Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Direct Contact & Timing */}
          <div className="md:col-span-7 space-y-4">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-5">
              
              {/* Stall Location */}
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0 border border-red-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Stall Location
                  </h3>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {siteConfig.address.en}
                  </p>
                  <p className="text-xs text-slate-500">
                    {siteConfig.address.mr} (तालुका शिरूर, जिल्हा पुणे)
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Phone & WhatsApp Support
                  </h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-base font-black text-slate-900 hover:text-red-700 font-mono block mt-0.5"
                  >
                    +91 {siteConfig.phone}
                  </a>
                  <p className="text-xs text-slate-500">
                    Proprietor: {siteConfig.owner.en} ({siteConfig.owner.mr})
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent("Hello Akshay, I want to inquire about Diwali firecrackers at Vighnaharta Stall.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 shadow-xs transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-1.5 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-red-700" />
                      <span>Call Directly</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stall Timings */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Stall Timings
                  </h3>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Open Daily: 8:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-slate-500">
                    Open seven days a week throughout the festive Diwali season.
                  </p>
                </div>
              </div>

            </div>

            {/* Trust Assurance Card */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 text-xs text-emerald-950 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>100% Original Sivakasi Wholesale Fireworks</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Direct wholesale stock directly sourced from Sivakasi, Tamil Nadu. Quality tested, authentic sounds and bright colors for family celebrations.
              </p>
            </div>

          </div>

          {/* Right Column: Stall Photo & Quick Action */}
          <div className="md:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-2xs">
              <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner.png"
                  alt={`${siteConfig.name.en} Stall Photo`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-3 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">
                  {siteConfig.name.en} ({siteConfig.name.mr})
                </span>
                <span className="text-slate-500 block text-[11px]">
                  आमच्याकडे सर्व प्रकारचे फटाके होलसेल दरात मिळतील.
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">
                Quick Actions
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/shop"
                  className="rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 text-center transition-colors shadow-xs"
                >
                  Browse Crackers Catalog &rarr;
                </Link>
                <Link
                  href="/price-list"
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 text-center transition-colors shadow-xs"
                >
                  Quick Shop / Price List &rarr;
                </Link>
                <Link
                  href="/track"
                  className="rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 text-center transition-colors"
                >
                  Track Existing Order
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
