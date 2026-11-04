"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { formatCurrency } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/translations";
import { toast } from "sonner";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import type { PaymentMethod, Settings } from "@/types";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  notes?: string;
  honeypot?: string;
}

export function CheckoutForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const mounted = useMounted();
  const { t, locale } = useTranslation();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const { total } = useMemo(() => computeCartTotals(items), [items]);

  const [step, setStep] = useState<2 | 3>(2);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    settings.upi_enabled ? "upi_qr" : "cod"
  );
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotError, setScreenshotError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      landmark: "",
      notes: "",
      honeypot: "",
    },
  });

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl border border-[#e9e0d5] p-8 bg-white space-y-4 shadow-2xs">
        <h3 className="text-lg font-serif font-bold text-[#202d3a]">
          {t.cart.empty}
        </h3>
        <p className="text-xs sm:text-sm text-[#737373] max-w-sm mx-auto">
          {locale === "mr"
            ? "चेकआउट करण्यापूर्वी कृपया आमच्या दिवाळी कलेक्शनमधून फटाके निवडा."
            : "Please select fireworks from our festive collection before checking out."}
        </p>
        <Button
          onClick={() => router.push("/shop")}
          className="bg-[#b91c32] text-white font-bold rounded-xl px-5 py-2 hover:bg-[#981426]"
        >
          {locale === "mr" ? "कॅटलॉग पहा →" : "Browse Catalog →"}
        </Button>
      </div>
    );
  }

  if (!settings.accepting_orders) {
    return (
      <div className="text-center py-16 rounded-2xl border border-[#e9e0d5] p-8 bg-white space-y-4 shadow-2xs">
        <AlertCircle className="h-10 w-10 text-[#b91c32] mx-auto" />
        <h3 className="text-lg font-serif font-bold text-[#202d3a]">
          {locale === "mr" ? "ऑर्डर्स तात्पुरत्या बंद आहेत" : "Orders Paused"}
        </h3>
        <p className="text-xs sm:text-sm text-[#737373] max-w-sm mx-auto">
          {locale === "mr"
            ? "सध्या आम्ही नवीन ऑनलाइन ऑर्डर्स घेत नाही आहोत. कृपया थेट आमच्या स्टॉलशी संपर्क साधा."
            : "We are temporarily not taking new orders. Please contact our stall directly."}
        </p>
      </div>
    );
  }

  const handleProceedToUpi = async () => {
    const valid = await trigger(["name", "phone", "email", "address"]);
    if (valid) {
      if (total < settings.min_order_amount) {
        toast.error(
          locale === "mr"
            ? `किमान ऑर्डर मर्यादा ${formatCurrency(settings.min_order_amount)} आहे`
            : `Minimum order amount is ${formatCurrency(settings.min_order_amount)}`
        );
        return;
      }
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (values.honeypot) {
      toast.error(locale === "mr" ? "अवैध सबमिशन" : "Invalid submission");
      return;
    }

    if (total < settings.min_order_amount) {
      toast.error(
        locale === "mr"
          ? `किमान ऑर्डर मर्यादा ${formatCurrency(settings.min_order_amount)} आहे`
          : `Minimum order amount is ${formatCurrency(settings.min_order_amount)}`
      );
      return;
    }

    if (paymentMethod === "upi_qr" && !screenshot) {
      const msg =
        locale === "mr"
          ? "ऑर्डर पूर्ण करण्यासाठी कृपया UPI पेमेंटचा स्क्रीनशॉट अपलोड करा."
          : "Please upload your UPI payment screenshot to complete the order.";
      setScreenshotError(msg);
      toast.error(msg);
      return;
    }

    setScreenshotError(undefined);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("phone", values.phone.trim());
      formData.append("email", values.email.trim());
      formData.append("address", values.address.trim());
      if (values.landmark?.trim()) formData.append("landmark", values.landmark.trim());
      if (values.notes?.trim()) formData.append("notes", values.notes.trim());
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
        throw new Error(result.error || "Could not place order. Please try again.");
      }

      clearCart();
      toast.success(
        locale === "mr"
          ? "ऑर्डर यशस्वीरित्या नोंदवली गेली! ईमेलवर माहिती पाठवली आहे."
          : "Order placed successfully! Confirmation sent to your email."
      );
      router.push(
        `/order-success?code=${result.data.orderCode}&email=${encodeURIComponent(
          values.email.trim()
        )}&method=${paymentMethod}&name=${encodeURIComponent(values.name.trim())}`
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "A technical error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dynamic Step Progress Indicator */}
      <div className="pb-1">
        <CheckoutSteps currentStep={step} paymentMethod={paymentMethod} />
      </div>

      {/* Honeypot anti-bot */}
      <input
        type="text"
        {...register("honeypot")}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {step === 2 && (
        <>
          {/* Customer Delivery Details */}
          <div className="rounded-2xl border border-[#e9e0d5] bg-white p-5 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-[#e9e0d5] pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b91c32]/10 text-[#b91c32]">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#202d3a]">
                  {t.checkout.deliveryDetails}
                </h3>
                <p className="text-xs text-[#737373]">
                  {locale === "mr"
                    ? "गणेगाव खालसा किंवा जवळ फटाके कुठे पोहोचवायचे आहेत?"
                    : "Where should we deliver your crackers in Ganegaon Khalsa or nearby?"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-[#202d3a]">
                  {t.checkout.fullName} *
                </Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: locale === "mr" ? "कृपया तुमचे पूर्ण नाव टाका" : "Please enter your full name",
                    minLength: {
                      value: 2,
                      message: locale === "mr" ? "नाव किमान २ अक्षरांचे असावे" : "Name must be at least 2 characters",
                    },
                  })}
                  placeholder={locale === "mr" ? "उदा. राहुल शिंदे" : "e.g. Rahul Shinde"}
                  className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
                />
                {errors.name && (
                  <p className="text-xs text-[#b91c32]">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold text-[#202d3a]">
                  {t.checkout.phoneNumber} *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  {...register("phone", {
                    required: locale === "mr" ? "कृपया मोबाईल नंबर टाका" : "Please enter your phone number",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: locale === "mr" ? "कृपया वैध १०-अंकी नंबर टाका" : "Enter a valid 10-digit mobile number",
                    },
                  })}
                  placeholder="e.g. 9876543210"
                  className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-sm font-mono text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
                />
                {errors.phone && (
                  <p className="text-xs text-[#b91c32]">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-[#202d3a]">
                {t.checkout.email} *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: locale === "mr" ? "ऑर्डर पावतीसाठी ईमेल आवश्यक आहे" : "Email is required for your order confirmation receipt",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: locale === "mr" ? "कृपया वैध ईमेल टाका" : "Please enter a valid email address",
                  },
                })}
                placeholder="e.g. rahul@gmail.com"
                className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
              />
              {errors.email && (
                <p className="text-xs text-[#b91c32]">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="address" className="text-xs font-semibold text-[#202d3a]">
                  {t.checkout.deliveryAddress} *
                </Label>
                <LocationButton
                  onLocationFound={setCoords}
                  hasLocation={coords !== null}
                />
              </div>
              <Textarea
                id="address"
                rows={2}
                {...register("address", {
                  required: locale === "mr" ? "डिलिव्हरीचा पूर्ण पत्ता आवश्यक आहे" : "Detailed delivery address is required",
                  minLength: {
                    value: 5,
                    message: locale === "mr" ? "पत्ता किमान ५ अक्षरांचा असावा" : "Address must be at least 5 characters",
                  },
                })}
                placeholder={locale === "mr" ? "घर/फ्लॅट क्र., रस्ता, गल्ली, गाव..." : "House/flat number, road, area, village..."}
                className="bg-[#fff9f0]/60 border-[#e9e0d5] rounded-xl text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32] min-h-[70px]"
              />
              {errors.address && (
                <p className="text-xs text-[#b91c32]">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="landmark" className="text-xs font-semibold text-[#202d3a]">
                  {t.checkout.landmark}
                </Label>
                <Input
                  id="landmark"
                  {...register("landmark")}
                  placeholder={locale === "mr" ? "उदा. ग्रामपंचायत जवळ / मंदिर" : "e.g. Near Grampanchayat / Temple"}
                  className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs font-semibold text-[#202d3a]">
                  {t.checkout.notes}
                </Label>
                <Input
                  id="notes"
                  {...register("notes")}
                  placeholder={locale === "mr" ? "उदा. संध्याकाळी ६ वाजेपूर्वी आणा" : "e.g. Deliver before 6 PM"}
                  className="bg-[#fff9f0]/60 border-[#e9e0d5] h-11 rounded-xl text-sm text-[#202d3a] focus:bg-white focus:border-[#b91c32]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="rounded-2xl border border-[#e9e0d5] bg-white p-5 sm:p-7 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#e9e0d5] pb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#b91c32]/10 text-[#b91c32]">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#202d3a]">
                  {t.checkout.paymentMethod}
                </h3>
                <p className="text-xs text-[#737373]">
                  {locale === "mr"
                    ? "झटपट UPI क्यूआर कोड किंवा कॅश ऑन डिलिव्हरी / स्टॉल पिकअप निवडा"
                    : "Select Instant UPI QR Code or Cash on Delivery / Stall Pickup"}
                </p>
              </div>
            </div>

            <PaymentMethodSelect
              settings={settings}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>

          {/* COD Notice if COD selected */}
          {paymentMethod === "cod" && (
            <CodNotice totalFormatted={formatCurrency(total)} />
          )}

          {/* Next Button / Place Order Button */}
          <div className="space-y-3 pt-2">
            {paymentMethod === "upi_qr" ? (
              <button
                type="button"
                onClick={handleProceedToUpi}
                className="w-full min-h-[48px] rounded-xl bg-[#b91c32] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#981426] active:scale-98 transition-all cursor-pointer shadow-xs"
              >
                <span>
                  {locale === "mr"
                    ? `UPI पेमेंटकडे जा (${formatCurrency(total)})`
                    : `Continue to UPI Payment (${formatCurrency(total)})`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[48px] rounded-xl bg-[#b91c32] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#981426] active:scale-98 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {locale === "mr"
                        ? "कॅश ऑन डिलिव्हरी ऑर्डर नोंदवत आहे..."
                        : "Placing Cash on Delivery Order..."}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      {locale === "mr"
                        ? `कॅश ऑन डिलिव्हरी ऑर्डर द्या (${formatCurrency(total)})`
                        : `Place Cash on Delivery Order (${formatCurrency(total)})`}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#737373] text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {locale === "mr"
                  ? `${siteConfig.owner.mr} (${siteConfig.name.mr}) यांच्याकडून थेट पाठवले जाईल`
                  : `Order dispatched directly by ${siteConfig.owner.en} at ${siteConfig.name.en} stall`}
              </span>
            </div>
          </div>
        </>
      )}

      {step === 3 && paymentMethod === "upi_qr" && (
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b91c32] hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>
              {locale === "mr" ? "डिलिव्हरी तपशीलाकडे मागे जा" : "Back to Delivery Details"}
            </span>
          </button>

          <PaymentPanel
            settings={settings}
            total={total}
            onScreenshotSelect={setScreenshot}
            screenshotError={screenshotError}
          />

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[48px] rounded-xl bg-[#b91c32] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#981426] active:scale-98 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>
                    {locale === "mr"
                      ? "ऑर्डर व पेमेंट पुरावा सबमिट होत आहे..."
                      : "Submitting Order & Proof..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {locale === "mr"
                      ? `ऑर्डर आणि पेमेंट पुरावा सबमिट करा (${formatCurrency(total)})`
                      : `Submit Order with Payment Proof (${formatCurrency(total)})`}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-[#737373] text-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {locale === "mr"
                  ? `स्क्रीनशॉटची थेट ${siteConfig.owner.mr} यांच्याद्वारे पडताळणी केली जाईल`
                  : `Screenshot verified directly by ${siteConfig.owner.en}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
