"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartSheet } from "@/components/cart/cart-sheet";
import { MobileCartBar } from "@/components/cart/mobile-cart-bar";
import type { Settings } from "@/types";

interface PublicShellProps {
  children: React.ReactNode;
  settings: Settings;
}

export function PublicShell({ children, settings }: PublicShellProps) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader onOpenCart={() => setCartOpen(true)} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        settings={settings}
      />
      <MobileCartBar onOpenCart={() => setCartOpen(true)} />
    </div>
  );
}

