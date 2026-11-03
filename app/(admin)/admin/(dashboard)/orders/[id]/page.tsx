import { notFound } from "next/navigation";
import { getOrderById } from "@/queries/orders";
import { getScreenshotSignedUrl } from "@/lib/storage";
import { OrderDetail } from "@/components/admin/orders/order-detail";

export const dynamic = "force-dynamic";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  let signedUrl: string | null = null;
  if (order.screenshot_path) {
    signedUrl = await getScreenshotSignedUrl(order.screenshot_path);
  }

  return <OrderDetail order={order} screenshotSignedUrl={signedUrl} />;
}

