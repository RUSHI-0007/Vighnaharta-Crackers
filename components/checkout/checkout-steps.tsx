"use client";

import { Check } from "lucide-react";
import { useTranslation } from "@/lib/translations";

interface CheckoutStepsProps {
  currentStep: number;
  paymentMethod?: "upi_qr" | "cod";
}

export function CheckoutSteps({ currentStep, paymentMethod = "upi_qr" }: CheckoutStepsProps) {
  const { locale } = useTranslation();

  const labels =
    locale === "mr"
      ? {
          bag: "१. बॅग",
          delivery: "२. डिलिव्हरी",
          upiProof: "३. UPI पुरावा",
          statusCod: "३. ऑर्डर स्थिती",
          statusUpi: "४. ऑर्डर स्थिती",
        }
      : {
          bag: "Bag",
          delivery: "Delivery",
          upiProof: "UPI proof",
          statusCod: "Status",
          statusUpi: "Status",
        };

  const steps =
    paymentMethod === "cod"
      ? [
          { number: 1, label: labels.bag },
          { number: 2, label: labels.delivery },
          { number: 3, label: labels.statusCod },
        ]
      : [
          { number: 1, label: labels.bag },
          { number: 2, label: labels.delivery },
          { number: 3, label: labels.upiProof },
          { number: 4, label: labels.statusUpi },
        ];

  return (
    <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-2 scrollbar-none">
      {steps.map((step, idx) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;

        return (
          <div key={step.number} className="flex items-center gap-2 shrink-0">
            {idx > 0 && (
              <span className="text-[#e9e0d5] text-xs select-none pr-2">/</span>
            )}
            <div
              className={`flex items-center justify-center rounded-full size-6 text-[11px] font-bold transition-colors ${
                isCompleted || isCurrent
                  ? "bg-[#b91c32] text-white"
                  : "bg-[#f5eddf] text-[#737373]"
              }`}
            >
              {isCompleted ? <Check className="h-3.5 w-3.5" /> : step.number}
            </div>
            <span
              className={`text-xs font-semibold whitespace-nowrap ${
                isCurrent
                  ? "text-[#b91c32] font-bold"
                  : isCompleted
                  ? "text-[#202d3a]"
                  : "text-[#737373]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
