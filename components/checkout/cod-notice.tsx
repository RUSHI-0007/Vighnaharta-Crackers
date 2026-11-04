"use client";

import { Banknote, PhoneCall } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/translations";

export function CodNotice({ totalFormatted }: { totalFormatted: string }) {
  const { locale } = useTranslation();

  return (
    <div className="rounded-2xl border border-[#e9e0d5] bg-[#f5eddf]/50 p-5 text-xs text-[#202d3a] space-y-3">
      <div className="flex items-center gap-2 font-bold text-[#202d3a] text-sm">
        <Banknote className="h-4 w-4 text-[#b91c32]" />
        <span>{locale === "mr" ? "कॅश ऑन डिलिव्हरी माहिती" : "Cash on Delivery Notice"}</span>
      </div>
      <p className="leading-relaxed text-[#737373]">
        {locale === "mr" ? (
          <>
            कृपया डिलिव्हरी बॉयकडे किंवा स्टॉलवरून पार्सल घेताना योग्य रोख रक्कम{" "}
            <strong className="text-[#202d3a] font-mono font-bold">{totalFormatted}</strong> तयार ठेवा.
          </>
        ) : (
          <>
            Please keep the exact cash amount of{" "}
            <strong className="text-[#202d3a] font-mono font-bold">{totalFormatted}</strong> ready for the delivery partner or when collecting your package at the stall.
          </>
        )}
      </p>
      <div className="flex items-center gap-2 text-[#737373] pt-2 border-t border-[#e9e0d5]">
        <PhoneCall className="h-3.5 w-3.5 text-[#b91c32] shrink-0" />
        <span>
          {locale === "mr"
            ? `${siteConfig.owner.mr} ऑर्डर पाठवण्यापूर्वी तुमच्या फोनवर फोन करून माहितीची खात्री करतील.`
            : `${siteConfig.owner.en} will call your phone number to confirm your order details before dispatch.`}
        </span>
      </div>
    </div>
  );
}
