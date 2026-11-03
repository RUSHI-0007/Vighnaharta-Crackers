"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Cats", icon: Layers },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-border bg-card/95 backdrop-blur-md pb-safe">
      <div className="flex items-center justify-around h-16 px-1">
        {mobileItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] font-bold transition-colors min-h-[44px]",
                isActive
                  ? "text-primary font-extrabold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-xl transition-all",
                  isActive && "bg-primary/15"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
              </div>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

