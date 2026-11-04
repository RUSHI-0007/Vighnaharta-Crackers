"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { LanguageSwitcher } from "./language-switcher";

export function SiteFooter() {
  const { t, locale } = useTranslation();

  return (
    <footer className="bg-[#202d3a] text-[#fff9f0] pt-12 pb-24 sm:pb-12 text-xs mt-auto">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#e9b94f]" />
              <div>
                <span className="font-heading font-semibold text-lg tracking-[2px] text-[#fff9f0] block">
                  VIGHNAHARTA
                </span>
                <span className="text-[9px] tracking-[3px] text-[#c6cdd2] font-semibold block uppercase">
                  CRACKERS • {siteConfig.name.mr}
                </span>
              </div>
            </div>
            <p className="text-[#c6cdd2] text-xs leading-relaxed">
              {locale === "mr"
                ? "तुमच्या कुटुंबाच्या आनंदी दिवाळीसाठी दर्जेदार फटाके. योग्य पॅकिंग, वाजवी होलसेल दर आणि थेट गणेगाव खालसामध्ये उपलब्ध."
                : "A neighbourhood shop for brighter festive moments. Thoughtfully selected, locally delivered at wholesale rates."}
            </p>
            <div className="pt-1 text-[11px] text-[#c6cdd2] space-y-1">
              <p>
                <strong className="text-white">{t.common.proprietor}</strong>{" "}
                {locale === "mr" ? siteConfig.owner.mr : siteConfig.owner.en}
              </p>
              <p className="flex items-center gap-1.5 text-[#c6cdd2]">
                <Clock className="h-3.5 w-3.5 text-[#e9b94f] shrink-0" />
                <span>{t.common.stallHours}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              {t.common.exploreCollection}
            </h3>
            <ul className="space-y-2 text-xs text-[#c6cdd2]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.common.home}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  {t.common.shopAll}
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="hover:text-white transition-colors">
                  {locale === "mr" ? "होलसेल किंमत यादी" : "Price List (Quick Order)"}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  {t.common.cart}
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  {t.common.trackOrder}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              {t.common.popularCategories}
            </h3>
            <ul className="space-y-2 text-xs text-[#c6cdd2]">
              <li>
                <Link href="/shop?category=sparklers" className="hover:text-white transition-colors">
                  {locale === "mr" ? "फुलबाजे (Sparklers)" : "Sparklers (फुलबाजे)"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flower-pots" className="hover:text-white transition-colors">
                  {locale === "mr" ? "अनार (Flower Pots)" : "Flower Pots (अनार)"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ground-chakkars" className="hover:text-white transition-colors">
                  {locale === "mr" ? "भुईचक्र (Ground Chakkars)" : "Ground Chakkars (भुईचक्र)"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sky-shots" className="hover:text-white transition-colors">
                  {locale === "mr" ? "स्काय शॉट्स (Aerial Fireworks)" : "Aerial Fireworks (स्काय शॉट्स)"}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gift-boxes" className="hover:text-white transition-colors">
                  {locale === "mr" ? "गिफ्ट बॉक्स (Festive Boxes)" : "Festive Boxes (गिफ्ट बॉक्स)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Stall Details & Payment */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              {t.common.stallAndPayment}
            </h3>
            <div className="flex items-start gap-2 text-[#c6cdd2]">
              <MapPin className="h-4 w-4 text-[#e9b94f] shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">
                  {locale === "mr" ? siteConfig.address.mr : siteConfig.address.en}
                </span>
                <span className="text-[11px] text-[#c6cdd2]">
                  {locale === "mr" ? siteConfig.address.en : siteConfig.address.mr}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#e9b94f] shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-bold text-white hover:text-[#e9b94f] font-mono text-sm"
              >
                +91 {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#c6cdd2] pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t.common.acceptedPayments}</span>
            </div>
          </div>
        </div>

        {/* Bottom Rule & Legal */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#c6cdd2] text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name.en} ({siteConfig.name.mr}). {t.common.rights}
          </p>

          <div className="flex items-center gap-3 text-[#c6cdd2] flex-wrap justify-center">
            {/* Language Switcher in Footer */}
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              <span className="text-[10px] text-[#c6cdd2] uppercase tracking-wider">भाषा / Lang:</span>
              <LanguageSwitcher variant="minimal" />
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors border border-white/10"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#e9b94f]" />
              <span>{t.common.adminLogin}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
