"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCartBar } from "@/components/cart/mobile-cart-bar";
import type { Settings } from "@/types";

interface PublicShellProps {
  children: React.ReactNode;
  settings: Settings;
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileCartBar />
    </div>
  );
}
