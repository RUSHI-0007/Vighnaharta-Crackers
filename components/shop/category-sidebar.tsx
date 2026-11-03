"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/types";

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
  const currentCategory = searchParams.get("category") || "all";

  return (
    <aside className="w-full">
      {/* Sidebar Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Categories</span>
          <span className="text-[10px] text-slate-400 font-normal">
            {categories.length} Types
          </span>
        </h3>

        {/* Categories List */}
        <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0 scrollbar-none">
          {/* All Categories Option */}
          <Link
            href="/shop"
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              currentCategory === "all"
                ? "bg-red-700 text-white font-bold shadow-2xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>All Categories</span>
            <span
              className={`text-[11px] font-mono ml-2 px-1.5 py-0.2 rounded-full ${
                currentCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {totalCount}
            </span>
          </Link>

          {/* Each Category */}
          {categories.map((cat) => {
            const count = counts[cat.id] ?? counts[cat.slug] ?? 0;
            const isActive = currentCategory === cat.slug;

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? "bg-red-700 text-white font-bold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex flex-col">
                  <span>{cat.name_en}</span>
                  <span
                    className={`text-[10px] ${
                      isActive ? "text-red-100" : "text-slate-400"
                    }`}
                  >
                    {cat.name_mr}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-mono ml-2 px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

