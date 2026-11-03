"use client";

import { useState, useTransition } from "react";
import { trackOrderAction } from "@/actions/track";
import { TrackResult } from "@/components/track/track-result";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PackageSearch, Loader2, ArrowRight } from "lucide-react";
import type { OrderTrackingInfo } from "@/types";

export function TrackForm({ initialCode = "" }: { initialCode?: string }) {
  const [orderCode, setOrderCode] = useState(initialCode);
  const [phone, setPhone] = useState("");
  const [orderData, setOrderData] = useState<OrderTrackingInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderCode.trim()) {
      toast.error("Please enter your Order Code (e.g. VFS-...).");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error("Please enter your registered 10-digit phone number.");
      return;
    }

    const formData = new FormData();
    formData.append("orderCode", orderCode.trim());
    formData.append("phone", phone.trim());

    startTransition(async () => {
      const res = await trackOrderAction(null, formData);
      if (res.ok && res.data) {
        setOrderData(res.data);
        toast.success("Order found!");
      } else {
        setOrderData(null);
        toast.error(res.error || "Order not found. Please verify the code and phone number.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 text-left shadow-2xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="orderCode" className="text-xs font-semibold text-slate-700">Order Tracking Code *</Label>
              <Input
                id="orderCode"
                required
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="e.g. VFS-261103-XXXX"
                className="font-mono uppercase bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">Registered Phone Number *</Label>
              <Input
                id="phone"
                required
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="10-digit mobile number"
                className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm font-mono text-slate-900 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full min-h-[44px] rounded-xl bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-red-800 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Locating order...</span>
              </>
            ) : (
              <>
                <PackageSearch className="h-4 w-4" />
                <span>Check Status</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Result Display */}
      {orderData && <TrackResult order={orderData} />}
    </div>
  );
}
