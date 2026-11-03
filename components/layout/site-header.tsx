"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { useMounted } from "@/hooks/use-mounted";
import {
  ShoppingBag,
  Search,
  MapPin,
  Menu,
  X,
} from "lucide-react";

export function SiteHeader() {
  const router = useRouter();
  const mounted = useMounted();
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
      {/* 1. Local Service Announcement Bar */}
      <div className="bg-[#b91c32] text-white text-[11px] h-[32px] px-4 flex items-center justify-center font-medium tracking-[0.4px]">
        <div className="container mx-auto flex items-center justify-center gap-2 text-center truncate">
          <span>{siteConfig.tagline.en}</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{siteConfig.address.en} (Local Delivery & Pickup)</span>
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
          className="hidden md:flex flex-1 max-w-[480px] h-[44px] items-center bg-white border border-[#e9e0d5] rounded-[10px] px-4 gap-3 shadow-2xs"
        >
          <Search className="h-[18px] w-[18px] text-[#737373] shrink-0" />
          <input
            type="text"
            placeholder="Find your festive favourites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] text-[#202d3a] placeholder-[#737373] focus:outline-hidden"
          />
        </form>

        {/* Shop Actions */}
        <div className="flex items-center gap-5 sm:gap-6 shrink-0">
          {/* Location Chip (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#b91c32] shrink-0" />
            <div className="flex flex-col leading-tight">
              <span className="text-[#737373] text-[10px] font-medium tracking-wide">
                LOCAL TO YOU
              </span>
              <span className="text-[#202d3a] text-[12px] font-medium truncate max-w-[130px]">
                {siteConfig.address.en.split(",").pop()?.trim() || "Ganegaon Khalsa"}
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
              Cart ({mounted ? totalCount : 0})
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Category Navigation Strip */}
      <div className="border-t border-[#e9e0d5] px-4 sm:px-8 lg:px-20 h-[48px] flex items-center justify-between text-[12px] overflow-x-auto scrollbar-none whitespace-nowrap bg-[#fff9f0]">
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/shop"
            className="font-semibold text-[#b91c32] hover:underline"
          >
            Shop all crackers
          </Link>
          <Link
            href="/shop?category=sparklers"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Sparklers
          </Link>
          <Link
            href="/shop?category=flower-pots"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Flower pots
          </Link>
          <Link
            href="/shop?category=ground-chakkars"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Ground chakkars
          </Link>
          <Link
            href="/shop?category=sky-shots"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Aerial fireworks
          </Link>
          <Link
            href="/shop?category=gift-boxes"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Festive boxes
          </Link>
          <Link
            href="/price-list"
            className="font-medium text-[#202d3a] hover:text-[#b91c32] transition-colors"
          >
            Price list
          </Link>
        </div>

        <Link
          href="/contact"
          className="font-semibold text-[#b91c32] hover:underline ml-6 hidden md:inline shrink-0"
        >
          Delivery & help ↗
        </Link>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e9e0d5] bg-[#fff9f0] px-4 py-3 space-y-2 text-xs font-medium text-[#202d3a]">
          <form onSubmit={handleSearch} className="flex items-center bg-white border border-[#e9e0d5] rounded-[10px] px-3 py-2 mb-3">
            <Search className="h-4 w-4 text-[#737373] mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search firecrackers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-[#202d3a] focus:outline-hidden"
            />
          </form>
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            Home
          </Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 font-semibold text-[#b91c32]">
            Shop all crackers
          </Link>
          <Link href="/price-list" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            Price list
          </Link>
          <Link href="/track" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            Track Order
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-[#b91c32]">
            Delivery & help
          </Link>
        </div>
      )}
    </header>
  );
}
