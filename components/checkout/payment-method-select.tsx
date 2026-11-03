"use client";

import type { PaymentMethod, Settings } from "@/types";
import { QrCode, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodSelectProps {
  settings: Settings;
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export function PaymentMethodSelect({
  settings,
  value,
  onChange,
}: PaymentMethodSelectProps) {
  const { upi_enabled, cod_enabled } = settings;

  // If only one method is enabled, display static card
  if (upi_enabled && !cod_enabled) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3">
        <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
          <QrCode className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">UPI QR Code</p>
          <p className="text-xs text-slate-500">Scan QR using GPay, PhonePe, or Paytm and upload receipt</p>
        </div>
      </div>
    );
  }

  if (!upi_enabled && cod_enabled) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3">
        <div className="rounded-lg bg-amber-100 p-2 text-amber-800">
          <Banknote className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">Cash on Delivery / Pickup</p>
          <p className="text-xs text-slate-500">Pay cash when fireworks arrive or at stall</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* UPI Option */}
      <div
        onClick={() => onChange("upi_qr")}
        className={cn(
          "cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-colors",
          value === "upi_qr"
            ? "border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500"
            : "border-slate-200 bg-slate-50/70 hover:bg-slate-100"
        )}
      >
        <div
          className={cn(
            "rounded-lg p-2 shrink-0 transition-colors",
            value === "upi_qr" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
          )}
        >
          <QrCode className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-900">UPI QR Code</span>
            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
              Direct
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            Pay via GPay, PhonePe, or Paytm and upload screenshot
          </p>
        </div>
      </div>

      {/* COD Option */}
      <div
        onClick={() => onChange("cod")}
        className={cn(
          "cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-colors",
          value === "cod"
            ? "border-emerald-500 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500"
            : "border-slate-200 bg-slate-50/70 hover:bg-slate-100"
        )}
      >
        <div
          className={cn(
            "rounded-lg p-2 shrink-0 transition-colors",
            value === "cod" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"
          )}
        >
          <Banknote className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs sm:text-sm font-bold text-slate-900">Cash on Delivery</span>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            Pay cash upon delivery or when collecting at stall
          </p>
        </div>
      </div>
    </div>
  );
}
