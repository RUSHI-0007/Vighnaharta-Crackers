import { Banknote, PhoneCall } from "lucide-react";

export function CodNotice({ totalFormatted }: { totalFormatted: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2 shadow-2xs">
      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
        <Banknote className="h-4 w-4 text-emerald-700" />
        <span>Cash on Delivery Notice</span>
      </div>
      <p className="leading-relaxed text-slate-600">
        Please keep the exact cash amount of <strong className="text-slate-900 font-mono">{totalFormatted}</strong> ready for the delivery partner or when collecting your package at the stall.
      </p>
      <div className="flex items-center gap-2 text-slate-500 pt-1 border-t border-slate-100">
        <PhoneCall className="h-3.5 w-3.5 text-red-700 shrink-0" />
        <span>Akshay Bendbhar will call you on your mobile number to confirm before dispatch.</span>
      </div>
    </div>
  );
}
