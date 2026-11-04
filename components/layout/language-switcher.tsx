"use client";

import { useTranslation } from "@/lib/translations";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "minimal";
}

export function LanguageSwitcher({ className = "", variant = "pill" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();

  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center gap-1 text-[11px] font-semibold ${className}`}>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            locale === "en"
              ? "bg-white text-[#b91c32] font-bold shadow-2xs"
              : "text-white/80 hover:text-white"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="text-white/40">|</span>
        <button
          type="button"
          onClick={() => setLocale("mr")}
          className={`px-1.5 py-0.5 rounded transition-colors ${
            locale === "mr"
              ? "bg-white text-[#b91c32] font-bold shadow-2xs"
              : "text-white/80 hover:text-white"
          }`}
          aria-label="मराठी मध्ये बदला"
        >
          मराठी (MR)
        </button>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-[8px] bg-[#f5eddf] border border-[#e9e0d5] text-xs font-semibold select-none shadow-2xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <div className="flex items-center pl-1.5 pr-1 text-[#737373]">
        <Globe className="h-3.5 w-3.5 text-[#b91c32]" />
      </div>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded-[6px] transition-all text-[11px] font-bold ${
          locale === "en"
            ? "bg-[#b91c32] text-white shadow-xs"
            : "text-[#737373] hover:text-[#202d3a]"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span className="text-[#e9e0d5] px-0.5">|</span>
      <button
        type="button"
        onClick={() => setLocale("mr")}
        className={`px-2 py-1 rounded-[6px] transition-all text-[11px] font-bold ${
          locale === "mr"
            ? "bg-[#b91c32] text-white shadow-xs"
            : "text-[#737373] hover:text-[#202d3a]"
        }`}
        aria-pressed={locale === "mr"}
      >
        मराठी (MR)
      </button>
    </div>
  );
}

