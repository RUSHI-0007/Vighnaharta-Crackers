"use client";

import { useState } from "react";
import type { Settings } from "@/types";
import { formatCurrency } from "@/lib/format";
import { ScreenshotUpload } from "@/components/checkout/screenshot-upload";
import { Copy, Check, ShieldCheck } from "lucide-react";
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Scan UPI QR Code to Pay
          </h3>
          <p className="text-xs text-slate-500">
            Google Pay, PhonePe, Paytm, or any UPI app
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block font-medium">Amount to Pay</span>
          <span className="text-base font-black text-emerald-700 font-mono">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* QR Code Presentation */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="rounded-xl bg-white p-3 border-2 border-slate-200 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrSource}
            alt="Payment QR Code"
            className="h-44 w-44 rounded object-contain"
          />
        </div>

        {/* UPI ID with copy button */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 max-w-sm w-full justify-between">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Stall UPI ID</span>
            <span className="text-xs font-mono font-bold text-slate-900 truncate block">
              {upiId}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyUpi}
            className="flex items-center gap-1 text-xs text-red-700 font-bold hover:underline shrink-0 p-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Pay to Akshay Bendbhar ({siteConfig.name.mr})</span>
        </div>
      </div>

      {/* Required Screenshot Upload */}
      <div className="pt-2 border-t border-slate-100">
        <ScreenshotUpload
          onFileSelect={onScreenshotSelect}
          error={screenshotError}
        />
      </div>
    </div>
  );
}
