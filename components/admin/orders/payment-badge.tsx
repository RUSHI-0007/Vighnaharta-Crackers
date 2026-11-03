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

  let statusColor = "bg-amber-100 text-amber-900 border-amber-300";
  if (isPaid) {
    statusColor = "bg-emerald-100 text-emerald-900 border-emerald-300";
  } else if (isFailed) {
    statusColor = "bg-rose-100 text-rose-900 border-rose-300";
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
