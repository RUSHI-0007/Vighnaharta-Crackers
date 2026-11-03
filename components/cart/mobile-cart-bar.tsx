"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { formatCurrency } from "@/lib/format";
import { computeCartTotals } from "@/lib/pricing";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function MobileCartBar() {
  const pathname = usePathname();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const { total, totalCount } = useMemo(() => computeCartTotals(items), [items]);

  if (
    !mounted ||
    totalCount === 0 ||
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/price-list"
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:hidden bg-white/95 border-t border-[#e9e0d5] backdrop-blur-md pb-safe shadow-[0_-4px_16px_rgba(32,45,58,0.08)]">
      <Link
        href="/cart"
        className="w-full min-h-[46px] rounded-[10px] bg-[#b91c32] hover:bg-[#991b1b] text-white font-semibold px-4 py-2.5 flex items-center justify-between active:scale-[0.99] transition-all shadow-sm"
      >
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4" />
          <span className="text-xs font-semibold tracking-wide">
            View Bag ({totalCount} {totalCount === 1 ? "item" : "items"})
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span>{formatCurrency(total)}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
}
