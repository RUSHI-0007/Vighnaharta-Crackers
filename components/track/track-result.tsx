import type { OrderTrackingInfo } from "@/types";
import { OrderTimeline } from "@/components/track/order-timeline";
import { formatCurrency, formatDate } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, Clock, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrackResult({ order }: { order: OrderTrackingInfo }) {
  const isCod = order.payment_method === "cod";

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-4 gap-2">
        <div>
          <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
            ऑर्डर क्रमांक
          </span>
          <h2 className="font-mono text-xl sm:text-2xl font-extrabold text-primary">
            {order.order_code}
          </h2>
          <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3" />
            {formatDate(order.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={order.status === "cancelled" ? "destructive" : "gold"}>
            {order.status.toUpperCase()}
          </Badge>
          <Badge variant={order.payment_status === "paid" ? "success" : "secondary"}>
            {isCod ? "COD" : "UPI"} • {order.payment_status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Timeline */}
      <OrderTimeline status={order.status} adminNote={order.admin_note} />

      {/* Admin Note / ETA banner */}
      {order.admin_note && order.status !== "cancelled" && (
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
            <MessageSquareQuote className="h-4 w-4" />
            <span>दुकानदाराचा संदेश / ETA:</span>
          </div>
          <p className="text-xs text-foreground font-medium pl-5 leading-relaxed">
            {order.admin_note}
          </p>
        </div>
      )}

      {/* Delivery Address */}
      <div className="rounded-2xl bg-secondary/50 border border-border/60 p-4 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>डिलिव्हरीचा पत्ता:</span>
        </div>
        <p className="text-foreground pl-5 leading-relaxed font-medium">
          {order.address} {order.landmark ? `(जवळ: ${order.landmark})` : ""}
        </p>
      </div>

      {/* Ordered Items Table */}
      <div className="space-y-3">
        <h4 className="font-heading text-sm font-bold text-foreground">
          ऑर्डर केलेले फटाके ({order.items.length})
        </h4>
        <div className="divide-y divide-border/40 text-xs">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-bold text-foreground">{item.name_mr}</p>
                <p className="text-[11px] text-muted-foreground">
                  {item.qty} × {formatCurrency(item.unit_price)} ({item.unit})
                </p>
              </div>
              <span className="font-mono font-bold text-foreground">
                {formatCurrency(item.line_total)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-1 pt-3 border-t border-border/60 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>मूळ किंमत:</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount_total > 0 && (
            <div className="flex justify-between text-emerald-400 font-medium">
              <span>सूट बचत:</span>
              <span>-{formatCurrency(order.discount_total)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline font-bold text-sm text-foreground pt-1.5 border-t border-border/40">
            <span>एकूण देय रक्कम:</span>
            <span className="font-heading text-lg text-primary">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Shop CTA */}
      <div className="pt-2 border-t border-border/50 text-center">
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-all min-h-[44px]"
        >
          <Phone className="h-3.5 w-3.5 text-primary" />
          <span>काही अडचण आहे का? {siteConfig.phone} वर कॉल करा</span>
        </a>
      </div>
    </div>
  );
}
