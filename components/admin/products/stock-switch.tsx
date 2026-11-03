"use client";

import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { toggleStockAction } from "@/actions/products";
import { toast } from "sonner";

interface StockSwitchProps {
  productId: string;
  initialInStock: boolean;
  productName: string;
}

export function StockSwitch({
  productId,
  initialInStock,
  productName,
}: StockSwitchProps) {
  const [inStock, setInStock] = useState(initialInStock);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (checked: boolean) => {
    // Optimistic UI update
    setInStock(checked);

    startTransition(async () => {
      const res = await toggleStockAction(productId, checked);
      if (res.ok) {
        toast.success(
          checked
            ? `"${productName}" स्टॉक उपलब्ध केला!`
            : `"${productName}" स्टॉक संपला असा मार्क केला!`
        );
      } else {
        // Rollback
        setInStock(!checked);
        toast.error(res.error || "Failed to update stock status.");
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={inStock}
        onCheckedChange={handleToggle}
        disabled={isPending}
        aria-label={`Toggle stock for ${productName}`}
      />
      <span className="text-xs font-medium text-muted-foreground select-none">
        {inStock ? (
          <span className="text-emerald-400 font-semibold">In Stock</span>
        ) : (
          <span className="text-destructive font-semibold">Out of Stock</span>
        )}
      </span>
    </div>
  );
}

