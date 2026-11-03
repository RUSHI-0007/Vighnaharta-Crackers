"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

export function CategoryTabs({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1 select-none">
      <Link
        href="/shop"
        className={cn(
          "inline-flex whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
          currentCategory === "all"
            ? "bg-primary text-white font-semibold"
            : "bg-secondary/60 text-slate-300 hover:text-white hover:bg-secondary"
        )}
      >
        All
      </Link>
      {categories.map((cat) => {
        const isActive = currentCategory === cat.slug;
        return (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className={cn(
              "inline-flex whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors",
              isActive
                ? "bg-primary text-white font-semibold"
                : "bg-secondary/60 text-slate-300 hover:text-white hover:bg-secondary"
            )}
          >
            {cat.name_en}
          </Link>
        );
      })}
    </div>
  );
}
