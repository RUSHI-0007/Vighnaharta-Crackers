"use client";

import { useState } from "react";
import type { Settings } from "@/types";
import { formatCurrency } from "@/lib/format";
import { BorderBeam } from "@/components/ui/border-beam";
import { ScreenshotUpload } from "@/components/checkout/screenshot-upload";
import { Copy, Check, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toast } from "sonner";

interface PaymentPanelProps {
  settings: Settings;
  total: number;
  onScreenshotSelect: (file: File | null) => void;
  screenshotError?: string;
}

export function PaymentPanel({
  settings,
  total,
  onScreenshotSelect,
  screenshotError,
}: PaymentPanelProps) {
  const [copied, setCopied] = useState(false);
  const upiId = settings.upi_id || "9561851896@ybl";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate dynamic UPI payment URI for QR code
  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(siteConfig.name.en)}&am=${total}&cu=INR`;
  const qrSource = settings.qr_image_path
    ? settings.qr_image_path
    : `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiPayUrl)}`;

  return (
    <div className="relative rounded-3xl border border-border/80 bg-[#0e153b] p-5 sm:p-6 overflow-hidden space-y-6 shadow-xl">
      <BorderBeam size={220} duration={10} colorFrom="#F97316" colorTo="#F59E0B" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            Scan UPI QR Code & Pay
          </h3>
          <p className="text-xs text-muted-foreground">
            Use PhonePe, Google Pay, Paytm, or any UPI app
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-muted-foreground block">Total Amount</span>
          <span className="font-heading text-xl font-bold text-amber-400">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* QR Code Presentation */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative rounded-3xl bg-white p-3.5 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSource}
            alt="Payment QR Code"
            className="h-48 w-48 rounded-xl object-contain"
          />
          <div className="absolute inset-x-0 bottom-1 flex justify-center">
            <span className="bg-slate-900/95 text-[9px] font-bold text-amber-400 px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5" />
              Scan & Pay {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* UPI ID with copy button */}
        <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-secondary/80 px-4 py-2.5 max-w-sm w-full justify-between">
          <div className="min-w-0">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block">Stall UPI ID</span>
            <span className="text-xs font-mono font-bold text-amber-300 truncate block">
              {upiId}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyUpi}
            className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline shrink-0 p-1.5 cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Direct merchant payment to Akshay Bendbhar ({siteConfig.name.mr})</span>
        </div>
      </div>

      {/* Required Screenshot Upload */}
      <div className="pt-2 border-t border-border/50">
        <ScreenshotUpload
          onFileSelect={onScreenshotSelect}
          error={screenshotError}
        />
      </div>
    </div>
  );
}
