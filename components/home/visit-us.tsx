import { siteConfig } from "@/config/site";
import { Tag, Truck, Gift, ShieldCheck, Phone, MessageCircle } from "lucide-react";

export function VisitUs() {
  return (
    <section className="py-10 sm:py-14 bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        
        {/* Stall Notice & Direct WhatsApp Callout Banner (like Anil Crackers Screenshot 3) */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-2 text-center md:text-left">
              <span className="inline-block bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
                Direct Stall Contact
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Shop Diwali Crackers & Celebrate with Joy
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                Get genuine Sivakasi firecrackers at factory wholesale rates for your family, society, and Diwali celebrations. Call or WhatsApp Akshay Bendbhar directly for questions or bulk bookings.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5 justify-center">
              <a
                href={`https://wa.me/91${siteConfig.phone}?text=${encodeURIComponent("Hello Akshay, I would like to order crackers from Vighnaharta Fataka Stall.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm px-4 py-2.5 shadow-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4 fill-emerald-950" />
                <span>WhatsApp: {siteConfig.phone}</span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 border border-white/20 transition-colors"
              >
                <Phone className="h-4 w-4 text-amber-300" />
                <span>Call Akshay Bendbhar</span>
              </a>
            </div>

          </div>
        </div>

        {/* 4 Feature Badges (Matching Anil Crackers Screenshot 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Best Prices & Offers</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Direct wholesale rates with up to 50% discount on Sivakasi fireworks.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Door Delivery & Pickup</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Stall pickup in 30 mins or doorstep delivery in Ganegaon & nearby areas.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Diwali Special Deals</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                Special combo family packs & seasonal assortment packages.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-100">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Wide Crackers Collection</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                100% genuine Sivakasi fireworks certified for safety and quality.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
