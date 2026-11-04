"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { useTranslation } from "@/lib/translations";
import {
  CheckCircle2,
  PackageSearch,
  Phone,
  ArrowRight,
  Clock,
  Truck,
  Hourglass,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const { locale } = useTranslation();
  const code = searchParams.get("code");
  const email = searchParams.get("email");
  const method = (searchParams.get("method") || "upi_qr") as "upi_qr" | "cod";
  const name = searchParams.get("name") || "";

  if (!code) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-serif font-bold text-[#202d3a]">
          {locale === "mr" ? "कोणताही ऑर्डर कोड सापडला नाही" : "No Order Code Found"}
        </h1>
        <p className="text-xs text-[#737373]">
          {locale === "mr"
            ? "तुमची आधीची ऑर्डर पाहण्यासाठी कृपया ट्रॅक पेजला भेट द्या."
            : "Please visit the tracking page to view your existing order."}
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline" className="border-[#e9e0d5]">
              {locale === "mr" ? "मुख्यपृष्ठ" : "Homepage"}
            </Button>
          </Link>
          <Link href="/track">
            <Button className="bg-[#b91c32] hover:bg-[#981426] text-white font-bold">
              {locale === "mr" ? "ऑर्डर ट्रॅक करा" : "Track Order"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isCod = method === "cod";
  const finalStepNumber = isCod ? 3 : 4;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12 space-y-8">
      {/* Celebration Confetti */}
      <Confetti />

      {/* Progress Steps Header */}
      <div className="flex justify-center">
        <CheckoutSteps currentStep={finalStepNumber} paymentMethod={method} />
      </div>

      {/* Main Status Card */}
      <div className="rounded-2xl border border-[#e9e0d5] bg-white p-6 sm:p-10 shadow-2xs space-y-8 text-center sm:text-left">
        {/* Banner with Icon */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-[#fbecef] text-[#b91c32] border border-[#b91c32]/20">
            {isCod ? (
              <CheckCircle2 className="size-8 text-[#b91c32]" />
            ) : (
              <Hourglass className="size-8 text-[#b91c32]" />
            )}
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#b91c32]">
                {locale === "mr" ? `ऑर्डर ${code}` : `Order ${code}`}
              </span>
              <span className="inline-flex items-center rounded-full bg-[#fbecef] px-2.5 py-0.5 text-[11px] font-bold text-[#b91c32]">
                {isCod
                  ? (locale === "mr" ? "कॅश ऑन डिलिव्हरी" : "Cash on Delivery")
                  : (locale === "mr" ? "UPI पेमेंट पुरावा प्राप्त झाला" : "UPI Payment Proof Received")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202d3a] tracking-tight">
              {isCod
                ? (locale === "mr" ? "ऑर्डर प्राप्त झाली. पुष्टीसाठी आम्ही कॉल करू." : "Order received. We'll call you to confirm.")
                : (locale === "mr" ? "पेमेंट पुरावा प्राप्त झाला. आम्ही पडताळणी करू." : "Proof received. We'll take a look.")}
            </h1>

            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              {isCod
                ? (locale === "mr"
                    ? `धन्यवाद${name ? `, ${name}` : ""}. तुमची ऑर्डर आमच्याकडे नोंद झाली आहे. डिलिव्हरी व लोकेशन पुष्टीसाठी ${siteConfig.owner.mr} तुम्हाला लवकरच फोन करतील.`
                    : `Thank you${name ? `, ${name}` : ""}. We have received your order details. ${siteConfig.owner.en} will call your phone number to verify and confirm delivery.`)
                : (locale === "mr"
                    ? `धन्यवाद${name ? `, ${name}` : ""}. तुमचा UPI पेमेंट स्क्रीनशॉट प्राप्त झाला आहे. ${siteConfig.owner.mr} खात्याशी पडताळणी करून ऑर्डर निश्चित करतील.`
                    : `Thank you${name ? `, ${name}` : ""}. We have received your UPI payment screenshot. ${siteConfig.owner.en} will verify the transaction against our account records.`)}
            </p>
          </div>
        </div>

        {/* Order Code Callout Box */}
        <div className="rounded-xl border border-[#e9e0d5] bg-[#fff9f0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
              {locale === "mr" ? "तुमचा ऑर्डर ट्रॅकिंग कोड" : "Your Order Tracking Code"}
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-black text-[#202d3a] tracking-wider block mt-0.5">
              {code}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#737373] sm:max-w-xs">
            {locale === "mr"
              ? "हा कोड जपून ठेवा, कधीही ऑर्डर स्थिती तपासण्यासाठी याचा वापर करा."
              : "Save this code to check your order verification and delivery timeline anytime."}
          </p>
        </div>

        {/* Email Receipt Note */}
        {email && (
          <div className="rounded-xl border border-[#e9e0d5] bg-white p-4 text-xs text-[#202d3a] flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-[#737373]">
              {locale === "mr" ? (
                <>
                  सविस्तर ऑर्डर पावती <strong className="text-[#202d3a] font-semibold">{email}</strong> वर पाठवली आहे.
                </>
              ) : (
                <>
                  An itemized confirmation receipt has been sent to{" "}
                  <strong className="text-[#202d3a] font-semibold">{email}</strong>.
                </>
              )}
            </p>
          </div>
        )}

        {/* 3-Stage Timeline */}
        <div className="space-y-4 pt-2 border-t border-[#e9e0d5]">
          <h3 className="text-sm font-bold text-[#202d3a] uppercase tracking-wider text-left">
            {locale === "mr" ? "ऑर्डर प्रक्रिया टप्पे" : "Order Verification Timeline"}
          </h3>

          <div className="space-y-4 text-left">
            {/* Stage 1 */}
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#202d3a]">
                    {isCod
                      ? (locale === "mr" ? "ऑर्डर नोंदवली गेली" : "Order Placed")
                      : (locale === "mr" ? "ऑर्डर व पेमेंट पुरावा सबमिट केला" : "Order & Proof Submitted")}
                  </h4>
                  <span className="text-[11px] font-bold text-emerald-700">
                    {locale === "mr" ? "पूर्ण" : "Completed"}
                  </span>
                </div>
                <p className="text-xs text-[#737373] mt-0.5">
                  {isCod
                    ? (locale === "mr" ? "तुमची ऑर्डर आमच्या सिस्टीममध्ये सुरक्षित नोंदवली आहे." : "Your order was successfully recorded in our system.")
                    : (locale === "mr" ? "तुमची माहिती व UPI स्क्रीनशॉट आम्हाला मिळाला आहे." : "We have received your order details and UPI payment screenshot.")}
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fbecef] text-[#b91c32] border border-[#b91c32]/30 font-bold">
                {isCod ? (
                  <PhoneCall className="size-5 text-[#b91c32]" />
                ) : (
                  <Clock className="size-5 text-[#b91c32]" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#b91c32]">
                    {isCod
                      ? (locale === "mr" ? "फोनवर पडताळणी कॉल" : "Phone Verification Call")
                      : (locale === "mr" ? "पेमेंट पडताळणी" : "Payment Verification")}
                  </h4>
                  <span className="text-[11px] font-bold text-[#b91c32] bg-[#fbecef] px-2 py-0.5 rounded-full">
                    {locale === "mr" ? "प्रगतीपथावर" : "In Progress"}
                  </span>
                </div>
                <p className="text-xs text-[#737373] mt-0.5">
                  {isCod
                    ? (locale === "mr" ? `${siteConfig.owner.mr} ऑर्डर व पत्त्याची खात्री करण्यासाठी थोड्याच वेळात तुम्हाला कॉल करतील.` : `${siteConfig.owner.en} will call your mobile number shortly to confirm order items and location.`)
                    : (locale === "mr" ? "आमची स्टॉल टीम बँक खात्याशी पेमेंट पडताळत आहे." : "Our stall team is verifying your payment screenshot against the bank statement.")}
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-start gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f5eddf] text-[#737373] font-bold">
                <Truck className="size-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#737373]">
                    {locale === "mr" ? "पॅकिंग व डिलिव्हरी" : "Packing & Dispatch"}
                  </h4>
                  <span className="text-[11px] font-medium text-[#737373]">
                    {locale === "mr" ? "पुढील टप्पा" : "Upcoming"}
                  </span>
                </div>
                <p className="text-xs text-[#737373] mt-0.5">
                  {locale === "mr"
                    ? "फटाके सुरक्षित पॅक करून गणेगाव खालसा स्थानिक डिलिव्हरी किंवा स्टॉल पिकअपसाठी पाठवले जातील."
                    : "Fireworks packed securely and dispatched for local Ganegaon Khalsa delivery or stall collection."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 border-t border-[#e9e0d5]">
          <Link href={`/track?code=${code}`} className="w-full sm:w-auto">
            <Button className="w-full gap-2 rounded-xl bg-[#b91c32] hover:bg-[#981426] text-white font-bold text-xs sm:text-sm px-6 py-2.5 shadow-xs">
              <PackageSearch className="h-4 w-4" />
              <span>{locale === "mr" ? "थेट स्टेटस पहा" : "Track Live Status"}</span>
            </Button>
          </Link>

          <a href={`tel:${siteConfig.phone}`} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full gap-2 rounded-xl border-[#e9e0d5] bg-white text-[#202d3a] font-bold text-xs sm:text-sm px-5 py-2.5 hover:bg-[#f5eddf]"
            >
              <Phone className="h-4 w-4 text-[#b91c32]" />
              <span>
                {locale === "mr"
                  ? `स्टॉलवर कॉल करा (${siteConfig.phone})`
                  : `Call Stall (${siteConfig.phone})`}
              </span>
            </Button>
          </a>

          <Link
            href="/shop"
            className="text-xs text-[#b91c32] font-bold hover:underline inline-flex items-center gap-1 sm:ml-auto"
          >
            <span>{locale === "mr" ? "आणखी खरेदी करा" : "Continue Shopping"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  const { locale } = useTranslation();
  return (
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-6 sm:py-10">
      <Suspense
        fallback={
          <div className="py-16 text-center text-[#737373] text-xs">
            {locale === "mr" ? "माहिती लोड होत आहे..." : "Loading order confirmation..."}
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
