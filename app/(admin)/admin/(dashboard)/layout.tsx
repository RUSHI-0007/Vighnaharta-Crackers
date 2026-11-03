import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/shell/admin-sidebar";
import { AdminMobileNav } from "@/components/admin/shell/admin-mobile-nav";
import { siteConfig } from "@/config/site";
import { logoutAction } from "@/actions/auth";
import Link from "next/link";
import { ExternalLink, LogOut, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | विघ्नहर्ता फटाका स्टॉल",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Mobile Top Header */}
        <header className="lg:hidden sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card/90 px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-heading text-sm font-bold truncate">
              {siteConfig.name.mr} (Admin)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="View shop"
            >
              <ExternalLink className="h-4 w-4 text-accent" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="p-2 text-muted-foreground hover:text-destructive"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminMobileNav />
    </div>
  );
}

