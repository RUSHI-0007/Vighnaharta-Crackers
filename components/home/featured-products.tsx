"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/product-card";
import { useTranslation } from "@/lib/translations";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { t } = useTranslation();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-[#fff9f0] border-b border-[#e9e0d5]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
              {t.featured.badge}
            </p>
            <h2 className="font-heading font-semibold text-[#202d3a] text-3xl sm:text-[40px] leading-[1.15] mt-1.5">
              {t.featured.heading}
            </h2>
            <p className="text-[#737373] text-[14px] sm:text-[15px] mt-1 max-w-xl">
              {t.featured.desc}
            </p>
          </div>

          <Link
            href="/shop"
            className="font-semibold text-[#b91c32] hover:underline text-xs sm:text-sm whitespace-nowrap self-start sm:self-auto"
          >
            {t.featured.browseAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
