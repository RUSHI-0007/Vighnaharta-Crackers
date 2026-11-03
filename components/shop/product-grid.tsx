import type { ProductWithCategory } from "@/types";
import { ProductCard } from "@/components/shop/product-card";

interface ProductGridProps {
  products: ProductWithCategory[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No firecrackers found in this category",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border border-dashed border-slate-200 p-8 bg-white space-y-2">
        <span className="text-4xl mb-2 block select-none">🎆</span>
        <p className="text-sm font-bold text-slate-800">{emptyMessage}</p>
        <p className="text-xs text-slate-500">
          Try selecting another category from the sidebar or clearing your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
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
