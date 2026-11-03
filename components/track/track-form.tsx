"use client";

import { useState, useTransition } from "react";
import { trackOrderAction } from "@/actions/track";
import { TrackResult } from "@/components/track/track-result";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
      toast.error("कृपया ऑर्डर कोड टाका.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error("कृपया अचूक १० अंकी मोबाईल नंबर टाका.");
      return;
    }

    const formData = new FormData();
    formData.append("orderCode", orderCode.trim());
    formData.append("phone", phone.trim());

    startTransition(async () => {
      const res = await trackOrderAction(null, formData);
      if (res.ok && res.data) {
        setOrderData(res.data);
        toast.success("ऑर्डर सापडली!");
      } else {
        setOrderData(null);
        toast.error(res.error || "ऑर्डर सापडली नाही.");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl text-left">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="orderCode">ऑर्डर क्रमांक (Order Code) *</Label>
              <Input
                id="orderCode"
                required
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="उदा. VFS-261103-XXXX"
                className="font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">नोंदणीकृत फोन नंबर (Phone) *</Label>
              <Input
                id="phone"
                required
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="१० अंकी मोबाईल नंबर"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 text-sm font-bold rounded-xl cursor-pointer"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>ऑर्डर शोधत आहे...</span>
              </>
            ) : (
              <>
                <PackageSearch className="h-4 w-4 mr-2" />
                <span>स्थिती तपासा (Check Status)</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Result Display */}
      {orderData && <TrackResult order={orderData} />}
    </div>
  );
}

