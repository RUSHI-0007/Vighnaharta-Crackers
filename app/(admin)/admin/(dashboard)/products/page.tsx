import Link from "next/link";
import { getProducts } from "@/queries/products";
import { getCategories } from "@/queries/categories";
import { PageHeader } from "@/components/admin/shell/page-header";
import { ProductsTable } from "@/components/admin/products/products-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts({ inStockOnly: false }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage firecrackers, MRPs, wholesale discounts, stock availability, and photos."
      >
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </Link>
      </PageHeader>

      <ProductsTable products={products} categories={categories} />
    </div>
  );
}

