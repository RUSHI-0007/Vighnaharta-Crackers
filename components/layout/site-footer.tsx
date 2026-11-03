import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, User, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-[#06091d] pb-24 sm:pb-12 pt-14 mt-auto">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Shop details */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                {siteConfig.name.en}
              </h2>
            </div>
            <p className="text-xs text-amber-400 font-medium">
              {siteConfig.name.mr}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {siteConfig.tagline.en}. Sivakasi-tested safe firecrackers for family Diwali celebrations.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <User className="h-4 w-4 text-accent shrink-0" />
              <span>Proprietor: <strong className="text-foreground">{siteConfig.owner.en}</strong> ({siteConfig.owner.mr})</span>
            </div>
          </div>

          {/* Col 2: Stall Location */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              Stall Location
            </h3>
            <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="block text-foreground font-medium">{siteConfig.address.en}</span>
                <span className="text-[11px] text-muted-foreground">{siteConfig.address.mr}</span>
              </div>
            </div>
            <div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              Contact & Hours
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-primary transition-colors font-mono font-bold text-foreground">
                +91 {siteConfig.phone}
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Stall Timings:</span><br />
              8:00 AM – 10:00 PM Daily (Diwali Season)
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>UPI & Cash on Delivery Accepted</span>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors font-medium">
                  Browse All Firecrackers
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-primary transition-colors font-medium">
                  Track Order Status
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-primary transition-colors font-medium">
                  Checkout & Payment
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-muted-foreground/70 transition-colors">
                  Stall Owner Login
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground/70 gap-2 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {siteConfig.name.en} ({siteConfig.name.mr}). All rights reserved.</p>
          <p className="text-[11px]">Certified Sivakasi Fireworks • Safe Diwali Celebrations</p>
        </div>
      </div>
    </footer>
  );
}
