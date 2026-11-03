import { calculateEffectivePrice } from "@/lib/pricing";
import { formatCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

interface PriceTagProps {
  price: number; // MRP
  discountPercent?: number;
  size?: "sm" | "default" | "lg";
}

export function PriceTag({ price, discountPercent = 0, size = "default" }: PriceTagProps) {
  const effectivePrice = calculateEffectivePrice(price, discountPercent);
  const hasDiscount = discountPercent > 0;

  const sizeClasses = {
    sm: "text-sm",
    default: "text-lg font-bold",
    lg: "text-2xl font-bold",
  };

  return (
    <div className="flex flex-wrap items-baseline gap-2">
      <span className={`text-primary font-heading ${sizeClasses[size]}`}>
        {formatCurrency(effectivePrice)}
      </span>

      {hasDiscount && (
        <>
          <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/60">
            {formatCurrency(price)}
          </span>
          <Badge variant="destructive" className="text-[10px] px-1.5 py-0 font-bold uppercase">
            {discountPercent}% OFF
          </Badge>
        </>
      )}
    </div>
  );
}

