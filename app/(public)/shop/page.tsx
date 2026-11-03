import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/products";
import { CategoryTabs } from "@/components/shop/category-tabs";
import { ProductSearch } from "@/components/shop/product-search";
import { ProductGrid } from "@/components/shop/product-grid";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const { category, search } = await searchParams;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: category && category !== "all" ? category : undefined,
      search: search || undefined,
    }),
  ]);

  const activeCategory =
    category && category !== "all"
      ? categories.find((c) => c.slug === category)
      : null;

  const activeCategoryTitle = activeCategory
    ? activeCategory.name_en
    : "All Fireworks";

  const activeCategoryMarathi = activeCategory
    ? activeCategory.name_mr
    : "सर्व फटाके";

  return (
    <>
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Wholesale Catalog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
            {activeCategoryTitle}
          </h1>
          <span className="text-sm font-medium text-amber-300">
            ({activeCategoryMarathi})
          </span>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
          Genuine certified Sivakasi fireworks at factory wholesale rates. Add your favorite items to cart for instant local pickup or doorstep delivery.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-4 mb-8">
        <div className="max-w-md">
          <ProductSearch />
        </div>
        <CategoryTabs categories={categories} />
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={products}
        emptyMessage={
          search
            ? `No firecrackers found matching "${search}". Please try another keyword or browse all categories.`
            : "No firecrackers currently available in this category. Check back soon or call us directly!"
        }
      />
    </>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Suspense fallback={<div className="py-16 text-center text-muted-foreground">Loading fireworks collection...</div>}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
