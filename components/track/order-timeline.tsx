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
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center space-y-2">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white">
          <XCircle className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-bold text-rose-800">
          Order Cancelled
        </h4>
        {adminNote ? (
          <p className="text-xs text-rose-900 bg-rose-100/70 p-2.5 rounded-lg max-w-md mx-auto">
            <strong>Reason:</strong> {adminNote}
          </p>
        ) : (
          <p className="text-xs text-[#737373]">
            This order was cancelled due to an issue with payment verification or stock availability.
          </p>
        )}
      </div>
    );
  }

  const steps: Array<{ key: OrderStatus; titleEn: string; icon: typeof Clock }> = [
    { key: "pending", titleEn: "Placed", icon: Clock },
    { key: "confirmed", titleEn: "Confirmed", icon: Check },
    { key: "out_for_delivery", titleEn: "Out for Delivery", icon: Truck },
    { key: "delivered", titleEn: "Delivered", icon: CheckCircle2 },
  ];

  const statusOrder: Record<string, number> = {
    pending: 0,
    confirmed: 1,
    out_for_delivery: 2,
    delivered: 3,
  };

  const currentIndex = statusOrder[status] ?? 0;

  return (
    <div className="py-2">
      <div className="relative flex justify-between items-center">
        {/* Progress background line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#e9e0d5] -z-0" />
        {/* Active progress bar */}
        <div
          className="absolute top-4 left-4 h-0.5 bg-[#b91c32] transition-all duration-300 -z-0"
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
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  isCompleted
                    ? "bg-[#b91c32] text-white"
                    : isCurrent
                    ? "bg-[#e9b94f] text-[#202d3a] ring-2 ring-[#e9b94f]/40"
                    : "bg-[#f5eddf] text-[#737373]"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span
                className={cn(
                  "mt-1.5 text-center text-[11px] font-medium leading-tight",
                  isCurrent
                    ? "text-[#b91c32] font-bold"
                    : isCompleted
                    ? "text-[#202d3a] font-bold"
                    : "text-[#737373]"
                )}
              >
                {step.titleEn}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
