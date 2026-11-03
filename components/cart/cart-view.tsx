"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useMounted } from "@/hooks/use-mounted";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag, AlertCircle, ShieldCheck, Flame } from "lucide-react";
import type { Settings } from "@/types";

export function CartView({ settings }: { settings: Settings }) {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const { subtotal, discountTotal, total, totalCount } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  if (!mounted) {
    return (
      <div className="py-20 text-center text-slate-500 text-sm">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            You haven&apos;t added any Diwali firecrackers to your cart yet.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-red-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Crackers Catalog</span>
          </Link>
          <Link
            href="/price-list"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition-all"
          >
            <span>Quick Shop Table</span>
          </Link>
        </div>
      </div>
    );
  }

  const isBelowMin = total < settings.min_order_amount;
  const isOrdersDisabled = !settings.accepting_orders;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Column: Cart Items List */}
      <div className="lg:col-span-8 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-2xs divide-y divide-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Items in Your Order ({totalCount})</span>
            <button
              type="button"
              onClick={clearCart}
              className="text-slate-400 hover:text-red-600 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Cart</span>
            </button>
          </div>

          {items.map((item) => (
            <div key={item.productId} className="p-4 sm:p-5 flex items-center gap-4">
              
              {/* Thumbnail */}
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                {item.image_path ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_path}
                    alt={item.name_en}
                    className="h-full w-full object-contain p-1"
                  />
                ) : (
                  <Flame className="h-6 w-6 text-amber-500" />
                )}
              </div>

              {/* Title & Price */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {item.name_en}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {item.name_mr}
                </p>
                <p className="text-xs font-bold text-emerald-700 mt-1">
                  {formatCurrency(item.unit_price)}{" "}
                  <span className="text-[11px] text-slate-400 font-normal">/ {item.unit}</span>
                </p>
              </div>

              {/* Quantity and Line Total */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-sm font-black text-slate-900 font-mono">
                  {formatCurrency(item.unit_price * item.quantity)}
                </span>
                <div className="flex items-center gap-2">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(qty) => setQty(item.productId, qty)}
                    size="sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Action strip */}
        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Continue Shopping</span>
          </Link>

          <Link
            href="/price-list"
            className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Open Quick Shop Table &rarr;</span>
          </Link>
        </div>
      </div>

      {/* Right Column: Order Summary Card */}
      <div className="lg:col-span-4 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({totalCount})</span>
              <span className="font-mono font-medium">{formatCurrency(subtotal)}</span>
            </div>
            {discountTotal > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Wholesale Savings</span>
                <span className="font-mono">-{formatCurrency(discountTotal)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2.5 border-t border-slate-200 text-sm font-bold text-slate-900">
              <span>Total Payable</span>
              <span className="text-lg font-black text-emerald-700 font-mono">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Warnings */}
          {isOrdersDisabled && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>We are currently not accepting new online orders. Please call stall directly.</span>
            </div>
          )}

          {!isOrdersDisabled && isBelowMin && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
              <span>
                Minimum order amount is {formatCurrency(settings.min_order_amount)}. Add {formatCurrency(settings.min_order_amount - total)} more to proceed.
              </span>
            </div>
          )}

          {/* Checkout Button */}
          {!isOrdersDisabled && !isBelowMin ? (
            <Link
              href="/checkout"
              className="w-full min-h-[44px] rounded-xl bg-emerald-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="w-full min-h-[44px] rounded-xl bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center cursor-not-allowed"
            >
              {isOrdersDisabled ? "Orders Paused" : "Minimum Order Amount Required"}
            </button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Pay via UPI (GPay/PhonePe) or Cash on Delivery</span>
          </div>
        </div>
      </div>

    </div>
  );
}
