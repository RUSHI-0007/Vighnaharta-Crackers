import Link from "next/link";
import type { Category } from "@/types";
import { ArrowRight, Gift, Rocket, Flame, Star } from "lucide-react";

const categoryStyles: Record<
  string,
  { icon: string; bg: string; border: string; badge: string }
> = {
  sparklers: {
    icon: "✨",
    bg: "bg-amber-50 hover:bg-amber-100/80",
    border: "border-amber-200",
    badge: "text-amber-800",
  },
  "flower-pots": {
    icon: "🌋",
    bg: "bg-rose-50 hover:bg-rose-100/80",
    border: "border-rose-200",
    badge: "text-rose-800",
  },
  "ground-chakkars": {
    icon: "🌀",
    bg: "bg-emerald-50 hover:bg-emerald-100/80",
    border: "border-emerald-200",
    badge: "text-emerald-800",
  },
  rockets: {
    icon: "🚀",
    bg: "bg-sky-50 hover:bg-sky-100/80",
    border: "border-sky-200",
    badge: "text-sky-800",
  },
  "sound-crackers": {
    icon: "💥",
    bg: "bg-red-50 hover:bg-red-100/80",
    border: "border-red-200",
    badge: "text-red-800",
  },
  "sky-shots": {
    icon: "🎆",
    bg: "bg-purple-50 hover:bg-purple-100/80",
    border: "border-purple-200",
    badge: "text-purple-800",
  },
  "gift-boxes": {
    icon: "🎁",
    bg: "bg-orange-50 hover:bg-orange-100/80",
    border: "border-orange-200",
    badge: "text-orange-800",
  },
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Section Title (like Anil Crackers Screenshot 2) */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
            <Star className="h-3.5 w-3.5 fill-red-600" />
            <span>Diwali 2026 Collection</span>
            <Star className="h-3.5 w-3.5 fill-red-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Buy Crackers Online
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
            Quality Fireworks & Diwali Crackers at Best Wholesale Prices direct from Sivakasi
          </p>
        </div>

        {/* Category Header Bar */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <Flame className="h-4 w-4 text-red-600" />
            <span>Explore Fireworks & Crackers Categories</span>
          </h3>
          <Link
            href="/shop"
            className="text-xs font-bold text-red-700 hover:text-red-800 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Category Cards (Horizontal scrolling on mobile / Grid on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {categories.map((cat) => {
            const style = categoryStyles[cat.slug] || {
              icon: "🎇",
              bg: "bg-slate-50 hover:bg-slate-100",
              border: "border-slate-200",
              badge: "text-slate-800",
            };

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`group flex flex-col items-center text-center p-3.5 rounded-xl border ${style.border} ${style.bg} transition-all hover:shadow-sm cursor-pointer`}
              >
                <div className="h-12 w-12 rounded-full bg-white shadow-xs flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {style.icon}
                </div>
                <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-700 transition-colors leading-snug line-clamp-1">
                  {cat.name_en}
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {cat.name_mr}
                </p>
                <span className="text-[9px] font-semibold text-emerald-700 bg-white/80 px-1.5 py-0.5 rounded-full mt-2 border border-slate-200/60">
                  Wholesale
                </span>
              </Link>
            );
          })}
        </div>

        {/* 3 Promo Banners (Directly matching Anil Crackers Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Promo 1: Kids Special */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[170px]">
            <div>
              <span className="inline-block bg-amber-400 text-purple-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider mb-2">
                Kids Safe
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                Kids Special
              </h3>
              <p className="text-xs text-purple-100/90 mt-1">
                Sparklers, Flower Pots, Ground Chakkars & Color Pencils with low smoke & high safety.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/shop?category=sparklers"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-950 bg-white hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors"
              >
                <span>Shop Kids Items</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo 2: Family Gift Boxes */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[170px]">
            <div>
              <span className="inline-block bg-white text-red-900 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider mb-2">
                Best Value
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                Diwali Gift Boxes
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                25 to 45 items family combo boxes. Complete assortment for home celebrations and festive gifts.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/shop?category=gift-boxes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-950 bg-white hover:bg-amber-100 px-3 py-1.5 rounded-md transition-colors"
              >
                <Gift className="h-3.5 w-3.5 text-red-700" />
                <span>Shop Gift Boxes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Promo 3: Sky Shots & Aerial */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-sky-700 to-cyan-800 text-white p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[170px]">
            <div>
              <span className="inline-block bg-emerald-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider mb-2">
                Night Sky
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                Aerial Sky Shots
              </h3>
              <p className="text-xs text-sky-100 mt-1">
                7 Shots, 12 Shots & single pipe color shells for vibrant night sky celebrations.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/shop?category=sky-shots"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-white hover:bg-sky-100 px-3 py-1.5 rounded-md transition-colors"
              >
                <Rocket className="h-3.5 w-3.5 text-blue-700" />
                <span>Shop Sky Shots</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
