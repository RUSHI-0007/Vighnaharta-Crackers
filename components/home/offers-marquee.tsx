import { Marquee } from "@/components/ui/marquee";
import { Sparkles, Tag, Flame, ShieldCheck, Truck, CreditCard } from "lucide-react";

export function OffersMarquee() {
  const items = [
    { icon: Flame, text: "Diwali Wholesale Dhamaka • Guaranteed Factory Prices" },
    { icon: Tag, text: "20% to 35% Flat Discount Across All Crackers" },
    { icon: Truck, text: "Fast Local Delivery & Stall Pickup in Ganegaon Khalsa" },
    { icon: ShieldCheck, text: "100% Genuine Standard & Premium Sivakasi Brands" },
    { icon: CreditCard, text: "UPI QR & Cash on Delivery (COD) Accepted" },
    { icon: Sparkles, text: "Family Combos & Mega Aerial Sky Shot Boxes Available" },
  ];

  return (
    <div className="border-b border-border/80 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 py-2.5 overflow-hidden backdrop-blur-sm">
      <Marquee pauseOnHover className="[--duration:30s]">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-5 text-xs font-semibold text-amber-200"
            >
              <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{item.text}</span>
              <span className="text-amber-500/40 ml-4">•</span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
