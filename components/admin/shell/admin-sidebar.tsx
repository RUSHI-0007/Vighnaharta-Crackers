"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { logoutAction } from "@/actions/auth";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card/60 p-4 shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-3 py-3 border-b border-border/60 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="font-heading text-sm font-bold text-foreground truncate">
            {siteConfig.name.mr}
          </h2>
          <span className="text-[10px] text-accent uppercase font-bold tracking-wider">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all min-h-[44px]",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="pt-4 border-t border-border/60 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-3.5 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors min-h-[40px]"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-accent" />
            <span>Open Shop</span>
          </span>
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer min-h-[40px]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}

