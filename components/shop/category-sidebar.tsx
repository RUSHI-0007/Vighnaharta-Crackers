"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/types";
import { useTranslation } from "@/lib/translations";
import { SlidersHorizontal, MapPin } from "lucide-react";

interface CategorySidebarProps {
  categories: Category[];
  counts: Record<string, number>;
  totalCount: number;
}

export function CategorySidebar({
  categories,
  counts,
  totalCount,
}: CategorySidebarProps) {
  const searchParams = useSearchParams();
  const { t, locale } = useTranslation();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <aside className="w-full space-y-4">
      {/* Mobile Horizontal Pill Scroll Strip */}
      <div className="md:hidden bg-white rounded-[12px] border border-[#e9e0d5] p-2 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5">
          <Link
            href="/shop"
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
              currentCategory === "all"
                ? "bg-[#fbecef] text-[#b91c32] font-bold"
                : "text-[#202d3a] hover:bg-[#f5eddf]"
            }`}
          >
            <span>{t.common.shopAll} ({totalCount})</span>
          </Link>

          {categories.map((cat) => {
            const count = counts[cat.id] ?? counts[cat.slug] ?? 0;
            const isActive = currentCategory === cat.slug;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#fbecef] text-[#b91c32] font-bold"
                    : "text-[#202d3a] hover:bg-[#f5eddf]"
                }`}
              >
                <span>
                  {locale === "mr" ? cat.name_mr : cat.name_en} ({count})
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Sidebar Card */}
      <div className="hidden md:block bg-white rounded-[16px] border border-[#e9e0d5] p-5 shadow-[0px_6px_24px_0px_rgba(32,45,58,0.03)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e9e0d5]">
          <h3 className="font-heading font-medium text-[20px] text-[#202d3a]">
            {locale === "mr" ? "फटाके प्रकार निवडा" : "Refine your choice"}
          </h3>
          <SlidersHorizontal className="h-4 w-4 text-[#737373]" />
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#737373] px-3 pb-1">
            {locale === "mr" ? "वर्गवारी / प्रकार" : "Categories"}
          </p>

          <Link
            href="/shop"
            className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] transition-colors ${
              currentCategory === "all"
                ? "bg-[#fbecef] text-[#b91c32] font-semibold"
                : "text-[#202d3a] hover:bg-[#f5eddf]"
            }`}
          >
            <span>{t.common.shopAll}</span>
            <span className="text-[11px] font-mono text-[#737373]">({totalCount})</span>
          </Link>

          {categories.map((cat) => {
            const count = counts[cat.id] ?? counts[cat.slug] ?? 0;
            const isActive = currentCategory === cat.slug;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] transition-colors ${
                  isActive
                    ? "bg-[#fbecef] text-[#b91c32] font-semibold"
                    : "text-[#202d3a] hover:bg-[#f5eddf]"
                }`}
              >
                <span>{locale === "mr" ? cat.name_mr : cat.name_en}</span>
                <span className="text-[11px] font-mono text-[#737373]">({count})</span>
              </Link>
            );
          })}
        </div>

        {/* Local Delivery Help Card */}
        <div className="pt-3 border-t border-[#e9e0d5]">
          <div className="bg-[#f5eddf] rounded-[12px] p-4 space-y-1">
            <div className="flex items-center gap-2 text-[#202d3a]">
              <MapPin className="h-4 w-4 text-[#b91c32]" />
              <span className="font-semibold text-[13px]">
                {locale === "mr" ? "गणेगाव खालसा स्टॉल" : "Ganegaon Khalsa Stall"}
              </span>
            </div>
            <p className="text-[11px] text-[#737373] leading-relaxed">
              {locale === "mr"
                ? "थेट स्टॉलवरून खरेदी किंवा स्थानिक डिलिव्हरी उपलब्ध."
                : "Direct stall pickup and local delivery options in Ganegaon Khalsa."}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
