import { Suspense } from "react";
import type { Metadata } from "next";
import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/products";
import { QuickShopTable } from "@/components/price-list/quick-shop-table";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Quick Shop & Wholesale Price List | ${siteConfig.name.en}`,
  description:
    "Order Diwali firecrackers quickly using our wholesale price list table. Select quantities and checkout directly.",
};

async function PriceListContent() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return <QuickShopTable categories={categories} products={products} />;
}

export default function PriceListPage() {
  return (
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="py-20 text-center text-[#737373] text-sm">
              Loading wholesale price list...
            </div>
          }
        >
          <PriceListContent />
        </Suspense>
      </div>
    </div>
  );
}
