import type { Product } from "@/types";
import { ProductCard } from "@/components/shop/product-card";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "कोणतेही फटाके सापडले नाहीत (No products found)",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border border-dashed border-border/70 p-8 bg-card/30">
        <span className="text-4xl mb-3 block">🧨</span>
        <p className="text-base font-semibold text-foreground">{emptyMessage}</p>
        <p className="text-xs text-muted-foreground mt-1">
          कृपया इतर श्रेणी तपासा किंवा वेगळा शब्द शोधा.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

