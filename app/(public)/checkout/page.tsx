import { getSettings } from "@/queries/settings";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { Truck } from "lucide-react";

export default async function CheckoutPage() {
  const settings = await getSettings();

  return (
    <div className="bg-[#f8fafc] min-h-[calc(100vh-160px)] py-6 sm:py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Title */}
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Enter your delivery details and choose UPI QR code or Cash on Delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <CheckoutForm settings={settings} />
          </div>

          {/* Right Column: Order Summary & Delivery Notes */}
          <div className="lg:col-span-5 space-y-4">
            <OrderSummary />

            {/* Delivery Note from DB Settings */}
            {settings.delivery_note && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <Truck className="h-4 w-4 text-emerald-700" />
                  <span>Stall Delivery Policy</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  {settings.delivery_note}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
