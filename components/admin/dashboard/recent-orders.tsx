import Link from "next/link";
import type { Order } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "@/components/admin/orders/order-status-badge";
import { PaymentBadge } from "@/components/admin/orders/payment-badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShoppingBag } from "lucide-react";

export function RecentOrders({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            Recent Orders
          </h3>
          <p className="text-xs text-muted-foreground">
            Latest incoming customer orders
          </p>
        </div>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
            <span>View All</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <div className="divide-y divide-border/40">
        {orders.slice(0, 6).map((order) => (
          <Link
            key={order.id}
            href={`/admin/orders/${order.id}`}
            className="flex items-center justify-between py-3 hover:bg-secondary/20 rounded-xl px-2 transition-colors gap-2"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-foreground">
                  {order.order_code}
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {order.customer_name} • {formatDate(order.created_at)}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-heading text-sm font-bold text-primary block">
                {formatCurrency(order.total)}
              </span>
              <PaymentBadge
                method={order.payment_method}
                status={order.payment_status}
              />
            </div>
          </Link>
        ))}

        {orders.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-xs">
            <ShoppingBag className="h-6 w-6 mx-auto mb-2 opacity-40" />
            <p>No orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

