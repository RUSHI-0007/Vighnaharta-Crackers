import type { PaymentMethod, PaymentStatus } from "@/types";

export function PaymentBadge({
  method,
  status,
}: {
  method: PaymentMethod;
  status: PaymentStatus;
}) {
  const isPaid = status === "paid";
  const isFailed = status === "failed";
  const methodLabel = method === "cod" ? "COD" : "UPI";

  let statusColor = "bg-amber-500/20 text-amber-300 border-amber-500/40";
  if (isPaid) {
    statusColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
  } else if (isFailed) {
    statusColor = "bg-destructive/20 text-destructive border-destructive/40";
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-mono font-semibold ${statusColor}`}
    >
      <span>{methodLabel}</span>
      <span className="opacity-50">•</span>
      <span className="capitalize">{status}</span>
    </span>
  );
}
