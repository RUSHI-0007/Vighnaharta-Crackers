"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/format";
import { calculateEffectivePrice } from "@/lib/pricing";
import { useTranslation } from "@/lib/translations";
import { toast } from "sonner";
import { ShoppingBag, Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const { t, locale } = useTranslation();
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0
  );
  const addItem = useCartStore((s) => s.addItem);
  const setQty = useCartStore((s) => s.setQty);

  const effectivePrice = calculateEffectivePrice(product.price, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  const displayName = locale === "mr" ? product.name_mr : product.name_en;
  const secondaryName = locale === "mr" ? product.name_en : product.name_mr;

  const handleAdd = () => {
    if (!product.in_stock) return;
    addItem(product, 1);
    toast.success(`${displayName} added`, {
      description: `${formatCurrency(effectivePrice)} • ${product.unit}`,
    });
  };

  const handleIncrement = () => {
    if (quantity === 0) {
      handleAdd();
    } else {
      setQty(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQty(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white border border-[#e9e0d5] hover:border-[#b91c32] rounded-[16px] p-4 flex flex-col justify-between transition-all shadow-[0px_6px_24px_0px_rgba(32,45,58,0.03)] group">
      <div>
        {/* Product Media */}
        <div className="h-[180px] sm:h-[220px] w-full rounded-[10px] overflow-hidden relative bg-[#f5eddf] mb-3">
          <Image
            src={product.image_path || "/images/product-placeholder.webp"}
            alt={displayName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-[#b91c32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.discount_percent}% {t.common.off}
            </span>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center">
              <span className="text-xs font-semibold text-[#b91c32] bg-[#fbecef] border border-[#b91c32]/20 px-2.5 py-1 rounded-md">
                {t.common.outOfStock}
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-1 mb-3">
          {categoryName && (
            <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#b91c32] block">
              {categoryName}
            </span>
          )}
          <h3 className="font-heading font-medium text-[#202d3a] group-hover:text-[#b91c32] text-[16px] sm:text-[18px] transition-colors leading-snug line-clamp-1">
            {displayName}
          </h3>
          <p className="text-[12px] text-[#737373] line-clamp-1 font-body">
            {secondaryName} • {product.unit}
          </p>
        </div>
      </div>

      {/* Pricing & Cart Action */}
      <div className="space-y-3 pt-2 border-t border-[#e9e0d5]">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading font-semibold text-[#202d3a] text-[18px] sm:text-[20px]">
              {formatCurrency(effectivePrice)}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-[#737373] line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              product.in_stock
                ? "bg-[#eaf3ed] text-[#25664d]"
                : "bg-[#fbecef] text-[#b91c32]"
            }`}
          >
            {product.in_stock ? t.common.inStock : t.common.outOfStock}
          </span>
        </div>

        {product.in_stock ? (
          quantity > 0 ? (
            <div className="border border-[#e9e0d5] bg-[#fff9f0] rounded-[10px] h-[44px] flex items-center justify-between px-3 text-[#202d3a]">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-1 hover:text-[#b91c32] transition-colors cursor-pointer text-base"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-semibold text-sm">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-1 hover:text-[#b91c32] transition-colors cursor-pointer text-base"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-[44px] bg-[#b91c32] hover:bg-[#991b1b] text-white rounded-[10px] font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{t.common.add}</span>
            </button>
          )
        ) : (
          <div className="h-[44px] flex items-center justify-center bg-gray-100 rounded-[10px] text-xs text-[#737373] font-medium">
            {t.common.outOfStock}
          </div>
        )}
      </div>
    </div>
  );
}
