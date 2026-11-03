import { getOrders, getOrderCountsByStatus } from "@/queries/orders";
import { PageHeader } from "@/components/admin/shell/page-header";
import { OrdersTable } from "@/components/admin/orders/orders-table";
import { AutoRefresh } from "@/components/admin/orders/auto-refresh";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const [orders, statusCounts] = await Promise.all([
    getOrders(),
    getOrderCountsByStatus(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="View and verify incoming customer orders, payment status, and dispatch deliveries."
      >
        <AutoRefresh intervalSeconds={30} />
      </PageHeader>

      <OrdersTable orders={orders} statusCounts={statusCounts} />
    </div>
  );
}

