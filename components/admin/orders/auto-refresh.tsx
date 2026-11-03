"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AutoRefresh({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          router.refresh();
          return intervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [intervalSeconds, router]);

  const handleManualRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setSecondsLeft(intervalSeconds);
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="hidden sm:inline">Auto-refreshing in {secondsLeft}s</span>
      <Button
        size="sm"
        variant="outline"
        onClick={handleManualRefresh}
        disabled={refreshing}
        className="h-8 px-2.5 text-xs gap-1.5"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-primary" : ""}`} />
        <span>Refresh</span>
      </Button>
    </div>
  );
}

