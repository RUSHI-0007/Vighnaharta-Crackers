"use client";

import React from "react";
import { Particles } from "@/components/ui/particles";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export const SparklesCore = (props: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    background = "transparent",
    className,
    particleColor = "#F59E0B",
  } = props;
  const isMounted = useMounted();

  return (
    <div className={cn("opacity-100", className)} style={{ background }}>
      {isMounted && (
        <Particles
          color={particleColor}
          quantity={40}
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
};
