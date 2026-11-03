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
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-8 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#737373] font-medium pb-2 border-b border-[#e9e0d5]">
          <Link href="/" className="hover:text-[#b91c32] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#737373]" />
          <span className="text-[#202d3a] font-bold">Contact Us & Stall Info</span>
        </nav>

        {/* Page Title */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b91c32] block">
            Visit & Contact
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202d3a] tracking-tight">
            Contact Vighnaharta Fataka Stall
          </h1>
          <p className="text-xs sm:text-sm text-[#737373]">
            {siteConfig.name.mr} • {siteConfig.address.mr} | संचालक: {siteConfig.owner.mr}
          </p>
        </div>

        {/* 2-Column Info & Stall Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Direct Contact & Timing */}
          <div className="md:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-[#e9e0d5] p-6 shadow-2xs space-y-5">
              {/* Stall Location */}
              <div className="flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-[#b91c32]/10 text-[#b91c32] flex items-center justify-center shrink-0 border border-[#b91c32]/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                    Stall Location
                  </h3>
                  <p className="text-sm font-bold text-[#202d3a] mt-0.5">
                    {siteConfig.address.en}
                  </p>
                  <p className="text-xs text-[#737373]">
                    {siteConfig.address.mr} (तालुका शिरूर, जिल्हा पुणे)
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#b91c32] hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#e9e0d5]">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                    Phone & WhatsApp Support
                  </h3>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-base font-black text-[#202d3a] hover:text-[#b91c32] font-mono block mt-0.5"
                  >
                    +91 {siteConfig.phone}
                  </a>
                  <p className="text-xs text-[#737373]">
                    Proprietor: {siteConfig.owner.en} ({siteConfig.owner.mr})
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent(
                        "Hello Akshay, I want to inquire about Diwali firecrackers at Vighnaharta Stall."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 shadow-xs transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#f5eddf] hover:bg-[#e9e0d5] text-[#202d3a] font-bold text-xs px-3.5 py-1.5 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#b91c32]" />
                      <span>Call Directly</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stall Timings */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-[#e9e0d5]">
                <div className="h-10 w-10 rounded-xl bg-[#fff9f0] text-[#e9b94f] flex items-center justify-center shrink-0 border border-[#e9e0d5]">
                  <Clock className="h-5 w-5 text-[#b91c32]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                    Stall Timings
                  </h3>
                  <p className="text-sm font-bold text-[#202d3a] mt-0.5">
                    Open Daily: 8:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-[#737373]">
                    Open seven days a week throughout the festive Diwali season.
                  </p>
                </div>
              </div>
            </div>

            {/* Stall Information Card */}
            <div className="bg-[#f5eddf] rounded-2xl border border-[#e9e0d5] p-5 text-xs text-[#202d3a] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#202d3a]">
                <ShieldCheck className="h-4 w-4 text-[#b91c32]" />
                <span>Local Stall Service in Ganegaon Khalsa</span>
              </div>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                Direct in-person assistance, transparent pack prices, and customer support by {siteConfig.owner.en}.
              </p>
            </div>
          </div>

          {/* Right Column: Stall Photo & Quick Action */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#e9e0d5] p-3.5 shadow-2xs">
              <div className="relative rounded-xl overflow-hidden bg-[#fff9f0] border border-[#e9e0d5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/banner.webp"
                  alt={`${siteConfig.name.en} Stall Photo`}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-3 text-xs text-[#737373] space-y-1">
                <span className="font-bold text-[#202d3a] block">
                  {siteConfig.name.en} ({siteConfig.name.mr})
                </span>
                <span className="text-[#737373] block text-[11px]">
                  आमच्याकडे सर्व प्रकारचे फटाके होलसेल दरात मिळतील.
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-[#e9e0d5] p-5 shadow-2xs space-y-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#737373] text-[10px] block">
                Quick Actions
              </span>
              <div className="flex flex-col gap-2">
                <Link
                  href="/shop"
                  className="rounded-xl bg-[#b91c32] hover:bg-[#981426] text-white font-bold px-4 py-2.5 text-center transition-colors shadow-xs"
                >
                  Browse Crackers Catalog &rarr;
                </Link>
                <Link
                  href="/price-list"
                  className="rounded-xl bg-[#f5eddf] hover:bg-[#e9e0d5] text-[#202d3a] font-bold px-4 py-2.5 text-center transition-colors"
                >
                  Quick Shop / Price List &rarr;
                </Link>
                <Link
                  href="/track"
                  className="rounded-xl border border-[#e9e0d5] bg-white hover:bg-[#fff9f0] text-[#202d3a] font-bold px-4 py-2.5 text-center transition-colors"
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
