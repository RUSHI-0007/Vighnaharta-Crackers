"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState<number>(direction === "down" ? value : 0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 800; // ms

    const timer = setTimeout(() => {
      setDisplayValue((startVal) => {
        const endVal = value;

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const current = Math.round(startVal + (endVal - startVal) * progress);
          setDisplayValue(current);

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
        return startVal;
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, delay]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {new Intl.NumberFormat("en-IN").format(displayValue)}
    </span>
  );
}
