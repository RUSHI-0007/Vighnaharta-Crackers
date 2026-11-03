import { getCategories } from "@/queries/categories";
import { getProducts } from "@/queries/products";
import { Hero } from "@/components/home/hero";
import { OffersMarquee } from "@/components/home/offers-marquee";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { VisitUs } from "@/components/home/visit-us";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ inStockOnly: false }),
  ]);

  return (
    <div>
      <Hero />
      <OffersMarquee />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={products} />
      <VisitUs />
    </div>
  );
}
