"use client";

import { useState, useTransition } from "react";
import {
  bulkUpdateStockAction,
  bulkUpdateDiscountAction,
} from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Tag, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BulkActionBarProps {
  selectedIds: string[];
  onClear: () => void;
}

export function BulkActionBar({ selectedIds, onClear }: BulkActionBarProps) {
  const [discountVal, setDiscountVal] = useState<string>("20");
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (selectedIds.length === 0) return null;

  const handleStockUpdate = (inStock: boolean) => {
    startTransition(async () => {
      const res = await bulkUpdateStockAction(selectedIds, inStock);
      if (res.ok) {
        toast.success(
          `Updated stock for ${selectedIds.length} product(s)!`
        );
        onClear();
      } else {
        toast.error(res.error || "Bulk update failed");
      }
    });
  };

  const handleDiscountApply = (e: React.FormEvent) => {
    e.preventDefault();
    const discount = parseInt(discountVal, 10);
    if (isNaN(discount) || discount < 0 || discount > 90) {
      toast.error("Please enter a discount between 0 and 90%.");
      return;
    }

    startTransition(async () => {
      const res = await bulkUpdateDiscountAction(selectedIds, discount);
      if (res.ok) {
        toast.success(`Set ${discount}% discount on ${selectedIds.length} product(s)!`);
        setShowDiscountInput(false);
        onClear();
      } else {
        toast.error(res.error || "Failed to update discount");
      }
    });
  };

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-card border border-primary/40 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
          {selectedIds.length}
        </span>
        <span className="text-xs font-semibold text-foreground">
          Selected
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => handleStockUpdate(true)}
          className="h-9 text-xs gap-1 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>In Stock</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => handleStockUpdate(false)}
          className="h-9 text-xs gap-1 border-destructive/40 text-destructive hover:bg-destructive/10"
        >
          <XCircle className="h-3.5 w-3.5" />
          <span>Out of Stock</span>
        </Button>

        {showDiscountInput ? (
          <form onSubmit={handleDiscountApply} className="flex items-center gap-1.5">
            <Input
              type="number"
              min="0"
              max="90"
              value={discountVal}
              onChange={(e) => setDiscountVal(e.target.value)}
              className="w-16 h-9 text-xs px-2"
              placeholder="%"
            />
            <Button size="sm" type="submit" disabled={isPending} className="h-9 px-3 text-xs">
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Apply"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => setShowDiscountInput(false)}
              className="h-9 px-2"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </form>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            onClick={() => setShowDiscountInput(true)}
            className="h-9 text-xs gap-1"
          >
            <Tag className="h-3.5 w-3.5 text-accent" />
            <span>Set Discount %</span>
          </Button>
        )}

        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="h-9 px-2 text-muted-foreground hover:text-foreground"
          aria-label="Clear selection"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

