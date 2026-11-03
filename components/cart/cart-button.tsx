"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useMounted } from "@/hooks/use-mounted";
import { computeCartTotals } from "@/lib/pricing";

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const { totalCount } = useMemo(() => computeCartTotals(items), [items]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View Cart"
      className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-border text-foreground hover:bg-secondary active:scale-95 transition-all cursor-pointer"
    >
      <ShoppingBag className="h-5 w-5 text-primary" />
      {mounted && totalCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground shadow">
          {totalCount}
        </span>
      )}
    </button>
  );
}
