"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { updateOrderStatusAction } from "@/actions/orders";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { OrderStatus, PaymentStatus } from "@/types";

interface StatusUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  orderCode: string;
  targetStatus: OrderStatus;
  targetPaymentStatus?: PaymentStatus;
  title: string;
  description: string;
  noteRequired?: boolean;
  defaultNote?: string;
}

export function StatusUpdateDialog({
  open,
  onOpenChange,
  orderId,
  orderCode,
  targetStatus,
  targetPaymentStatus,
  title,
  description,
  noteRequired = false,
  defaultNote = "",
}: StatusUpdateDialogProps) {
  const [note, setNote] = useState(defaultNote);
  const [sendEmail, setSendEmail] = useState(true);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();

    if (noteRequired && !note.trim()) {
      toast.error("Please provide a note/reason.");
      return;
    }

    startTransition(async () => {
      const res = await updateOrderStatusAction({
        orderId,
        newStatus: targetStatus,
        newPaymentStatus: targetPaymentStatus,
        adminNote: note.trim() || null,
        sendCustomerEmail: sendEmail,
      });

      if (res.ok) {
        toast.success(`Order ${orderCode} updated to ${targetStatus}!`);
        if (res.emailWarning) {
          toast.warning(res.emailWarning);
        }
        onOpenChange(false);
      } else {
        toast.error(res.error || "Failed to update order status.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirm} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="admin_note">
              Note for Customer {noteRequired ? "*" : "(Optional ETA / Message)"}
            </Label>
            <Textarea
              id="admin_note"
              required={noteRequired}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={
                noteRequired
                  ? "e.g. UPI transaction ID mismatch, cancelled on customer request..."
                  : "e.g. Arriving by 6:00 PM today, call on arrival..."
              }
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="send_email"
              checked={sendEmail}
              onCheckedChange={(checked) => setSendEmail(Boolean(checked))}
            />
            <Label htmlFor="send_email" className="text-xs cursor-pointer font-medium">
              Email status update to customer (checked by default)
            </Label>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant={targetStatus === "cancelled" ? "destructive" : "default"}
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
              Confirm Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
