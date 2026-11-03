import { getCategories } from "@/queries/categories";
import { PageHeader } from "@/components/admin/shell/page-header";
import { CategoryList } from "@/components/admin/categories/category-list";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Manage product categories, Marathi & English names, and display sort order."
      />
      <CategoryList categories={categories} />
    </div>
  );
}

