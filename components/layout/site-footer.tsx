import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#202d3a] text-[#fff9f0] pt-12 pb-24 sm:pb-12 text-xs mt-auto">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-[#e9b94f]" />
              <div>
                <span className="font-heading font-semibold text-lg tracking-[2px] text-[#fff9f0] block">
                  VIGHNAHARTA
                </span>
                <span className="text-[9px] tracking-[3px] text-[#c6cdd2] font-semibold block uppercase">
                  CRACKERS • {siteConfig.name.mr}
                </span>
              </div>
            </div>
            <p className="text-[#c6cdd2] text-xs leading-relaxed">
              A neighbourhood shop for brighter festive moments. Thoughtfully selected, locally delivered at wholesale rates.
            </p>
            <div className="pt-1 text-[11px] text-[#c6cdd2] space-y-1">
              <p>
                <strong className="text-white">Proprietor:</strong> {siteConfig.owner.en}
              </p>
              <p className="flex items-center gap-1.5 text-[#c6cdd2]">
                <Clock className="h-3.5 w-3.5 text-[#e9b94f] shrink-0" />
                <span>Stall Open Daily: 8:00 AM – 10:00 PM</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              Explore Collection
            </h3>
            <ul className="space-y-2 text-xs text-[#c6cdd2]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Crackers
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="hover:text-white transition-colors">
                  Price List (Quick Order)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              Popular Categories
            </h3>
            <ul className="space-y-2 text-xs text-[#c6cdd2]">
              <li>
                <Link href="/shop?category=sparklers" className="hover:text-white transition-colors">
                  Sparklers (फुलबाजे)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flower-pots" className="hover:text-white transition-colors">
                  Flower Pots (अनार)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ground-chakkars" className="hover:text-white transition-colors">
                  Ground Chakkars (भुईचक्र)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sky-shots" className="hover:text-white transition-colors">
                  Aerial Fireworks (स्काय शॉट्स)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gift-boxes" className="hover:text-white transition-colors">
                  Festive Boxes (गिफ्ट बॉक्स)
                </Link>
              </li>
            </ul>
          </div>

          {/* Stall Details & Payment */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-1.5 border-b border-white/10">
              Stall & Payment
            </h3>
            <div className="flex items-start gap-2 text-[#c6cdd2]">
              <MapPin className="h-4 w-4 text-[#e9b94f] shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-white">{siteConfig.address.en}</span>
                <span className="text-[11px] text-[#c6cdd2]">{siteConfig.address.mr}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#e9b94f] shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-bold text-white hover:text-[#e9b94f] font-mono text-sm"
              >
                +91 {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#c6cdd2] pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>UPI (Google Pay/PhonePe) & COD Accepted</span>
            </div>
          </div>
        </div>

        {/* Bottom Rule & Legal */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#c6cdd2] text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name.en} ({siteConfig.name.mr}). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#c6cdd2]">
            <span>Proprietor: Akshay Bendbhar</span>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Owner Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
