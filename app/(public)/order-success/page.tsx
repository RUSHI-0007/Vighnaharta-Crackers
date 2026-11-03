"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PackageSearch, Phone, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  if (!code) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center space-y-4">
        <h1 className="text-xl font-bold text-slate-900">
          No Order Code Found
        </h1>
        <p className="text-xs text-slate-500">
          Please visit the tracking page to view your existing order.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline">Homepage</Button>
          </Link>
          <Link href="/track">
            <Button className="bg-red-700 hover:bg-red-800 text-white font-bold">Track Order</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl px-4 py-12 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-2xs">
        {/* Success Icon */}
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Thank you for shopping with {siteConfig.name.en} ({siteConfig.name.mr}).
          </p>
        </div>

        {/* Order Code Box */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 block uppercase tracking-wider">
            Your Order Tracking Code
          </span>
          <p className="font-mono text-2xl sm:text-3xl font-black text-slate-900 tracking-wider">
            {code}
          </p>
          <span className="text-[11px] text-slate-500 block">
            Please keep or screenshot this code to track your order
          </span>
        </div>

        {/* Email notice */}
        <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
          {email && (
            <p>
              An itemized confirmation receipt has been sent to <strong className="text-slate-900">{email}</strong>.
            </p>
          )}
          <p className="text-[11px] text-slate-500">
            Akshay Bendbhar will verify your order details and call you before pickup or delivery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/track?code=${code}`} className="w-full sm:w-auto">
            <Button className="w-full gap-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 shadow-xs">
              <PackageSearch className="h-4 w-4" />
              <span>Track Live Status</span>
            </Button>
          </Link>

          <a href={`tel:${siteConfig.phone}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2 rounded-xl border-slate-200 bg-white text-slate-800 font-bold text-xs sm:text-sm px-5 py-2.5 hover:bg-slate-50">
              <Phone className="h-4 w-4 text-red-700" />
              <span>Call Stall ({siteConfig.phone})</span>
            </Button>
          </a>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/shop"
            className="text-xs text-red-700 font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-6 sm:py-10">
      <Suspense fallback={<div className="py-16 text-center text-slate-400 text-xs">Loading order confirmation...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
