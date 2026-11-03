import { Banknote, PhoneCall } from "lucide-react";

export function CodNotice({ totalFormatted }: { totalFormatted: string }) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 space-y-2.5 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
        <Banknote className="h-4 w-4" />
        <span>Cash on Delivery (COD) Instructions</span>
      </div>
      <p className="leading-relaxed">
        Please keep the exact cash amount of <strong>{totalFormatted}</strong> ready to hand over to our delivery partner upon receipt of your firecrackers.
      </p>
      <div className="flex items-center gap-2 text-amber-300/90 font-medium pt-1">
        <PhoneCall className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span>Our stall team will call your mobile number before packing and dispatching your order.</span>
      </div>
    </div>
  );
}
