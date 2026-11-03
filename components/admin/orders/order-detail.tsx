"use client";

import Link from "next/link";
import type { OrderWithItems } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "@/components/admin/orders/order-status-badge";
import { PaymentBadge } from "@/components/admin/orders/payment-badge";
import { OrderStatusActions } from "@/components/admin/orders/order-status-actions";
import { ScreenshotViewer } from "@/components/admin/orders/screenshot-viewer";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Clock,
  User,
  ShoppingBag,
  FileText,
} from "lucide-react";

interface OrderDetailProps {
  order: OrderWithItems;
  screenshotSignedUrl: string | null;
}

export function OrderDetail({ order, screenshotSignedUrl }: OrderDetailProps) {
  const isCod = order.payment_method === "cod";
  const whatsappUrl = `https://wa.me/91${order.phone}?text=${encodeURIComponent(
    `नमस्कार ${order.customer_name}, विघ्नहर्ता फटाका स्टॉलवरून आपल्या ऑर्डर (${order.order_code}) संदर्भात संदेश.`
  )}`;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders">
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Orders</span>
            </Button>
          </Link>
          <div>
            <h1 className="font-mono text-xl sm:text-2xl font-extrabold text-foreground">
              {order.order_code}
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
              <Clock className="h-3 w-3" />
              <span>{formatDate(order.created_at)}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge status={order.status} />
          <PaymentBadge
            method={order.payment_method}
            status={order.payment_status}
          />
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-foreground">
            Current Status: {order.status.toUpperCase()}
          </span>
          <p className="text-xs text-muted-foreground">
            Use the actions below to transition this order and optionally notify the customer.
          </p>
        </div>

        <OrderStatusActions
          orderId={order.id}
          orderCode={order.order_code}
          currentStatus={order.status}
          paymentMethod={order.payment_method}
          paymentStatus={order.payment_status}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customer & Items */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Details Card */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm border-b border-border/50 pb-2.5">
              <User className="h-4 w-4" />
              <span>Customer & Delivery Details</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-muted-foreground">Customer Name</p>
                <p className="text-sm font-bold text-foreground">{order.customer_name}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={`tel:${order.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary text-primary-foreground px-3.5 py-2 font-bold text-xs hover:bg-primary/90 transition-all min-h-[38px]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call +91 {order.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white px-3.5 py-2 font-bold text-xs hover:bg-emerald-700 transition-all min-h-[38px]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${order.customer_email}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[38px]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[180px]">{order.customer_email}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-border/40">
                <p className="text-muted-foreground">Delivery Address</p>
                <p className="text-foreground font-medium text-sm leading-relaxed mt-0.5">
                  {order.address} {order.landmark ? `(Landmark: ${order.landmark})` : ""}
                </p>
                {order.lat && order.lng && (
                  <a
                    href={`https://maps.google.com/?q=${order.lat},${order.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent font-semibold hover:underline mt-2"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>View Customer GPS Location in Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {order.notes && (
                <div className="rounded-xl border border-border/80 bg-secondary/40 p-3">
                  <span className="font-bold text-foreground block mb-0.5">Customer Notes:</span>
                  <p className="text-muted-foreground leading-relaxed">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Items Table */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm border-b border-border/50 pb-2.5">
              <ShoppingBag className="h-4 w-4" />
              <span>Items Snapshot ({order.items.length})</span>
            </div>

            <div className="divide-y divide-border/40 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground text-sm">{item.name_mr}</p>
                    <p className="text-muted-foreground text-xs">{item.name_en} • {item.unit}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {item.qty} × {formatCurrency(item.unit_price)}{" "}
                      {item.mrp > item.unit_price && (
                        <span className="line-through opacity-70">
                          (MRP: {formatCurrency(item.mrp)})
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-sm text-foreground">
                    {formatCurrency(item.line_total)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Summary */}
            <div className="pt-3 border-t border-border/60 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>MRP Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              {order.discount_total > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Discount Total:</span>
                  <span>-{formatCurrency(order.discount_total)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-border/40 font-bold text-sm text-foreground">
                <span>Grand Total:</span>
                <span className="font-heading text-xl text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Screenshot */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <span className="font-bold text-sm text-foreground">
                Payment Verification
              </span>
              <PaymentBadge
                method={order.payment_method}
                status={order.payment_status}
              />
            </div>

            {isCod ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs space-y-1 text-amber-200">
                <span className="font-bold block text-sm text-amber-300">
                  Cash on Delivery (COD)
                </span>
                <p>
                  Collect <strong>{formatCurrency(order.total)}</strong> in cash upon delivery of fireworks.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs space-y-1">
                  <span className="font-bold text-accent block">UPI Payment</span>
                  <p className="text-muted-foreground">
                    Verify the screenshot below against your bank or UPI transaction history before dispatch.
                  </p>
                </div>

                <ScreenshotViewer
                  signedUrl={screenshotSignedUrl}
                  orderCode={order.order_code}
                />
              </div>
            )}
          </div>

          {/* Admin Note if present */}
          {order.admin_note && (
            <div className="rounded-2xl border border-accent/40 bg-card p-4 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-accent">
                <FileText className="h-4 w-4" />
                <span>Saved Stall Note / Reason:</span>
              </div>
              <p className="text-foreground pl-5 font-medium leading-relaxed">
                {order.admin_note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

