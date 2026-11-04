"use client";

import type { OrderTrackingInfo } from "@/types";
import { OrderTimeline } from "@/components/track/order-timeline";
import { formatCurrency, formatDate } from "@/lib/format";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/translations";
import { Phone, MapPin, Clock, MessageSquareQuote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrackResult({ order }: { order: OrderTrackingInfo }) {
  const { locale } = useTranslation();
  const isCod = order.payment_method === "cod";

  return (
    <div className="rounded-2xl border border-[#e9e0d5] bg-white p-5 sm:p-7 space-y-6 text-left shadow-2xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e9e0d5] pb-4 gap-3">
        <div>
          <span className="text-[11px] text-[#737373] uppercase font-mono tracking-wider block">
            {locale === "mr" ? "ऑर्डर कोड" : "Order Code"}
          </span>
          <h2 className="font-mono text-xl sm:text-2xl font-black text-[#202d3a]">
            {order.order_code}
          </h2>
          <span className="text-xs text-[#737373] flex items-center gap-1.5 mt-0.5">
            <Clock className="h-3.5 w-3.5 text-[#b91c32]" />
            {locale === "mr" ? "दिनांक" : "Placed on"} {formatDate(order.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant={order.status === "cancelled" ? "destructive" : "secondary"}
            className="uppercase font-bold text-xs px-2.5 py-0.5 bg-[#f5eddf] text-[#202d3a] border-[#e9e0d5]"
          >
            {order.status.replace(/_/g, " ")}
          </Badge>
          <Badge
            variant="outline"
            className="uppercase font-bold text-xs px-2.5 py-0.5 border-[#b91c32] text-[#b91c32] bg-[#fbecef]"
          >
            {isCod ? "COD" : "UPI"} • {order.payment_status}
          </Badge>
        </div>
      </div>

      {/* Timeline */}
      <OrderTimeline status={order.status} adminNote={order.admin_note} />

      {/* Admin Note / ETA banner */}
      {order.admin_note && order.status !== "cancelled" && (
        <div className="rounded-xl border border-[#e9b94f]/40 bg-[#fff9f0] p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#202d3a]">
            <MessageSquareQuote className="h-4 w-4 text-[#e9b94f]" />
            <span>
              {locale === "mr" ? "स्टॉल मालकाची सूचना:" : "Note from Stall Owner:"}
            </span>
          </div>
          <p className="text-xs text-[#202d3a] font-medium pl-5 leading-relaxed">
            {order.admin_note}
          </p>
        </div>
      )}

      {/* Delivery Address */}
      <div className="rounded-xl bg-[#fff9f0] border border-[#e9e0d5] p-3.5 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-[#202d3a] font-semibold">
          <MapPin className="h-3.5 w-3.5 text-[#b91c32]" />
          <span>{locale === "mr" ? "डिलिव्हरी पत्ता:" : "Delivery Address:"}</span>
        </div>
        <p className="text-[#737373] pl-5 leading-relaxed">
          {order.address} {order.landmark ? `(खूण: ${order.landmark})` : ""}
        </p>
      </div>

      {/* Ordered Items Table */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#737373]">
          {locale === "mr" ? "ऑर्डर केलेले फटाके" : "Items Ordered"} ({order.items.length})
        </h4>
        <div className="divide-y divide-[#f5eddf] text-xs">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex justify-between items-center">
              <div>
                <p className="font-semibold text-[#202d3a]">
                  {locale === "mr" ? (item.name_mr || item.name_en) : (item.name_en || item.name_mr)}
                </p>
                <p className="text-[11px] text-[#737373]">
                  {item.qty} × {formatCurrency(item.unit_price)} ({item.unit})
                </p>
              </div>
              <span className="font-mono font-bold text-[#202d3a]">
                {formatCurrency(item.line_total)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals Breakdown */}
        <div className="space-y-1 pt-3 border-t border-[#e9e0d5] text-xs">
          <div className="flex justify-between text-[#737373]">
            <span>{locale === "mr" ? "मूळ किंमत (MRP):" : "MRP Subtotal:"}</span>
            <span className="font-mono">{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount_total > 0 && (
            <div className="flex justify-between text-[#b91c32] font-semibold">
              <span>{locale === "mr" ? "होलसेल बचत:" : "Wholesale Savings:"}</span>
              <span className="font-mono">-{formatCurrency(order.discount_total)}</span>
            </div>
          )}
          <div className="flex justify-between items-baseline font-bold text-sm text-[#202d3a] pt-1.5 border-t border-[#e9e0d5]">
            <span>{locale === "mr" ? "एकूण देय रक्कम:" : "Total Payable:"}</span>
            <span className="text-base font-black text-[#b91c32] font-mono">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Contact Stall */}
      <div className="pt-2 flex items-center justify-between border-t border-[#e9e0d5] text-xs">
        <span className="text-[#737373]">
          {locale === "mr" ? "या ऑर्डरबाबत काही शंका आहे का?" : "Questions about this order?"}
        </span>
        <a
          href={`tel:${siteConfig.phone}`}
          className="inline-flex items-center gap-1.5 font-bold text-[#b91c32] hover:underline"
        >
          <Phone className="h-3.5 w-3.5" />
          <span>
            {locale === "mr"
              ? `${siteConfig.owner.mr} यांना कॉल करा (${siteConfig.phone})`
              : `Call ${siteConfig.owner.en} (${siteConfig.phone})`}
          </span>
        </a>
      </div>
    </div>
  );
}
