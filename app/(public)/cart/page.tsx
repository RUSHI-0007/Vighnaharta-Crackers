import type { Metadata } from "next";
import { getSettings } from "@/queries/settings";
import { CartView } from "@/components/cart/cart-view";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Shopping Cart | ${siteConfig.name.en}`,
  description: "Review items in your cart and proceed to delivery details.",
};

export default async function CartPage() {
  const settings = await getSettings();

  return (
    <div className="bg-[#fff9f0] min-h-[calc(100vh-160px)] py-8 sm:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <CartView settings={settings} />
      </div>
    </div>
  );
}
