"use client";

import { useState } from "react";
import { StatusUpdateDialog } from "@/components/admin/orders/status-update-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, Check, XCircle, AlertTriangle } from "lucide-react";
import type { OrderStatus, PaymentMethod, PaymentStatus } from "@/types";

interface OrderStatusActionsProps {
  orderId: string;
  orderCode: string;
  currentStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
}

export function OrderStatusActions({
  orderId,
  orderCode,
  currentStatus,
  paymentMethod,
}: OrderStatusActionsProps) {
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    targetStatus: OrderStatus;
    targetPaymentStatus?: PaymentStatus;
    title: string;
    description: string;
    noteRequired?: boolean;
    defaultNote?: string;
  }>({
    open: false,
    targetStatus: "confirmed",
    title: "",
    description: "",
  });

  const isUpi = paymentMethod === "upi_qr";
  const isCod = paymentMethod === "cod";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 1. Pending State Actions */}
      {currentStatus === "pending" && (
        <>
          {isUpi && (
            <Button
              size="sm"
              onClick={() =>
                setDialogState({
                  open: true,
                  targetStatus: "confirmed",
                  targetPaymentStatus: "paid",
                  title: "Verify UPI Payment & Confirm Order",
                  description:
                    "This verifies the customer's UPI screenshot and marks payment status as Paid.",
                  defaultNote: "Payment screenshot verified. Order confirmed.",
                })
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Verify Payment & Confirm</span>
            </Button>
          )}

          {isCod && (
            <Button
              size="sm"
              onClick={() =>
                setDialogState({
                  open: true,
                  targetStatus: "confirmed",
                  title: "Confirm Cash on Delivery Order",
                  description:
                    "Confirm this COD order for packing and delivery.",
                  defaultNote: "Order confirmed for cash on delivery.",
                })
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <Check className="h-4 w-4" />
              <span>Confirm Order</span>
            </Button>
          )}

          {isUpi && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setDialogState({
                  open: true,
                  targetStatus: "cancelled",
                  targetPaymentStatus: "failed",
                  title: "Reject Payment Screenshot",
                  description:
                    "Reject this payment screenshot and cancel the order. A reason is required.",
                  noteRequired: true,
                  defaultNote: "Invalid or duplicate UPI screenshot.",
                })
              }
              className="border-destructive/40 text-destructive hover:bg-destructive/10 gap-1.5"
            >
              <XCircle className="h-4 w-4" />
              <span>Reject Payment</span>
            </Button>
          )}
        </>
      )}

      {/* 2. Confirmed State Actions */}
      {currentStatus === "confirmed" && (
        <Button
          size="sm"
          onClick={() =>
            setDialogState({
              open: true,
              targetStatus: "out_for_delivery",
              title: "Dispatch for Delivery",
              description:
                "Hand over crackers to the delivery representative. You can enter an estimated arrival time.",
              defaultNote: "Out for delivery. Expected to arrive within 2-4 hours.",
            })
          }
          className="bg-sky-600 hover:bg-sky-700 text-white gap-1.5"
        >
          <Truck className="h-4 w-4" />
          <span>Out for Delivery</span>
        </Button>
      )}

      {/* 3. Out for Delivery State Actions */}
      {currentStatus === "out_for_delivery" && (
        <Button
          size="sm"
          onClick={() =>
            setDialogState({
              open: true,
              targetStatus: "delivered",
              targetPaymentStatus: isCod ? "paid" : undefined,
              title: "Mark Order Delivered",
              description: isCod
                ? "Confirm delivery and that cash payment was collected in full."
                : "Confirm delivery of crackers to the customer.",
              defaultNote: isCod
                ? "Delivered successfully. Cash payment collected."
                : "Delivered successfully.",
            })
          }
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Mark Delivered {isCod ? "(Cash Collected)" : ""}</span>
        </Button>
      )}

      {/* 4. Cancel action for any non-delivered state */}
      {currentStatus !== "delivered" && currentStatus !== "cancelled" && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            setDialogState({
              open: true,
              targetStatus: "cancelled",
              title: "Cancel Order",
              description:
                "Cancel this order. Please state a clear reason for the customer.",
              noteRequired: true,
              defaultNote: "Cancelled on customer request.",
            })
          }
          className="text-destructive hover:bg-destructive/10 gap-1"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Cancel Order</span>
        </Button>
      )}

      <StatusUpdateDialog
        open={dialogState.open}
        onOpenChange={(open) => setDialogState((prev) => ({ ...prev, open }))}
        orderId={orderId}
        orderCode={orderCode}
        targetStatus={dialogState.targetStatus}
        targetPaymentStatus={dialogState.targetPaymentStatus}
        title={dialogState.title}
        description={dialogState.description}
        noteRequired={dialogState.noteRequired}
        defaultNote={dialogState.defaultNote}
      />
    </div>
  );
}
