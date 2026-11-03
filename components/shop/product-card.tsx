"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { PriceTag } from "@/components/shop/price-tag";
import { QuantityStepper } from "@/components/cart/quantity-stepper";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { Sparkles, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.in_stock) return;
    addItem(product, quantity);
    toast.success(`${product.name_en} added to cart!`, {
      description: `${quantity} × ${product.unit} (${product.name_mr})`,
    });
    setQuantity(1);
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-[#0e153b]/90 p-4 sm:p-5 transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1">
      <div>
        {/* Image / Styled Placeholder */}
        <div className="relative mb-3.5 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-secondary/50 border border-border/60">
          {product.image_path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_path}
              alt={product.name_en}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <span className="text-5xl mb-2 select-none">🎆</span>
              <span className="text-[11px] font-semibold text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                {product.unit}
              </span>
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5 z-10">
            {product.featured && (
              <Badge variant="gold" className="text-[10px] px-2 py-0.5 flex items-center gap-1 shadow-md bg-amber-500 text-black font-bold">
                <Sparkles className="h-3 w-3 fill-current" />
                Bestseller
              </Badge>
            )}
            {!product.in_stock && (
              <Badge variant="destructive" className="text-[10px] px-2 py-0.5 shadow-md font-bold">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Unit pill */}
          <div className="absolute right-2.5 bottom-2.5 z-10">
            <span className="text-[10px] font-mono font-medium text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              Per {product.unit}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-1 mb-4">
          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
            {product.name_en}
          </h3>
          <p className="text-xs text-amber-300/80 line-clamp-1 font-medium">
            {product.name_mr}
          </p>
        </div>
      </div>

      {/* Pricing and Action */}
      <div className="space-y-3 pt-3 border-t border-border/50">
        <PriceTag price={product.price} discountPercent={product.discount_percent} />

        {product.in_stock ? (
          <div className="flex items-center gap-2">
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              size="sm"
            />
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs px-3 py-2 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer shadow-md shadow-orange-500/20"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled
            className="w-full min-h-[40px] rounded-xl bg-muted text-muted-foreground text-xs font-semibold cursor-not-allowed"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
