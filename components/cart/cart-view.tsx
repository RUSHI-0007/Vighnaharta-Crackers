"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { useMounted } from "@/hooks/use-mounted";
import { ArrowRight, ShoppingBag, AlertCircle, ShieldCheck } from "lucide-react";
import type { Settings } from "@/types";

export function CartView({ settings }: { settings: Settings }) {
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);

  const { subtotal, total, totalCount } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  if (!mounted) {
    return (
      <div className="py-20 text-center text-[#737373] text-sm font-medium">
        Loading festive bag...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4 bg-white rounded-[16px] border border-[#e9e0d5] p-8 shadow-sm">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fbecef] text-[#b91c32]">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h2 className="font-heading text-2xl font-semibold text-[#202d3a]">Your Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-[#737373]">
            You haven&apos;t added any festive crackers to your bag yet.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#b91c32] hover:bg-[#991b1b] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all shadow-sm"
          >
            <span>Explore All Crackers</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isBelowMin = total < settings.min_order_amount;
  const isOrdersDisabled = !settings.accepting_orders;

  return (
    <div className="space-y-8">
      {/* 1. Step Indicator */}
      <CheckoutSteps currentStep={1} />

      {/* 2. Heading & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e9e0d5]">
        <div>
          <h1 className="font-heading font-semibold text-[#202d3a] text-3xl sm:text-5xl leading-tight">
            Your festive bag.
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-1">
            {items.length} {items.length === 1 ? "choice" : "choices"} · {totalCount} {totalCount === 1 ? "pack" : "packs"} of celebration.
          </p>
        </div>

        <Link
          href="/shop"
          className="bg-white border border-[#e9e0d5] hover:bg-[#fff9f0] text-[#202d3a] font-semibold text-xs sm:text-sm h-11 px-5 rounded-[10px] inline-flex items-center gap-2 transition-colors self-start sm:self-auto shadow-2xs"
        >
          <span>Continue shopping</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 3. Items & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-white border border-[#e9e0d5] rounded-[16px] p-5 sm:p-6 shadow-[0px_6px_24px_0px_rgba(32,45,58,0.03)] space-y-5">
          <div className="hidden sm:flex text-[11px] font-bold text-[#737373] uppercase tracking-wider pb-3 border-b border-[#e9e0d5]">
            <span className="flex-1">PRODUCT</span>
            <span className="w-28 text-center">QUANTITY</span>
            <span className="w-24 text-right">TOTAL</span>
          </div>

          <div className="divide-y divide-[#e9e0d5]">
            {items.map((item) => (
              <div key={item.productId} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[10px] overflow-hidden bg-[#f5eddf] relative shrink-0">
                    <Image
                      src={item.image_path || "/images/product-placeholder.webp"}
                      alt={item.name_en}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="font-heading font-medium text-[#202d3a] text-base sm:text-lg leading-snug line-clamp-1">
                      {item.name_en}
                    </h3>
                    <p className="text-xs text-[#737373] line-clamp-1">
                      {item.name_mr} • {item.unit}
                    </p>
                    <p className="text-xs text-[#202d3a] font-medium">
                      {formatCurrency(item.unit_price)} / pack
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="text-[11px] text-[#b91c32] hover:text-[#991b1b] underline cursor-pointer pt-0.5 block"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e9e0d5]/60">
                  <div className="w-28 flex justify-center">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(qty) => setQty(item.productId, qty)}
                      size="sm"
                    />
                  </div>
                  <span className="font-heading font-semibold text-[#202d3a] text-lg sm:text-xl w-24 text-right">
                    {formatCurrency(item.unit_price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white border border-[#e9e0d5] rounded-[16px] p-6 shadow-[0px_6px_24px_0px_rgba(32,45,58,0.03)] space-y-4">
          <h2 className="font-heading font-semibold text-[#202d3a] text-xl pb-2 border-b border-[#e9e0d5]">
            Your festive bag
          </h2>

          <div className="space-y-2.5 text-xs text-[#202d3a]">
            <div className="flex justify-between">
              <span className="text-[#737373]">Subtotal ({totalCount} packs)</span>
              <span className="font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-3 border-t border-[#e9e0d5]">
              <span className="font-semibold text-sm">Total to pay</span>
              <span className="font-heading font-semibold text-2xl sm:text-3xl text-[#202d3a]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#737373] leading-relaxed">
            Wholesale prices include applicable taxes. Delivery terms and stall pickup details are confirmed prior to dispatch.
          </p>

          {isOrdersDisabled && (
            <div className="rounded-[10px] bg-[#fbecef] p-3 text-xs text-[#b91c32] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>We are currently not accepting new online orders. Please call our stall directly.</span>
            </div>
          )}

          {!isOrdersDisabled && isBelowMin && (
            <div className="rounded-[10px] bg-[#f5eddf] p-3 text-xs text-[#202d3a] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#b91c32]" />
              <span>
                Minimum order amount is {formatCurrency(settings.min_order_amount)}. Add {formatCurrency(settings.min_order_amount - total)} more to proceed.
              </span>
            </div>
          )}

          {!isOrdersDisabled && !isBelowMin ? (
            <Link
              href="/checkout"
              className="w-full h-12 rounded-[10px] bg-[#b91c32] hover:bg-[#991b1b] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
            >
              <span>Continue to delivery</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="w-full h-12 rounded-[10px] bg-gray-100 text-[#737373] font-semibold text-xs flex items-center justify-center cursor-not-allowed"
            >
              {isOrdersDisabled ? "Orders Paused" : "Minimum Order Amount Required"}
            </button>
          )}

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737373] pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>UPI or Cash on Delivery accepted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
