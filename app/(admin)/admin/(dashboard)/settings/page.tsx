import { getSettings } from "@/queries/settings";
import { PageHeader } from "@/components/admin/shell/page-header";
import { SettingsForm } from "@/components/admin/settings/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure payment methods (UPI & COD), stall UPI ID, QR code image, and minimum order rules."
      />
      <SettingsForm initialSettings={settings} />
    </div>
  );
}

