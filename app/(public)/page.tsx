import { getCategories } from "@/queries/categories";
import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { VisitUs } from "@/components/home/visit-us";

export default async function HomePage() {
  const categories = await getCategories();

  return (
    <div>
      <Hero />
      <CategoryGrid categories={categories} />
      <VisitUs />
    </div>
  );
}
