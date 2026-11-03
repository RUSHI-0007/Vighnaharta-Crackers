"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { useMounted } from "@/hooks/use-mounted";
import {
  ShoppingBag,
  Phone,
  Search,
  MapPin,
  PackageSearch,
  Menu,
  X,
  Sparkles,
  Flame,
} from "lucide-react";

export function SiteHeader() {
  const router = useRouter();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const { totalCount, total } = useMemo(() => computeCartTotals(items), [items]);

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
    <header className="w-full z-40 bg-white">
      {/* 1. Top Notice Announcement Strip (like Anil Crackers) */}
      <div className="bg-[#991b1b] text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-red-900/30">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span className="inline-block bg-amber-400 text-red-950 font-bold px-1.5 py-0.2 rounded text-[10px] uppercase tracking-wider">
              Local Delivery & Stall Pickup
            </span>
            <span className="text-amber-100">
              Available in Ganegaon Khalsa & Nearby Areas
            </span>
          </div>
          <div className="flex items-center gap-4 text-amber-100/90 text-[11px]">
            <span>
              Business Enquiry:{" "}
              <a href={`tel:${siteConfig.phone}`} className="font-bold text-white hover:underline">
                {siteConfig.phone}
              </a>
            </span>
            <span className="hidden md:inline">• Stall Timings: 8:00 AM – 10:00 PM</span>
          </div>
        </div>
      </div>

      {/* 2. Main Brand & Search Header (Warm Festive Amber Gold - like Anil Crackers) */}
      <div className="bg-[#f59e0b] px-4 py-3 sm:py-3.5 shadow-sm">
        <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Logo & Stall Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white shadow-md flex items-center justify-center border-2 border-amber-300 text-red-700">
              <Flame className="h-6 w-6 sm:h-7 sm:w-7 fill-red-600 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-black tracking-tight text-white drop-shadow-sm font-sans uppercase">
                  Vighnaharta
                </span>
                <span className="text-base sm:text-xl font-black tracking-tight text-red-900 font-sans uppercase">
                  Crackers
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-950 font-medium leading-none">
                {siteConfig.name.mr} • गणेगाव खालसा
              </p>
            </div>
          </Link>

          {/* Search Bar (Desktop / Tablet) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md items-center bg-white rounded-lg shadow-inner border border-amber-300 overflow-hidden"
          >
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 border-r border-slate-200 bg-slate-50 whitespace-nowrap">
              All Crackers
            </div>
            <input
              type="text"
              placeholder="Search firecrackers, sparklers, gift boxes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2.5 text-xs font-semibold hover:bg-red-800 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Right Action Icons (Location, Track, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location Pill */}
            <div className="hidden lg:flex items-center gap-1 bg-amber-400/60 text-amber-950 px-2.5 py-1.5 rounded-md text-xs font-medium border border-amber-400">
              <MapPin className="h-3.5 w-3.5 text-red-800" />
              <span>Ganegaon Khalsa</span>
            </div>

            {/* Track Link */}
            <Link
              href="/track"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-amber-950 hover:text-white px-2 py-1.5 rounded transition-colors"
            >
              <PackageSearch className="h-4 w-4 text-red-900" />
              <span>Track</span>
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-white text-slate-900 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-50 border border-amber-300 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
                {mounted && totalCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="font-semibold text-slate-800">Cart</span>
              {mounted && totalCount > 0 && (
                <span className="hidden sm:inline font-bold text-emerald-700 text-xs bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {formatCurrency(total)}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-amber-400/80 text-amber-950 hover:bg-amber-400"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-lg shadow-inner border border-amber-300 overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search firecrackers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-700 text-white px-3.5 py-2 text-xs font-semibold hover:bg-red-800"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Navigation Bar Strip (White background with Maroon Category button) */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between">
          
          <div className="flex items-center gap-1 sm:gap-6 py-1.5">
            {/* Maroon "Browse All Categories" button */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white text-xs font-bold px-3.5 py-2 rounded-md transition-colors shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Browse All Categories</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 font-semibold text-xs text-slate-700">
              <Link
                href="/"
                className="px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Buy Crackers
              </Link>
              <Link
                href="/price-list"
                className="px-3 py-2 rounded-md text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-bold border border-emerald-200 transition-colors flex items-center gap-1"
              >
                <span>Price List (Quick Shop)</span>
              </Link>
              <Link
                href="/track"
                className="px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Track Order
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Stall Support Call Helpline */}
          <div className="hidden lg:flex items-center gap-2 text-right">
            <div className="h-7 w-7 rounded-full bg-red-50 text-red-700 flex items-center justify-center border border-red-200">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-xs font-bold text-slate-900 hover:text-red-700 transition-colors block font-mono"
              >
                +91 {siteConfig.phone}
              </a>
              <span className="text-[10px] text-slate-500 block">
                Stall Support: 8am To 10pm
              </span>
            </div>
          </div>

        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-slate-50 px-4 py-3 space-y-2 text-xs font-semibold text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white transition-colors"
            >
              Buy Crackers (Full Catalog)
            </Link>
            <Link
              href="/price-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
            >
              Price List (Quick Wholesale Order)
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white transition-colors"
            >
              Contact Stall & Directions
            </Link>
            <div className="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
              Call Akshay: <a href={`tel:${siteConfig.phone}`} className="font-bold text-red-700">+91 {siteConfig.phone}</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
