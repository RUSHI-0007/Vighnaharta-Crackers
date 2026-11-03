import type { Metadata } from "next";
import { TrackForm } from "@/components/track/track-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ऑर्डर ट्रॅक करा (Track Order) | विघ्नहर्ता फटाका स्टॉल",
  description: "आपल्या फटाक्यांच्या ऑर्डरची सद्यस्थिती तपासा.",
  robots: {
    index: false,
    follow: false,
  },
};

interface TrackPageProps {
  searchParams: Promise<{ code?: string }>;
}

async function TrackContent({ searchParams }: TrackPageProps) {
  const { code } = await searchParams;
  return <TrackForm initialCode={code || ""} />;
}

export default function TrackPage({ searchParams }: TrackPageProps) {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
      <div className="mb-8 space-y-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
          ऑर्डर ट्रॅक करा (Track Your Order)
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          आपला ऑर्डर कोड आणि नोंदणीकृत मोबाईल नंबर टाकून सद्यस्थिती तपासा.
        </p>
      </div>

      <Suspense fallback={<div className="py-12 text-muted-foreground">लोड होत आहे...</div>}>
        <TrackContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

