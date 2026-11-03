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
import { Loader2, ArrowRight, ShieldCheck, User, MapPin, CreditCard, Sparkles } from "lucide-react";
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
      <div className="text-center py-16 rounded-3xl border border-dashed border-border/80 p-8 bg-card/40 space-y-4">
        <span className="text-6xl block select-none">🛒</span>
        <h3 className="font-heading text-xl font-bold text-foreground">
          Your Cart is Empty
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
          Please add firecrackers to your cart from our shop before checking out.
        </p>
        <Button onClick={() => router.push("/shop")} className="bg-primary text-white font-bold rounded-2xl px-6 py-2.5">
          Browse Firecrackers &rarr;
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
      toast.success("Order placed successfully! Confirmation email sent.");
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
      <div className="rounded-3xl border border-border/80 bg-[#0e153b] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-foreground">
              1. Delivery & Contact Details
            </h3>
            <p className="text-xs text-muted-foreground">
              Enter where you would like your firecrackers delivered
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="customer_name" className="text-xs font-semibold">Full Name *</Label>
            <Input
              id="customer_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Shinde"
              className="bg-card/80 border-border/80 h-11 rounded-2xl text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">Phone Number (10 Digits) *</Label>
            <Input
              id="phone"
              type="tel"
              required
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 9876543210"
              className="bg-card/80 border-border/80 h-11 rounded-2xl text-xs sm:text-sm font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold">
            Email Address (for Order Receipt) *
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rahul@gmail.com"
            className="bg-card/80 border-border/80 h-11 rounded-2xl text-xs sm:text-sm"
          />
          <p className="text-[11px] text-muted-foreground">
            We will email your itemized bill and live tracking link here.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="address" className="text-xs font-semibold">Delivery Address *</Label>
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
            placeholder="House/Flat number, building or society name, street, village/town..."
            className="bg-card/80 border-border/80 rounded-2xl text-xs sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="landmark" className="text-xs font-semibold">Nearby Landmark (Optional)</Label>
            <Input
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Ganpati Temple, Opp School"
              className="bg-card/80 border-border/80 h-11 rounded-2xl text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-xs font-semibold">Order Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please deliver after 5 PM"
              className="bg-card/80 border-border/80 h-11 rounded-2xl text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="rounded-3xl border border-border/80 bg-[#0e153b] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-border/50 pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <CreditCard className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-foreground">
              2. Choose Payment Method
            </h3>
            <p className="text-xs text-muted-foreground">
              Select your preferred payment option
            </p>
          </div>
        </div>

        <PaymentMethodSelect
          settings={settings}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>

      {/* Payment Details Panel (UPI QR or COD Notice) */}
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
          className="w-full min-h-[52px] rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all shadow-2xl shadow-orange-500/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing Your Order...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 fill-current" />
              <span>Confirm & Place Order ({formatCurrency(total)})</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Your order is directly received by Akshay Bendbhar at Vighnaharta Stall</span>
        </div>
      </div>
    </form>
  );
}
