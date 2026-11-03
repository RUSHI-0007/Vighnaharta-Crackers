import type { Metadata } from "next";
import { getSettings } from "@/queries/settings";
import { CartView } from "@/components/cart/cart-view";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Shopping Cart | ${siteConfig.name.en}`,
  description: "Review items in your cart and proceed to checkout.",
};

export default async function CartPage() {
  const settings = await getSettings();

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Shopping Cart
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Review your selected firecrackers and proceed to delivery details.
        </p>
      </div>

      <CartView settings={settings} />
    </div>
  );
}

