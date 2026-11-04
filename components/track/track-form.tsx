"use client";

import { useState, useTransition } from "react";
import { trackOrderAction } from "@/actions/track";
import { TrackResult } from "@/components/track/track-result";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/translations";
import { toast } from "sonner";
import { PackageSearch, Loader2, ArrowRight } from "lucide-react";
import type { OrderTrackingInfo } from "@/types";

export function TrackForm({ initialCode = "" }: { initialCode?: string }) {
  const { t, locale } = useTranslation();
  const [orderCode, setOrderCode] = useState(initialCode);
  const [phone, setPhone] = useState("");
  const [orderData, setOrderData] = useState<OrderTrackingInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderCode.trim()) {
      toast.error(
        locale === "mr"
          ? "कृपया तुमचा ऑर्डर कोड टाका (उदा. VFS-...)."
          : "Please enter your Order Code (e.g. VFS-...)."
      );
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error(
        locale === "mr"
          ? "कृपया नोंदणीकृत १०-अंकी मोबाईल नंबर टाका."
          : "Please enter your registered 10-digit phone number."
      );
      return;
    }

    const formData = new FormData();
    formData.append("orderCode", orderCode.trim());
    formData.append("phone", phone.trim());

    startTransition(async () => {
      const res = await trackOrderAction(null, formData);
      if (res.ok && res.data) {
        setOrderData(res.data);
        toast.success(locale === "mr" ? "ऑर्डर सापडली!" : "Order found!");
      } else {
        setOrderData(null);
        toast.error(
          res.error ||
            (locale === "mr"
              ? "ऑर्डर सापडली नाही. कोड आणि मोबाईल नंबर तपासा."
              : "Order not found. Please verify the code and phone number.")
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <div className="rounded-2xl border border-[#e9e0d5] bg-white p-5 sm:p-7 text-left shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="orderCode" className="text-xs font-semibold text-[#202d3a]">
                {locale === "mr" ? "ऑर्डर ट्रॅकिंग कोड *" : "Order Tracking Code *"}
              </Label>
              <Input
                id="orderCode"
                required
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder={t.track.codePlaceholder}
                className="font-mono uppercase bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-xs sm:text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold text-[#202d3a]">
                {locale === "mr" ? "नोंदणीकृत मोबाईल नंबर *" : "Registered Phone Number *"}
              </Label>
              <Input
                id="phone"
                required
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder={t.track.phonePlaceholder}
                className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-xs sm:text-sm font-mono text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full min-h-[46px] rounded-xl bg-[#b91c32] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#981426] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{locale === "mr" ? "शोधत आहे..." : "Locating order..."}</span>
              </>
            ) : (
              <>
                <PackageSearch className="h-4 w-4" />
                <span>{t.track.trackBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results Display */}
      {orderData && <TrackResult order={orderData} />}
    </div>
  );
}
