import type { OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="warning" className="uppercase font-bold tracking-wider text-[10px]">
          Pending
        </Badge>
      );
    case "confirmed":
      return (
        <Badge variant="success" className="uppercase font-bold tracking-wider text-[10px]">
          Confirmed
        </Badge>
      );
    case "out_for_delivery":
      return (
        <Badge variant="default" className="bg-sky-500 text-white uppercase font-bold tracking-wider text-[10px]">
          Out for Delivery
        </Badge>
      );
    case "delivered":
      return (
        <Badge variant="success" className="bg-emerald-600 text-white uppercase font-bold tracking-wider text-[10px]">
          Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="destructive" className="uppercase font-bold tracking-wider text-[10px]">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

