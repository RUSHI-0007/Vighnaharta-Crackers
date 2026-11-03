"use client";

import type { PaymentMethod, Settings } from "@/types";
import { QrCode, Banknote, Sparkles } from "lucide-react";
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

  // If only one method is enabled, display static badge/card
  if (upi_enabled && !cod_enabled) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-card/80 p-4 flex items-center gap-3">
        <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
          <QrCode className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">UPI QR Code Payment</p>
          <p className="text-xs text-muted-foreground">Scan QR code using any UPI app and upload receipt</p>
        </div>
      </div>
    );
  }

  if (!upi_enabled && cod_enabled) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-card/80 p-4 flex items-center gap-3">
        <div className="rounded-xl bg-accent/15 p-2.5 text-accent">
          <Banknote className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Cash on Delivery (COD)</p>
          <p className="text-xs text-muted-foreground">Pay in cash when your fireworks are delivered</p>
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
          "cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all",
          value === "upi_qr"
            ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-orange-500/10"
            : "border-border/80 bg-card/60 hover:bg-card hover:border-border"
        )}
      >
        <div
          className={cn(
            "rounded-xl p-2.5 shrink-0 transition-colors",
            value === "upi_qr" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" : "bg-secondary text-muted-foreground"
          )}
        >
          <QrCode className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">UPI QR Code</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />
              Fastest
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            Pay via GPay, PhonePe, or Paytm and upload screenshot
          </p>
        </div>
      </div>

      {/* COD Option */}
      <div
        onClick={() => onChange("cod")}
        className={cn(
          "cursor-pointer rounded-2xl border p-4 flex items-start gap-3 transition-all",
          value === "cod"
            ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-orange-500/10"
            : "border-border/80 bg-card/60 hover:bg-card hover:border-border"
        )}
      >
        <div
          className={cn(
            "rounded-xl p-2.5 shrink-0 transition-colors",
            value === "cod" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white" : "bg-secondary text-muted-foreground"
          )}
        >
          <Banknote className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-bold text-foreground">Cash on Delivery</span>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            Pay exact cash to delivery partner when fireworks arrive
          </p>
        </div>
      </div>
    </div>
  );
}
