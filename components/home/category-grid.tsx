import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types";
import { ArrowRight } from "lucide-react";

const categoryImages: Record<string, string> = {
  sparklers: "/images/category-sparklers.webp",
  "flower-pots": "/images/category-flowerpots.webp",
  "ground-chakkars": "/images/category-chakkars.webp",
  "gift-boxes": "/images/category-boxes.webp",
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#fff9f0] border-b border-[#e9e0d5]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <p className="font-bold text-[#b91c32] text-[11px] tracking-[2px] uppercase">
            DISCOVER THE COLLECTION
          </p>
          <h2 className="font-heading font-semibold text-[#202d3a] text-3xl sm:text-[40px] leading-[1.15] mt-1.5">
            Made for memory-making.
          </h2>
          <p className="text-[#737373] text-[14px] sm:text-[15px] mt-1 max-w-xl">
            From hand-held sparklers to sky-filling colours. Explore what fits your family celebration.
          </p>
        </div>

        {/* Dynamic Category Tiles Grid (All DB categories, responsive) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const imageSrc =
              categoryImages[cat.slug] ||
              "/images/product-placeholder.webp";

            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group bg-white border border-[#e9e0d5] hover:border-[#b91c32] rounded-[16px] p-3.5 sm:p-4 flex flex-col transition-all shadow-[0px_6px_24px_0px_rgba(32,45,58,0.03)] hover:shadow-sm"
              >
                <div className="h-[140px] sm:h-[180px] w-full relative rounded-[10px] overflow-hidden mb-3 bg-[#f5eddf]">
                  <Image
                    src={imageSrc}
                    alt={cat.name_en}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-medium text-[#202d3a] group-hover:text-[#b91c32] text-[16px] sm:text-[18px] transition-colors line-clamp-1">
                    {cat.name_en}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-[#b91c32] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                <p className="text-[#737373] text-[11px] sm:text-[12px] mt-0.5 line-clamp-1">
                  {cat.name_mr} • Wholesale Packs
                </p>
              </Link>
            );
          })}
        </div>

        {/* How Your Order Works (Truthful steps, no unconfirmed promises) */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#e9e0d5] grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-3">
            <span className="font-heading font-bold text-[#b91c32] text-2xl leading-none">
              01
            </span>
            <div>
              <p className="font-heading font-medium text-[#202d3a] text-[16px]">
                Pick your festive favourites
              </p>
              <p className="text-[#737373] text-[12px] mt-0.5 leading-relaxed">
                Browse our packaged crackers with honest wholesale pricing and clear pack sizes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-heading font-bold text-[#b91c32] text-2xl leading-none">
              02
            </span>
            <div>
              <p className="font-heading font-medium text-[#202d3a] text-[16px]">
                Choose pickup or delivery
              </p>
              <p className="text-[#737373] text-[12px] mt-0.5 leading-relaxed">
                Collect in person from our Ganegaon Khalsa stall or select local delivery options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-heading font-bold text-[#b91c32] text-2xl leading-none">
              03
            </span>
            <div>
              <p className="font-heading font-medium text-[#202d3a] text-[16px]">
                Pay via UPI or Cash on Delivery
              </p>
              <p className="text-[#737373] text-[12px] mt-0.5 leading-relaxed">
                Instant UPI payment with screenshot verification or cash upon receiving your order.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
