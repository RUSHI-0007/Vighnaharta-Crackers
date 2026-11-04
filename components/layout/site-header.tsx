"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { useMounted } from "@/hooks/use-mounted";
import { useTranslation } from "@/lib/translations";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  ShoppingBag,
  Search,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function SiteHeader() {
  const router = useRouter();
  const mounted = useMounted();
  const { t, locale, pick } = useTranslation();
  const items = useCartStore((s) => s.items);
  const { totalCount } = useMemo(() => computeCartTotals(items), [items]);

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="w-full z-40 bg-[#fff9f0] border-b border-[#e9e0d5]">
      {/* 1. Local Service Announcement Bar with Language Toggle */}
      <div className="bg-[#b91c32] text-white text-[11px] h-[34px] px-4 flex items-center justify-between font-medium tracking-[0.4px]">
        <div className="container mx-auto flex items-center justify-between gap-3 text-center">
          <div className="flex items-center gap-2 truncate">
            <span>{t.common.tagline}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{t.common.address}</span>
          </div>
          <LanguageSwitcher variant="minimal" className="shrink-0" />
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 h-[80px] sm:h-[96px] flex items-center justify-between gap-4">
        {/* Mobile menu toggle button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#202d3a] hover:text-[#b91c32]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="shrink-0 flex items-center group">
          <Image
            src="/images/logo.webp"
            alt={`${siteConfig.name.en} - ${siteConfig.name.mr}`}
            width={198}
            height={48}
            priority
            className="h-[36px] sm:h-[44px] md:h-[48px] w-auto object-contain mix-blend-multiply"
          />
        </Link>

        {/* Search Bar (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-[440px] h-[44px] items-center bg-white border border-[#e9e0d5] rounded-[10px] px-4 gap-3 shadow-2xs"
        >
          <Search className="h-[18px] w-[18px] text-[#737373] shrink-0" />
          <input
            type="text"
            placeholder={t.common.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#202d3a] placeholder-[#737373] focus:outline-hidden"
          />
        </form>

        {/* Shop Actions */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Desktop Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Location Chip (Desktop) */}
          <div className="hidden xl:flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#b91c32] shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[#737373] text-[10px] font-medium tracking-wide">
                {t.common.localToYou}
              </span>
              <span className="text-[#202d3a] text-[12px] font-medium truncate max-w-[130px]">
                {pick("Ganegaon Khalsa", "गणेगाव खालसा")}
              </span>
            </div>
          </div>

          {/* Cart Link */}
          <Link
            href="/cart"
            className="flex items-center gap-2 text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-[#202d3a]" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-[#b91c32] text-white text-[10px] flex items-center justify-center font-bold">
                  {totalCount}
                </span>
              )}
            </div>
            <span className="font-semibold text-[13px] hidden sm:inline">
              {t.common.cart} ({mounted ? totalCount : 0})
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Category Navigation Strip */}
      <div className="border-t border-[#e9e0d5] px-4 sm:px-8 lg:px-20 h-[48px] flex items-center justify-between text-[12px] overflow-x-auto scrollbar-none whitespace-nowrap bg-[#fff9f0]">
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/shop"
            className="font-semibold text-[#b91c32] hover:underline"
          >
            {t.common.shopAll}
          </Link>
          <Link
            href="/shop?category=sparklers"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {pick("Sparklers", "फुलबाजे")}
          </Link>
          <Link
            href="/shop?category=flower-pots"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {pick("Flower pots", "अनार")}
          </Link>
          <Link
            href="/shop?category=ground-chakkars"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {pick("Ground chakkars", "भुईचक्र")}
          </Link>
          <Link
            href="/shop?category=sky-shots"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {pick("Aerial fireworks", "स्काय शॉट्स")}
          </Link>
          <Link
            href="/shop?category=gift-boxes"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {pick("Festive boxes", "गिफ्ट बॉक्स")}
          </Link>
          <Link
            href="/price-list"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            {t.common.priceList}
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 ml-6 shrink-0">
          <Link
            href="/contact"
            className="font-semibold text-[#b91c32] hover:underline"
          >
            {t.common.deliveryAndHelp}
          </Link>
          <span className="text-[#e9e0d5]">|</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 font-semibold text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#b91c32]" />
            <span>{t.common.adminPortal}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e9e0d5] bg-[#fff9f0] px-4 py-3 space-y-2 text-xs font-medium text-[#202d3a]">
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#e9e0d5]">
            <span className="text-[#737373] text-[11px] font-semibold">
              {locale === "mr" ? "भाषा निवडा:" : "Choose Language:"}
            </span>
            <LanguageSwitcher />
          </div>
          <form onSubmit={handleSearch} className="flex items-center bg-white border border-[#e9e0d5] rounded-[10px] px-3 py-2 mb-3">
            <Search className="h-4 w-4 text-[#737373] mr-2 shrink-0" />
            <input
              type="text"
              placeholder={t.common.searchMobilePlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-[#202d3a] focus:outline-hidden"
            />
          </form>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            {t.common.home}
          </Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-semibold text-[#b91c32]">
            {t.common.shopAll}
          </Link>
          <Link href="/price-list" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            {t.common.priceList}
          </Link>
          <Link href="/track" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            {t.common.trackOrder}
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            {t.common.deliveryAndHelp}
          </Link>
          <div className="pt-2 border-t border-[#e9e0d5] mt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-[8px] bg-[#f5eddf] hover:bg-[#e9e0d5] text-[#202d3a] font-semibold text-xs transition-colors border border-[#e9e0d5]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#b91c32]" />
                <span className="font-heading font-medium text-[13px] text-[#b91c32]">
                  {locale === "mr" ? "स्टॉल अ‍ॅडमिन पोर्टल" : "Stall Admin Portal"}
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-[#b91c32]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
