import { getCategories } from "@/queries/categories";
import { PageHeader } from "@/components/admin/shell/page-header";
import { ProductForm } from "@/components/admin/products/product-form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Firecracker"
        description="Enter English and Marathi names, MRP, discount %, and upload a photo."
      />
      <ProductForm categories={categories} />
    </div>
  );
}

