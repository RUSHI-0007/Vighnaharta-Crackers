import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, Clock, ShieldCheck, Flame, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-12 pb-24 sm:pb-12 text-xs text-slate-600 mt-auto">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10">
          
          {/* Col 1: Shop details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black">
                <Flame className="h-5 w-5 fill-white text-amber-200" />
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm tracking-tight block">
                  {siteConfig.name.en}
                </span>
                <span className="text-[10px] text-red-700 font-semibold block">
                  {siteConfig.name.mr}
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed">
              Wholesale Sivakasi firecrackers direct to families & festival organisers. Certified, safe, and factory-priced crackers for Diwali 2026.
            </p>

            <div className="pt-1 text-[11px] text-slate-600 space-y-1">
              <p>
                <strong>Proprietor:</strong> {siteConfig.owner.en} ({siteConfig.owner.mr})
              </p>
              <p className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>Stall Open Daily: 8:00 AM – 10:00 PM</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Home Page</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Buy Crackers (Full Catalog)</span>
                </Link>
              </li>
              <li>
                <Link href="/price-list" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Quick Shop / Price List</span>
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Shopping Cart</span>
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Track Your Order</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-700 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="h-3 w-3 text-amber-500" />
                  <span>Stall Location & Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop?category=sparklers" className="hover:text-red-700 transition-colors">
                  Sparklers (फुलबाजे)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=flower-pots" className="hover:text-red-700 transition-colors">
                  Flower Pots (अनार)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ground-chakkars" className="hover:text-red-700 transition-colors">
                  Ground Chakkars (भुईचक्र)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=rockets" className="hover:text-red-700 transition-colors">
                  Rockets & Parachutes (रॉकेट)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sound-crackers" className="hover:text-red-700 transition-colors">
                  Sound Crackers & Lad (आवाज फटाके)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sky-shots" className="hover:text-red-700 transition-colors">
                  Aerial Sky Shots (स्काय शॉट्स)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=gift-boxes" className="hover:text-red-700 transition-colors">
                  Family Gift Boxes (गिफ्ट बॉक्स)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Stall Location & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Stall Address & Support
            </h3>
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="h-4 w-4 text-red-700 shrink-0 mt-0.5" />
              <div>
                <span className="block font-semibold text-slate-900">{siteConfig.address.en}</span>
                <span className="text-[11px] text-slate-500">{siteConfig.address.mr}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-700 shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-bold text-slate-900 hover:text-red-700 font-mono text-sm"
              >
                +91 {siteConfig.phone}
              </a>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent("Hello Akshay, I want to inquire about Diwali firecrackers at Vighnaharta Stall.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-600 text-white font-semibold text-xs px-3 py-2 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>UPI (GPay/PhonePe) & Cash Accepted</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name.en} ({siteConfig.name.mr}). All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Stall Managed by Akshay Bendbhar</span>
            <Link href="/admin/login" className="hover:text-slate-800 transition-colors">
              Owner Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
