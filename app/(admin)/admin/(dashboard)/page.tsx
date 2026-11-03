import Link from "next/link";
import { getOrders, getOrderCountsByStatus } from "@/queries/orders";
import { getCustomers } from "@/queries/customers";
import { PageHeader } from "@/components/admin/shell/page-header";
import { StatCard } from "@/components/admin/dashboard/stat-card";
import { RecentOrders } from "@/components/admin/dashboard/recent-orders";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Clock,
  IndianRupee,
  Users,
  Plus,
  ExternalLink,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [orders, statusCounts, customers] = await Promise.all([
    getOrders({ limit: 50 }),
    getOrderCountsByStatus(),
    getCustomers(),
  ]);

  // Compute Today's Metrics
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaysOrders = orders.filter((o) => o.created_at.startsWith(todayStr));
  const todaysRevenue = todaysOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        description="Daily firecracker sales performance and pending fulfillment status."
      >
        <div className="flex items-center gap-2">
          <Link href="/admin/products/new">
            <Button size="sm" className="gap-1.5 h-9">
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Button>
          </Link>
          <Link href="/" target="_blank">
            <Button size="sm" variant="outline" className="gap-1.5 h-9">
              <span>View Shop</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Orders"
          value={todaysOrders.length}
          icon={ShoppingBag}
          description="Orders received today"
          accentColor="primary"
        />

        <StatCard
          title="Pending Verification"
          value={statusCounts.pending || 0}
          icon={Clock}
          description="Requires owner action"
          accentColor="warning"
        />

        <StatCard
          title="Today's Revenue"
          value={todaysRevenue}
          prefix="₹"
          icon={IndianRupee}
          description="Excluding cancelled"
          accentColor="accent"
        />

        <StatCard
          title="Total Customers"
          value={customers.length}
          icon={Users}
          description="Unique buyers by phone"
          accentColor="success"
        />
      </div>

      {/* Recent Orders List */}
      <RecentOrders orders={orders} />
    </div>
  );
}

