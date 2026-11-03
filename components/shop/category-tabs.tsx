"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function CategoryTabs({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-2 pt-1 select-none">
      <Link
        href="/shop"
        className={cn(
          "inline-flex whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs font-bold transition-all min-h-[40px] items-center gap-1.5",
          currentCategory === "all"
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20"
            : "bg-card/80 border border-border/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        All Fireworks
      </Link>
      {categories.map((cat) => {
        const isActive = currentCategory === cat.slug;
        return (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className={cn(
              "inline-flex whitespace-nowrap rounded-2xl px-4 py-2.5 text-xs font-bold transition-all min-h-[40px] items-center gap-1.5",
              isActive
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-card/80 border border-border/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <span>{cat.name_en}</span>
            <span className="text-[10px] opacity-75 font-normal">({cat.name_mr})</span>
          </Link>
        );
      })}
    </div>
  );
}
