import { notFound } from "next/navigation";
import { getProductById } from "@/queries/products";
import { getCategories } from "@/queries/categories";
import { PageHeader } from "@/components/admin/shell/page-header";
import { ProductForm } from "@/components/admin/products/product-form";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit: ${product.name_mr}`}
        description={`Editing ${product.name_en} (${product.slug})`}
      />
      <ProductForm categories={categories} product={product} />
    </div>
  );
}

