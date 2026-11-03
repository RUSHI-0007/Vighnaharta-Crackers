import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/products";
import { CategorySidebar } from "@/components/shop/category-sidebar";
import { ProductSearch } from "@/components/shop/product-search";
import { ProductGrid } from "@/components/shop/product-grid";
import { ChevronRight } from "lucide-react";

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const { category, search } = await searchParams;

  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const counts: Record<string, number> = {};
  for (const p of allProducts) {
    if (p.category_id) {
      counts[p.category_id] = (counts[p.category_id] || 0) + 1;
    }
    if (p.category?.slug) {
      counts[p.category.slug] = (counts[p.category.slug] || 0) + 1;
    }
  }

  let filteredProducts = allProducts;
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category?.slug === category || p.category_id === category
    );
  }
  if (search) {
    const q = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name_en.toLowerCase().includes(q) ||
        p.name_mr.toLowerCase().includes(q)
    );
  }

  const activeCategory =
    category && category !== "all"
      ? categories.find((c) => c.slug === category)
      : null;

  return (
    <div className="space-y-8">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[11px] text-[#737373]">
        <Link href="/" className="hover:text-[#b91c32] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-[#737373]" />
        <Link href="/shop" className="hover:text-[#b91c32] transition-colors">
          All crackers
        </Link>
        {activeCategory && (
          <>
            <ChevronRight className="h-3 w-3 text-[#737373]" />
            <span className="text-[#202d3a] font-semibold">{activeCategory.name_en}</span>
          </>
        )}
      </nav>

      {/* 2. Collection Introduction */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#e9e0d5]">
        <div className="space-y-2 max-w-xl">
          <p className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
            THE VIGHNAHARTA COLLECTION
          </p>
          <h1 className="font-heading font-semibold text-[#202d3a] text-3xl sm:text-5xl leading-tight">
            A little wonder,<br />for every celebration.
          </h1>
          <p className="text-[#737373] text-sm">
            Explore our packaged festive favourites. Clear wholesale prices, considered choices.
          </p>
        </div>

        <div className="bg-[#f5eddf] rounded-[16px] p-5 max-w-sm space-y-1 self-start md:self-center border border-[#e9e0d5]">
          <p className="font-semibold text-[#202d3a] text-xs">
            Choose thoughtfully. Celebrate responsibly.
          </p>
          <p className="text-[#737373] text-[11px] leading-relaxed">
            Adults 18+ only. Availability and sale subject to local regulations. Direct stall pickup available.
          </p>
        </div>
      </div>

      {/* 3. Shopping Area: Sidebar + Products */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-24">
          <CategorySidebar
            categories={categories}
            counts={counts}
            totalCount={allProducts.length}
          />
        </div>

        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <p className="text-xs text-[#737373]">
              {activeCategory ? activeCategory.name_en : "All crackers"} • {filteredProducts.length} products
            </p>
            <div className="w-full sm:w-72">
              <ProductSearch />
            </div>
          </div>

          <ProductGrid
            products={filteredProducts}
            emptyMessage={
              search
                ? `No fireworks found matching "${search}".`
                : "No fireworks currently available in this category."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-8 sm:py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <Suspense
          fallback={
            <div className="py-20 text-center text-[#737373] text-sm font-medium">
              Loading crackers catalog...
            </div>
          }
        >
          <ShopContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
