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

  if (upi_enabled && !cod_enabled) {
    return (
      <div className="rounded-xl border border-[#e9e0d5] bg-[#fff9f0] p-4 flex items-center gap-3">
        <div className="rounded-lg bg-[#b91c32]/10 p-2 text-[#b91c32]">
          <QrCode className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#202d3a]">UPI QR Code</p>
          <p className="text-xs text-[#737373]">
            Scan QR using GPay, PhonePe, or Paytm and upload receipt
          </p>
        </div>
      </div>
    );
  }

  if (!upi_enabled && cod_enabled) {
    return (
      <div className="rounded-xl border border-[#e9e0d5] bg-[#fff9f0] p-4 flex items-center gap-3">
        <div className="rounded-lg bg-[#b91c32]/10 p-2 text-[#b91c32]">
          <Banknote className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-[#202d3a]">Cash on Delivery / Pickup</p>
          <p className="text-xs text-[#737373]">Pay cash when fireworks arrive or at stall</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* UPI Option */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange("upi_qr")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange("upi_qr");
          }
        }}
        className={cn(
          "cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-all",
          value === "upi_qr"
            ? "border-[#b91c32] bg-[#fbecef] shadow-2xs ring-1 ring-[#b91c32]"
            : "border-[#e9e0d5] bg-[#fff9f0] hover:bg-[#f5eddf]"
        )}
      >
        <div
          className={cn(
            "rounded-lg p-2 shrink-0 transition-colors",
            value === "upi_qr"
              ? "bg-[#b91c32] text-white"
              : "bg-[#f5eddf] text-[#737373]"
          )}
        >
          <QrCode className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-[#202d3a]">
              UPI QR Code
            </span>
            <span className="text-[10px] uppercase font-bold text-[#b91c32] bg-[#b91c32]/10 px-1.5 py-0.5 rounded">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-[#737373] mt-1 leading-snug">
            Pay via GPay, PhonePe, or Paytm and upload screenshot
          </p>
        </div>
      </div>

      {/* COD Option */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange("cod")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange("cod");
          }
        }}
        className={cn(
          "cursor-pointer rounded-xl border p-4 flex items-start gap-3 transition-all",
          value === "cod"
            ? "border-[#b91c32] bg-[#fbecef] shadow-2xs ring-1 ring-[#b91c32]"
            : "border-[#e9e0d5] bg-[#fff9f0] hover:bg-[#f5eddf]"
        )}
      >
        <div
          className={cn(
            "rounded-lg p-2 shrink-0 transition-colors",
            value === "cod"
              ? "bg-[#b91c32] text-white"
              : "bg-[#f5eddf] text-[#737373]"
          )}
        >
          <Banknote className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs sm:text-sm font-bold text-[#202d3a]">
            Cash on Delivery
          </span>
          <p className="text-[11px] text-[#737373] mt-1 leading-snug">
            Pay cash upon delivery or when collecting at stall
          </p>
        </div>
      </div>
    </div>
  );
}
