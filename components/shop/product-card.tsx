"use client";

import { useMemo } from "react";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/format";
import { calculateEffectivePrice } from "@/lib/pricing";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const setQty = useCartStore((state) => state.setQty);

  const cartItem = useMemo(
    () => items.find((i) => i.productId === product.id),
    [items, product.id]
  );

  const effectivePrice = calculateEffectivePrice(product.price, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  const handleAdd = () => {
    if (!product.in_stock) return;
    addItem(product, 1);
    toast.success(`${product.name_en} added`, {
      description: `${formatCurrency(effectivePrice)} • ${product.unit}`,
    });
  };

  const handleIncrement = () => {
    if (!cartItem) {
      handleAdd();
    } else {
      setQty(product.id, cartItem.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 0) {
      setQty(product.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group">
      
      {/* Top Discount / Hot Badge */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1">
        {hasDiscount && (
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
            {product.discount_percent}% OFF
          </span>
        )}
      </div>

      <div>
        {/* Product Image Box */}
        <div className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100/70 transition-colors">
          {product.image_path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_path}
              alt={product.name_en}
              className="h-full w-full object-contain p-2"
              loading="lazy"
            />
          ) : (
            <div className="text-center p-3">
              <span className="text-4xl block mb-1">🎇</span>
              <span className="text-[10px] text-slate-400 font-medium">
                {product.unit}
              </span>
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xs flex items-center justify-center">
              <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Meta */}
        <div className="space-y-1 mb-2">
          {categoryName && (
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
              {categoryName}
            </span>
          )}
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-red-700 transition-colors">
            {product.name_en}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-1">
            {product.name_mr}
          </p>
          <p className="text-[10px] text-slate-400 font-medium">
            Unit: {product.unit}
          </p>
        </div>
      </div>

      {/* Pricing and Action Button */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-emerald-700">
              {formatCurrency(effectivePrice)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Add Button or Quantity Stepper */}
        {product.in_stock ? (
          cartItem && cartItem.quantity > 0 ? (
            <div className="flex items-center rounded-lg border border-emerald-500 bg-emerald-50 overflow-hidden text-emerald-900 font-bold text-xs shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-2 py-1.5 hover:bg-emerald-200/80 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-2 min-w-[20px] text-center font-mono">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-2 py-1.5 hover:bg-emerald-200/80 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 font-bold text-xs px-3 py-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <ShoppingCart className="h-3 w-3" />
              <span>Add</span>
            </button>
          )
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">
            Unavailable
          </span>
        )}
      </div>

    </div>
  );
}
