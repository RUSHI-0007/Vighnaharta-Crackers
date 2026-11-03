import type { Category } from "@/types";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Sparkles } from "lucide-react";

const categoryIcons: Record<string, { icon: string; desc: string }> = {
  sparklers: { icon: "✨", desc: "Smokeless, safe & vibrant color sparklers for all ages" },
  "flower-pots": { icon: "🌋", desc: "Golden & multicolor sparkling fountains with high bursts" },
  "ground-chakkars": { icon: "🌀", desc: "Fast spinning ground chakras with bright circular sparks" },
  rockets: { icon: "🚀", desc: "High-flying whistle & parachute night sky rockets" },
  "sound-crackers": { icon: "💥", desc: "Classic red ladi garlands and high-energy sound crackers" },
  "sky-shots": { icon: "🎆", desc: "Spectacular multicolor aerial bursts & fancy night shots" },
  "gift-boxes": { icon: "🎁", desc: "Grand value all-in-one celebration boxes for whole families" },
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  const items = categories.map((cat) => ({
    titleMr: cat.name_mr,
    titleEn: cat.name_en,
    description: categoryIcons[cat.slug]?.desc || "Standard premium quality Sivakasi fireworks",
    link: `/shop?category=${cat.slug}`,
    icon: categoryIcons[cat.slug]?.icon || "🎇",
  }));

  return (
    <section className="py-12 md:py-16 border-b border-border/60">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Explore Varieties</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Shop Fireworks By Category
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select from our wide range of safe, certified Diwali firecrackers at wholesale rates.
            </p>
          </div>
          <span className="text-xs font-semibold text-primary hidden sm:inline-block">
            {categories.length} Categories Available
          </span>
        </div>

        <HoverEffect items={items} />
      </div>
    </section>
  );
}
