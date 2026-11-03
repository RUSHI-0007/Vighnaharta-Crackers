"use client";

import { useState } from "react";
import type { Settings } from "@/types";
import { formatCurrency } from "@/lib/format";
import { ScreenshotUpload } from "@/components/checkout/screenshot-upload";
import { Copy, Check, ShieldCheck, QrCode } from "lucide-react";
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

  const upiPayUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    siteConfig.name.en
  )}&am=${total}&cu=INR`;
  const qrSource = settings.qr_image_path
    ? settings.qr_image_path
    : `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
        upiPayUrl
      )}`;

  return (
    <div className="rounded-2xl border border-[#e9e0d5] bg-white p-5 sm:p-7 shadow-2xs space-y-6">
      {/* Amount Due Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e9e0d5] pb-4 gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block">
            Step 3 of 4 · Payment
          </span>
          <h3 className="text-base sm:text-lg font-bold text-[#202d3a]">
            Scan UPI QR & Upload Proof
          </h3>
          <p className="text-xs text-[#737373] mt-0.5">
            Use Google Pay, PhonePe, Paytm, or any BHIM UPI app
          </p>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start bg-[#fbecef] p-3 sm:p-2.5 rounded-xl border border-[#b91c32]/20">
          <span className="text-[11px] text-[#737373] font-medium">Total Amount Due</span>
          <span className="text-lg sm:text-xl font-black text-[#b91c32] font-mono">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* QR Code Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="rounded-2xl bg-white p-3.5 border-2 border-[#e9e0d5] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSource}
              alt="UPI Payment QR Code"
              className="h-44 w-44 rounded-xl object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#737373] mt-2.5">
            <QrCode className="h-3.5 w-3.5 text-[#b91c32]" />
            <span>Scan with any UPI app</span>
          </div>
        </div>

        {/* Steps and UPI ID */}
        <div className="md:col-span-7 space-y-4">
          <div className="space-y-2.5 text-xs text-[#202d3a]">
            <div className="flex items-start gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f5eddf] text-[11px] font-bold text-[#b91c32]">
                1
              </span>
              <p className="pt-0.5 leading-relaxed text-[#737373]">
                Open your UPI app and scan the QR code, or copy the UPI ID below.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f5eddf] text-[11px] font-bold text-[#b91c32]">
                2
              </span>
              <p className="pt-0.5 leading-relaxed text-[#737373]">
                Pay the exact total of <strong className="text-[#202d3a] font-mono">{formatCurrency(total)}</strong> to Akshay Bendbhar.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f5eddf] text-[11px] font-bold text-[#b91c32]">
                3
              </span>
              <p className="pt-0.5 leading-relaxed text-[#737373]">
                Save the payment receipt screenshot and upload it below to verify your order.
              </p>
            </div>
          </div>

          {/* Copy UPI Box */}
          <div className="flex items-center gap-2 rounded-xl border border-[#e9e0d5] bg-[#fff9f0] px-4 py-2.5 justify-between">
            <div className="min-w-0">
              <span className="text-[10px] text-[#737373] uppercase font-bold block">
                Stall UPI ID
              </span>
              <span className="text-xs font-mono font-bold text-[#202d3a] truncate block">
                {upiId}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="flex items-center gap-1.5 text-xs text-[#b91c32] font-bold hover:underline shrink-0 px-2 py-1 rounded-lg hover:bg-[#b91c32]/10 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#737373]">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Verified Merchant: Akshay Bendbhar ({siteConfig.name.mr}, Ganegaon Khalsa)
            </span>
          </div>
        </div>
      </div>

      {/* Screenshot Upload Dropzone */}
      <div className="pt-3 border-t border-[#e9e0d5]">
        <ScreenshotUpload
          onFileSelect={onScreenshotSelect}
          error={screenshotError}
        />
      </div>
    </div>
  );
}
