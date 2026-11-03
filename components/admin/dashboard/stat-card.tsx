import { NumberTicker } from "@/components/ui/number-ticker";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  icon: LucideIcon;
  description?: string;
  accentColor?: "primary" | "accent" | "warning" | "success";
}

export function StatCard({
  title,
  value,
  prefix = "",
  icon: Icon,
  description,
  accentColor = "primary",
}: StatCardProps) {
  const colorMap = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    warning: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    success: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className={cn("p-2.5 rounded-xl border", colorMap[accentColor])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-0.5 font-heading text-2xl sm:text-3xl font-bold text-foreground">
          {prefix && <span>{prefix}</span>}
          <NumberTicker value={value} />
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}

