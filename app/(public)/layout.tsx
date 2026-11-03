import { getSettings } from "@/queries/settings";
import { PublicShell } from "@/components/layout/public-shell";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return <PublicShell settings={settings}>{children}</PublicShell>;
}
