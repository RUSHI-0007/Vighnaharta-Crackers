import { getCustomers } from "@/queries/customers";
import { PageHeader } from "@/components/admin/shell/page-header";
import { CustomersTable } from "@/components/admin/customers/customers-table";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="View past buyers, order counts, lifetime spending, and export customer contacts."
      />
      <CustomersTable customers={customers} />
    </div>
  );
}

