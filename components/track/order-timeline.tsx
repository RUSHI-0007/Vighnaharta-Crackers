import type { OrderStatus } from "@/types";
import { Check, Clock, Truck, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  status: OrderStatus;
  adminNote?: string | null;
}

export function OrderTimeline({ status, adminNote }: OrderTimelineProps) {
  if (status === "cancelled") {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-center space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
          <XCircle className="h-6 w-6" />
        </div>
        <h4 className="font-heading text-base font-bold text-destructive">
          ऑर्डर रद्द करण्यात आली आहे (Order Cancelled)
        </h4>
        {adminNote ? (
          <p className="text-xs text-destructive-foreground/90 bg-destructive/20 p-2.5 rounded-xl">
            <strong>कारण:</strong> {adminNote}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            काही अडचण किंवा पेमेंट अयशस्वी झाल्यामुळे ऑर्डर रद्द झाली आहे.
          </p>
        )}
      </div>
    );
  }

  const steps: Array<{ key: OrderStatus; titleMr: string; titleEn: string; icon: typeof Clock }> = [
    { key: "pending", titleMr: "ऑर्डर प्राप्त", titleEn: "Placed", icon: Clock },
    { key: "confirmed", titleMr: "निश्चित झाली", titleEn: "Confirmed", icon: Check },
    { key: "out_for_delivery", titleMr: "डिलिव्हरीसाठी रवाना", titleEn: "Out for Delivery", icon: Truck },
    { key: "delivered", titleMr: "वितरित झाली", titleEn: "Delivered", icon: CheckCircle2 },
  ];

  const statusOrder: Record<string, number> = {
    pending: 0,
    confirmed: 1,
    out_for_delivery: 2,
    delivered: 3,
  };

  const currentIndex = statusOrder[status] ?? 0;

  return (
    <div className="py-4">
      <div className="relative flex justify-between items-center">
        {/* Progress background line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-border/80 -z-0" />
        {/* Active progress bar */}
        <div
          className="absolute top-5 left-6 h-1 bg-primary transition-all duration-500 -z-0"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md",
                  isCompleted
                    ? "bg-primary text-primary-foreground ring-4 ring-background"
                    : isCurrent
                    ? "bg-accent text-accent-foreground ring-4 ring-primary/40 animate-pulse"
                    : "bg-secondary text-muted-foreground ring-4 ring-background"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={cn(
                  "mt-2 text-center text-[11px] font-bold leading-tight max-w-[70px]",
                  isCurrent ? "text-accent" : isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.titleMr}
              </span>
              <span className="text-[9px] text-muted-foreground hidden sm:block">
                {step.titleEn}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

