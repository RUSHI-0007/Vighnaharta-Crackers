"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Confetti } from "@/components/ui/confetti";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PackageSearch, Phone, Sparkles, Mail } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");

  if (!code) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16 text-center">
        <span className="text-5xl block mb-3">🔍</span>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          कोणताही ऑर्डर कोड आढळला नाही
        </h1>
        <p className="text-xs text-muted-foreground mt-2 mb-6">
          आपण थेट या पृष्ठावर आला आहात. कृपया आपल्या ऑर्डरचा मागोवा घेण्यासाठी ट्रॅकिंग पेज वापरा.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="outline">मुख्यपृष्ठ</Button>
          </Link>
          <Link href="/track">
            <Button>ऑर्डर ट्रॅक करा</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-xl px-4 py-12 text-center">
      <Confetti />

      <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Success Icon */}
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            ऑर्डर यशस्वीरीत्या नोंदवली गेली!
          </h1>
          <p className="text-xs sm:text-sm text-accent font-medium">
            दिवाळी फटाके खरेदीबद्दल आपले मनःपूर्वक आभार!
          </p>
        </div>

        {/* Order Code Box */}
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            तुमचा ऑर्डर क्रमांक (Order Code)
          </span>
          <p className="font-mono text-2xl sm:text-3xl font-extrabold text-primary tracking-wider">
            {code}
          </p>
        </div>

        {/* Details & Email notice */}
        <div className="space-y-2 text-xs text-muted-foreground leading-relaxed">
          {email && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-secondary/80 border border-border px-3.5 py-2 text-foreground font-medium">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>ऑर्डरची संपूर्ण पावती <strong>{email}</strong> वर पाठवण्यात आली आहे.</span>
            </div>
          )}
          <p>
            आम्ही आपली ऑर्डर तपासून लवकरच आपल्या मोबाईल नंबरवर संपर्क करू.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/track?code=${code}`} className="w-full sm:w-auto">
            <Button className="w-full gap-2">
              <PackageSearch className="h-4 w-4" />
              <span>ऑर्डर ट्रॅक करा (Track Order)</span>
            </Button>
          </Link>

          <a href={`tel:${siteConfig.phone}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>दुकानदाराला कॉल करा</span>
            </Button>
          </a>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Link
            href="/shop"
            className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            <span>आणखी फटाके खरेदी करा &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-16 text-center text-muted-foreground">लोड होत आहे...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
