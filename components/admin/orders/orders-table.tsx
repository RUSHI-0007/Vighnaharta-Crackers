"use client";

import { useState } from "react";
import Link from "next/link";
import type { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "@/components/admin/orders/order-status-badge";
import { PaymentBadge } from "@/components/admin/orders/payment-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronRight, ShoppingBag, Eye } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  statusCounts: Record<string, number>;
}

export function OrdersTable({ orders, statusCounts }: OrdersTableProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesTab = activeTab === "all" || o.status === activeTab;
    const matchesPayment =
      paymentFilter === "all" || o.payment_method === paymentFilter;
    const matchesSearch =
      search === "" ||
      o.order_code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);

    return matchesTab && matchesPayment && matchesSearch;
  });

  const tabs: Array<{ key: string; label: string }> = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-4">
      {/* Status Tabs */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-1 select-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = statusCounts[tab.key] ?? 0;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-all min-h-[38px] cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-card border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isActive ? "bg-white/25 text-white" : "bg-secondary text-accent"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Payment Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by code, customer name, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-full sm:w-48 h-11">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="upi_qr">UPI QR</SelectItem>
            <SelectItem value="cod">Cash on Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Code</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const isPending = order.status === "pending";

              return (
                <TableRow
                  key={order.id}
                  className={isPending ? "bg-amber-500/5 hover:bg-amber-500/10" : undefined}
                >
                  <TableCell className="font-mono font-bold text-foreground">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="hover:text-primary transition-colors hover:underline"
                    >
                      {order.order_code}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(order.created_at)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold text-foreground text-sm">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {order.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <PaymentBadge
                      method={order.payment_method}
                      status={order.payment_status}
                    />
                  </TableCell>
                  <TableCell className="font-heading font-bold text-primary text-base">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button size="sm" variant="outline" className="h-9 px-3 gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No orders match the current filters.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Stacked Cards (Optimized for 360px phones) */}
      <div className="md:hidden space-y-3">
        {filteredOrders.map((order) => {
          const isPending = order.status === "pending";

          return (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className={`block rounded-2xl border p-4 bg-card hover:border-primary/50 transition-all space-y-3 ${
                isPending ? "border-amber-500/40 bg-amber-500/5" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-sm font-extrabold text-foreground">
                    {order.order_code}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-border/50 text-xs">
                <div>
                  <p className="font-bold text-foreground">{order.customer_name}</p>
                  <p className="text-muted-foreground font-mono text-[11px]">{order.phone}</p>
                </div>

                <div className="text-right">
                  <span className="font-heading font-bold text-base text-primary block">
                    {formatCurrency(order.total)}
                  </span>
                  <PaymentBadge
                    method={order.payment_method}
                    status={order.payment_status}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-1 text-xs text-primary font-bold pt-1">
                <span>View Order Details</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
