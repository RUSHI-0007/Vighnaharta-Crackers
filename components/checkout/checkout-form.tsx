"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { computeCartTotals } from "@/lib/pricing";
import { useMounted } from "@/hooks/use-mounted";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LocationButton } from "@/components/checkout/location-button";
import { PaymentMethodSelect } from "@/components/checkout/payment-method-select";
import { PaymentPanel } from "@/components/checkout/payment-panel";
import { CodNotice } from "@/components/checkout/cod-notice";
import { formatCurrency } from "@/lib/format";
import { toast } from "sonner";
import { Loader2, ArrowRight, ShieldCheck, User, CreditCard } from "lucide-react";
import type { PaymentMethod, Settings } from "@/types";

export function CheckoutForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const mounted = useMounted();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { total } = useMemo(() => computeCartTotals(items), [items]);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    settings.upi_enabled ? "upi_qr" : "cod"
  );
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotError, setScreenshotError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-slate-200 p-8 bg-white space-y-4 shadow-2xs">
        <h3 className="text-lg font-bold text-slate-900">
          Your Cart is Empty
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Please select fireworks from the catalog before proceeding to checkout.
        </p>
        <Button onClick={() => router.push("/shop")} className="bg-red-700 text-white font-bold rounded-lg px-5 py-2 hover:bg-red-800">
          Browse Catalog &rarr;
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      toast.error("Invalid submission");
      return;
    }

    // Validation
    if (!name.trim() || name.trim().length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error("Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address to receive your order receipt.");
      return;
    }
    if (!address.trim() || address.trim().length < 5) {
      toast.error("Please enter your detailed delivery address.");
      return;
    }

    if (paymentMethod === "upi_qr" && !screenshot) {
      setScreenshotError("Please upload your UPI payment screenshot to complete the order.");
      toast.error("UPI payment screenshot is required!");
      return;
    }

    setScreenshotError(undefined);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("email", email.trim());
      formData.append("address", address.trim());
      if (landmark.trim()) formData.append("landmark", landmark.trim());
      if (notes.trim()) formData.append("notes", notes.trim());
      if (coords) {
        formData.append("lat", String(coords.lat));
        formData.append("lng", String(coords.lng));
      }
      formData.append("payment_method", paymentMethod);
      formData.append(
        "items",
        JSON.stringify(
          items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
        )
      );
      if (paymentMethod === "upi_qr" && screenshot) {
        formData.append("screenshot", screenshot);
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Could not place order. Please try again or call us.");
      }

      clearCart();
      toast.success("Order placed successfully! Receipt sent to your email.");
      router.push(
        `/order-success?code=${result.data.orderCode}&email=${encodeURIComponent(
          email.trim()
        )}`
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A technical error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        name="hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Customer Delivery Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-700">
            <User className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              1. Delivery Details
            </h3>
            <p className="text-xs text-slate-500">
              Where should we deliver your firecrackers in Ganegaon or nearby?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="customer_name" className="text-xs font-semibold text-slate-700">Full Name *</Label>
            <Input
              id="customer_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Shinde"
              className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">Phone Number (10 Digits) *</Label>
            <Input
              id="phone"
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 9876543210"
              className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm font-mono text-slate-900 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
            Email Address (for Order Receipt & Confirmation) *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rahul@gmail.com"
            className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="address" className="text-xs font-semibold text-slate-700">Delivery Address *</Label>
            <LocationButton
              onLocationFound={setCoords}
              hasLocation={coords !== null}
            />
          </div>
          <Textarea
            id="address"
            required
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House/flat number, road, area, village..."
            className="bg-slate-50 border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="landmark" className="text-xs font-semibold text-slate-700">Nearby Landmark (Optional)</Label>
            <Input
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Grampanchayat / Temple"
              className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs font-semibold text-slate-700">Special Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please deliver by evening"
              className="bg-slate-50 border-slate-200 h-10 rounded-lg text-xs sm:text-sm text-slate-900 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              2. Payment Method
            </h3>
            <p className="text-xs text-slate-500">
              Select Instant UPI QR Code or Cash on Delivery / Stall Pickup
            </p>
          </div>
        </div>

        <PaymentMethodSelect
          settings={settings}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>

      {/* Payment Panel or COD Notice */}
      {paymentMethod === "upi_qr" ? (
        <PaymentPanel
          settings={settings}
          total={total}
          onScreenshotSelect={setScreenshot}
          screenshotError={screenshotError}
        />
      ) : (
        <CodNotice totalFormatted={formatCurrency(total)} />
      )}

      {/* Submit Button */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full min-h-[48px] rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Placing Order...</span>
            </>
          ) : (
            <>
              <span>Place Order ({formatCurrency(total)})</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Order received directly by Akshay Bendbhar at Vighnaharta Stall</span>
        </div>
      </div>
    </form>
  );
}
