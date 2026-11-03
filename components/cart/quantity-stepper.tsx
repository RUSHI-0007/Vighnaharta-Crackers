"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  size?: "sm" | "default";
}

export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  className,
  size = "default",
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-border bg-card/70 p-0.5",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-foreground hover:bg-secondary active:scale-95 transition-all disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
          isSm ? "h-8 w-8 min-h-[32px] min-w-[32px]" : "h-11 w-11 min-h-[44px] min-w-[44px]"
        )}
      >
        <Minus className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>

      <span
        className={cn(
          "text-center font-bold tabular-nums text-foreground select-none",
          isSm ? "w-8 text-xs" : "w-10 text-sm"
        )}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-foreground hover:bg-secondary active:scale-95 transition-all disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
          isSm ? "h-8 w-8 min-h-[32px] min-w-[32px]" : "h-11 w-11 min-h-[44px] min-w-[44px]"
        )}
      >
        <Plus className={isSm ? "h-3.5 w-3.5" : "h-4 w-4"} />
      </button>
    </div>
  );
}

