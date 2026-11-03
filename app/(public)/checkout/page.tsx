import { getSettings } from "@/queries/settings";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { Truck, Sparkles } from "lucide-react";

export default async function CheckoutPage() {
  const settings = await getSettings();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* Title */}
      <div className="mb-8 space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Secure Guest Checkout</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter your delivery details and choose UPI or Cash on Delivery to place your firecracker order.
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
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 text-xs text-primary/90 space-y-2">
              <div className="flex items-center gap-2 font-bold text-primary text-sm">
                <Truck className="h-4 w-4" />
                <span>Stall Delivery & Pickup Notice</span>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {settings.delivery_note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
