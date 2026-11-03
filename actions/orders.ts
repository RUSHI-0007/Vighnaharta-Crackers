"use server";

import { verifyAdminSession } from "@/actions/auth";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email/mailer";
import { customerStatusUpdateEmail } from "@/lib/email/templates/customer-status-update";
import type { OrderStatus, PaymentStatus } from "@/types";

export async function updateOrderStatusAction(params: {
  orderId: string;
  newStatus: OrderStatus;
  newPaymentStatus?: PaymentStatus;
  adminNote?: string | null;
  sendCustomerEmail: boolean;
}): Promise<{ ok: boolean; error?: string; emailWarning?: string }> {
  try {
    const { supabase } = await verifyAdminSession();

    // 1. Fetch current order
    const { data: order, error: fetchErr } = await supabase
      .from("orders")
      .select("id, order_code, customer_name, customer_email, payment_method, payment_status, status")
      .eq("id", params.orderId)
      .single();

    if (fetchErr || !order) {
      return { ok: false, error: "Order not found." };
    }

    // Determine payment_status
    let finalPaymentStatus = params.newPaymentStatus || order.payment_status;

    // Business rules:
    // When UPI payment is verified and confirmed: payment_status = paid
    if (params.newStatus === "confirmed" && order.payment_method === "upi_qr") {
      finalPaymentStatus = "paid";
    }
    // When COD is marked delivered: payment_status = paid
    if (params.newStatus === "delivered" && order.payment_method === "cod") {
      finalPaymentStatus = "paid";
    }
    // When UPI is rejected: payment_status = failed
    if (params.newStatus === "cancelled" && params.newPaymentStatus === "failed") {
      finalPaymentStatus = "failed";
    }

    // 2. Update order row
    const { error: updateErr } = await supabase
      .from("orders")
      .update({
        status: params.newStatus,
        payment_status: finalPaymentStatus,
        admin_note: params.adminNote ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.orderId);

    if (updateErr) {
      return { ok: false, error: updateErr.message };
    }

    revalidatePath(`/admin/orders/${params.orderId}`);
    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    // 3. Optional Customer Email
    let emailWarning: string | undefined;
    if (params.sendCustomerEmail && order.customer_email) {
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const emailContent = customerStatusUpdateEmail(
          order.order_code,
          order.customer_name,
          params.newStatus,
          params.adminNote ?? null,
          siteUrl
        );

        const emailResult = await sendEmail({
          to: order.customer_email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (!emailResult.ok) {
          emailWarning = "Status updated, but email could not be delivered to the customer.";
        }
      } catch (err) {
        console.error("[Order Status Action] Email error:", err);
        emailWarning = "Status updated, but email sending failed.";
      }
    }

    return { ok: true, emailWarning };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Failed to update order status.",
    };
  }
}

