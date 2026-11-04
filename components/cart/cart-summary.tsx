"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useTranslation } from "@/lib/translations";
import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import type { Settings } from "@/types";

interface CartSummaryProps {
  settings: Settings;
  onCheckoutClick?: () => void;
}

export function CartSummary({ settings, onCheckoutClick }: CartSummaryProps) {
  const { t, locale } = useTranslation();
  const items = useCartStore((s) => s.items);
  const { subtotal, discountTotal, total } = useMemo(
    () => computeCartTotals(items),
    [items]
  );

  if (items.length === 0) return null;

  const isBelowMin = total < settings.min_order_amount;
  const isOrdersDisabled = !settings.accepting_orders;

  return (
    <div className="space-y-3 pt-4 border-t border-[#e9e0d5]">
      {/* Subtotal & Discount breakdown */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between text-[#737373]">
          <span>{t.cart.subtotal}</span>
          <span className="font-mono text-[#202d3a]">{formatCurrency(subtotal)}</span>
        </div>
        {discountTotal > 0 && (
          <div className="flex justify-between text-[#b91c32] font-semibold">
            <span>{t.cart.discountTotal}</span>
            <span className="font-mono">-{formatCurrency(discountTotal)}</span>
          </div>
        )}
        <div className="flex justify-between items-baseline text-base font-bold text-[#202d3a] pt-2 border-t border-[#e9e0d5]">
          <span>{t.cart.total}</span>
          <span className="text-[#b91c32] font-mono text-xl font-black">
            ₹<NumberTicker value={total} />
          </span>
        </div>
      </div>

      {/* Warnings */}
      {isOrdersDisabled && (
        <div className="rounded-xl bg-[#fbecef] border border-[#b91c32]/30 p-3 text-xs text-[#b91c32] flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            {locale === "mr"
              ? "सध्या ऑनलाइन ऑर्डर्स बंद आहेत. कृपया थेट आमच्या स्टॉलशी संपर्क साधा!"
              : "We are temporarily not accepting new online orders. Please call us directly or visit our stall!"}
          </span>
        </div>
      )}

      {!isOrdersDisabled && isBelowMin && (
        <div className="rounded-xl bg-[#fff9f0] border border-[#e9b94f]/50 p-3 text-xs text-[#202d3a] flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#b91c32]" />
          <span>
            {locale === "mr"
              ? `किमान ऑर्डर रक्कम ${formatCurrency(settings.min_order_amount)} आहे. कृपया आणखी ${formatCurrency(settings.min_order_amount - total)} चे फटाके जोडा.`
              : `Minimum order amount is ${formatCurrency(settings.min_order_amount)}. Please add ${formatCurrency(settings.min_order_amount - total)} more of firecrackers.`}
          </span>
        </div>
      )}

      {/* Checkout Button */}
      {!isOrdersDisabled && !isBelowMin ? (
        <Link
          href="/checkout"
          onClick={onCheckoutClick}
          className="w-full min-h-[46px] rounded-xl bg-[#b91c32] hover:bg-[#981426] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
        >
          <span>{t.cart.checkout}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-full min-h-[46px] rounded-xl bg-[#f5eddf] text-[#737373] font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed"
        >
          {isOrdersDisabled
            ? (locale === "mr" ? "ऑर्डर्स तात्पुरत्या बंद" : "Orders Paused")
            : (locale === "mr" ? "किमान ऑर्डर मर्यादा आवश्यक" : "Reach Minimum Order Amount")}
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737373] pt-1">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        <span>{t.common.acceptedPayments}</span>
      </div>
    </div>
  );
}
