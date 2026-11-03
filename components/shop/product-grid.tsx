import type { ProductWithCategory } from "@/types";
import { ProductCard } from "@/components/shop/product-card";

interface ProductGridProps {
  products: ProductWithCategory[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No crackers found in this category",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center rounded-[16px] border border-dashed border-[#e9e0d5] p-8 bg-white space-y-2">
        <span className="text-4xl mb-2 block select-none">🎆</span>
        <p className="text-sm font-semibold text-[#202d3a]">{emptyMessage}</p>
        <p className="text-xs text-[#737373]">
          Try selecting another category or clearing your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryName={product.category?.name_en}
        />
      ))}
    </div>
  );
}
