"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error Boundary]:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <span className="text-5xl mb-4">⚠️</span>
      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-destructive mb-2">
        काहीतरी चूक झाली आहे (Something went wrong)
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
        तांत्रिक अडचणीमुळे पृष्ठ लोड होऊ शकले नाही. कृपया पुन्हा प्रयत्न करा.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>पुन्हा प्रयत्न करा (Try Again)</span>
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            <span>मुख्यपृष्ठ (Home)</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

