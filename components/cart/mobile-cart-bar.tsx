"use client";

import { useMemo } from "react";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { formatCurrency } from "@/lib/format";
import { computeCartTotals } from "@/lib/pricing";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function MobileCartBar({ onOpenCart }: { onOpenCart: () => void }) {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const { total, totalCount } = useMemo(() => computeCartTotals(items), [items]);

  if (!mounted || totalCount === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 sm:hidden bg-gradient-to-t from-[#080c24] via-[#080c24]/95 to-transparent pb-safe">
      <button
        type="button"
        onClick={onOpenCart}
        className="w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold px-4 py-3 flex items-center justify-between shadow-2xl shadow-orange-500/30 active:scale-[0.99] transition-all cursor-pointer border border-white/15"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-xs font-bold text-white shadow-inner">
            {totalCount}
          </div>
          <span className="text-sm font-bold flex items-center gap-1.5">
            <ShoppingBag className="h-4 w-4" />
            <span>View Cart</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-heading text-base font-bold text-white">
            {formatCurrency(total)}
          </span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>
    </div>
  );
}
