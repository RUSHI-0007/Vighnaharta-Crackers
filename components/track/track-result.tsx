import type { OrderTrackingInfo } from "@/types";
import { OrderTimeline } from "@/components/track/order-timeline";
import { formatCurrency, formatDate } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, Clock, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrackResult({ order }: { order: OrderTrackingInfo }) {
  const isCod = order.payment_method === "cod";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6 text-left shadow-2xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider block">
            Order Code
          </span>
          <h2 className="font-mono text-xl sm:text-2xl font-black text-slate-900">
            {order.order_code}
          </h2>
          <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Clock className="h-3.5 w-3.5" />
            Placed on {formatDate(order.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={order.status === "cancelled" ? "destructive" : "secondary"} className="uppercase font-bold text-xs px-2.5 py-0.5">
            {order.status.replace(/_/g, " ")}
          </Badge>
          <Badge variant={order.payment_status === "paid" ? "success" : "outline"} className="uppercase font-bold text-xs px-2.5 py-0.5">
            {isCod ? "COD" : "UPI"} • {order.payment_status}
          </Badge>
        </div>
      </div>

      {/* Timeline */}
      <OrderTimeline status={order.status} adminNote={order.admin_note} />

      {/* Admin Note / ETA banner */}
      {order.admin_note && order.status !== "cancelled" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <MessageSquareQuote className="h-4 w-4 text-amber-700" />
            <span>Note from Stall Owner:</span>
          </div>
          <p className="text-xs text-amber-950 font-medium pl-5 leading-relaxed">
            {order.admin_note}
          </p>
        </div>
      )}

      {/* Delivery Address */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
          <MapPin className="h-3.5 w-3.5 text-red-700" />
          <span>Delivery Address:</span>
        </div>
        <p className="text-slate-800 pl-5 leading-relaxed">
          {order.address} {order.landmark ? `(Landmark: ${order.landmark})` : ""}
        </p>
      </div>

      {/* Ordered Items Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Items Ordered ({order.items.length})
        </h4>
        <div className="divide-y divide-slate-100 text-xs">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">{item.name_en || item.name_mr}</p>
                <p className="text-[11px] text-slate-500">
                  {item.qty} × {formatCurrency(item.unit_price)} ({item.unit})
                </p>
              </div>
              <span className="font-mono font-bold text-slate-900">
                {formatCurrency(item.line_total)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-1 pt-3 border-t border-slate-200 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>MRP Subtotal:</span>
            <span className="font-mono">{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount_total > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Wholesale Savings:</span>
              <span className="font-mono">-{formatCurrency(order.discount_total)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline font-bold text-sm text-slate-900 pt-1.5 border-t border-slate-100">
            <span>Total Payable:</span>
            <span className="text-base font-black text-emerald-700 font-mono">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Shop CTA */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-800 transition-all"
        >
          <Phone className="h-3.5 w-3.5 text-red-700" />
          <span>Need help with this order? Call {siteConfig.phone}</span>
        </a>
      </div>
    </div>
  );
}
