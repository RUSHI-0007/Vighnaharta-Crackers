import type { Metadata } from "next";
import { TrackForm } from "@/components/track/track-form";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Track Your Order | ${siteConfig.name.en}`,
  description: "Check the status and delivery updates of your firecracker order.",
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
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-8 sm:py-12">
      <div className="container mx-auto max-w-2xl px-4 sm:px-6 text-center">
        <div className="mb-8 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b91c32] block">
            Order Status
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#202d3a] tracking-tight">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] max-w-md mx-auto">
            Enter your order tracking code and registered phone number to view live status.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-12 text-[#737373] text-xs">
              Loading order details...
            </div>
          }
        >
          <TrackContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
