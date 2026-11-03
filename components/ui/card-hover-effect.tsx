"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    titleEn: string;
    titleMr: string;
    description: string;
    link: string;
    icon?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={item.link}
          className="relative group block p-1.5 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-tr from-amber-500/25 to-orange-500/20 block rounded-3xl -z-10"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-2xl h-full w-full p-4 sm:p-5 overflow-hidden bg-[#0e153b]/90 border border-border/80 group-hover:border-amber-500/50 relative z-20 flex flex-col justify-between transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-amber-500/10">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-2xl bg-secondary/60 border border-border/60 inline-flex items-center justify-center">
                  {item.icon || "✨"}
                </span>
                <span className="text-[11px] font-medium text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  {item.titleMr}
                </span>
              </div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {item.titleEn}
              </h4>
              <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary group-hover:text-amber-400 transition-colors">
              <span>View Crackers</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
