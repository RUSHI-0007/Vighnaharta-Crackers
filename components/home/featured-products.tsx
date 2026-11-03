import Link from "next/link";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/shop/product-grid";
import { ArrowRight, Flame } from "lucide-react";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 8);

  return (
    <section className="py-12 md:py-16 border-b border-border/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              <Flame className="h-3.5 w-3.5 fill-current text-primary" />
              <span>Diwali Bestsellers</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Most Popular Firecrackers
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Top customer favorites for festive family celebrations with guaranteed sparkle & sound.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 hover:underline mt-3 sm:mt-0"
          >
            <span>View All Fireworks</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ProductGrid products={displayProducts} />
      </div>
    </section>
  );
}
