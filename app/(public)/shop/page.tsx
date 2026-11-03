import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/products";
import { CategorySidebar } from "@/components/shop/category-sidebar";
import { ProductSearch } from "@/components/shop/product-search";
import { ProductGrid } from "@/components/shop/product-grid";
import { FileSpreadsheet, ChevronRight } from "lucide-react";

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
    getProducts(), // fetch all to compute counts and for filtering
  ]);

  // Compute category counts
  const counts: Record<string, number> = {};
  for (const p of allProducts) {
    if (p.category_id) {
      counts[p.category_id] = (counts[p.category_id] || 0) + 1;
    }
    if (p.category?.slug) {
      counts[p.category.slug] = (counts[p.category.slug] || 0) + 1;
    }
  }

  // Filter products by selected category and search keyword
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
    <div className="space-y-6">
      
      {/* Breadcrumb (like Anil Crackers Screenshot 4) */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pb-2 border-b border-slate-200">
        <Link href="/" className="hover:text-red-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/shop" className="hover:text-red-700 transition-colors">
          Buy Crackers
        </Link>
        {activeCategory && (
          <>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-900 font-bold">{activeCategory.name_en}</span>
          </>
        )}
      </nav>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Category Sidebar */}
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-20">
          <CategorySidebar
            categories={categories}
            counts={counts}
            totalCount={allProducts.length}
          />

          {/* Quick Shop Callout Card */}
          <div className="hidden md:block mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <FileSpreadsheet className="h-4 w-4 text-emerald-700" />
              <span>Wholesale Buyer?</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-snug">
              Order your entire Diwali list at once using our spreadsheet-style Price List table.
            </p>
            <Link
              href="/price-list"
              className="inline-block font-bold text-emerald-700 hover:text-emerald-900 underline text-[11px]"
            >
              Open Quick Shop Table &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Products & Filter Header */}
        <div className="md:col-span-8 lg:col-span-9 space-y-5">
          
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeCategory ? activeCategory.name_en : "All Fireworks"}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeCategory
                  ? `${activeCategory.name_mr} • ${filteredProducts.length} products available`
                  : `Showing all ${filteredProducts.length} products direct at wholesale prices`}
              </p>
            </div>

            <div className="w-full sm:w-72">
              <ProductSearch />
            </div>
          </div>

          {/* Mobile Quick Shop Link */}
          <div className="md:hidden flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-xs text-emerald-900">
            <span>Wholesale Order Table:</span>
            <Link
              href="/price-list"
              className="font-bold text-emerald-700 underline"
            >
              Open Price List &rarr;
            </Link>
          </div>

          {/* Product Grid */}
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
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-6 sm:py-8">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="py-20 text-center text-slate-500 text-sm">
              Loading fireworks catalog...
            </div>
          }
        >
          <ShopContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
