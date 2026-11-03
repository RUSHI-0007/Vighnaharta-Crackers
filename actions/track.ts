"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { trackFormSchema } from "@/lib/validations/track";
import type { OrderTrackingInfo } from "@/types";

export async function trackOrderAction(
  prevState: unknown,
  formData: FormData
): Promise<{ ok: boolean; data?: OrderTrackingInfo; error?: string }> {
  const orderCode = String(formData.get("orderCode") || "").trim();
  const phone = String(formData.get("phone") || "").trim();

  const validated = trackFormSchema.safeParse({ orderCode, phone });
  if (!validated.success) {
    return {
      ok: false,
      error: "कृपया अचूक ऑर्डर कोड आणि १० अंकी मोबाईल नंबर टाका.",
    };
  }

  try {
    const admin = createAdminClient();

    // Query order strictly by both order_code AND phone
    const { data: order, error } = await admin
      .from("orders")
      .select("id, order_code, customer_name, phone, address, landmark, status, payment_method, payment_status, admin_note, subtotal, discount_total, total, created_at")
      .eq("order_code", validated.data.orderCode)
      .eq("phone", validated.data.phone)
      .maybeSingle();

    if (error || !order) {
      // Single generic error message to prevent enumeration
      return {
        ok: false,
        error: "दिलेल्या तपशिलांशी जुळणारी ऑर्डर सापडली नाही (Order not found). कृपया ऑर्डर कोड आणि मोबाईल नंबर तपासा.",
      };
    }

    // Fetch order items snapshots
    const { data: items } = await admin
      .from("order_items")
      .select("name_en, name_mr, unit, qty, unit_price, line_total")
      .eq("order_id", order.id);

    return {
      ok: true,
      data: {
        order_code: order.order_code,
        customer_name: order.customer_name,
        phone: order.phone,
        address: order.address,
        landmark: order.landmark,
        status: order.status,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        admin_note: order.admin_note,
        subtotal: Number(order.subtotal),
        discount_total: Number(order.discount_total),
        total: Number(order.total),
        created_at: order.created_at,
        items: (items || []).map((i) => ({
          name_en: i.name_en,
          name_mr: i.name_mr,
          unit: i.unit,
          qty: i.qty,
          unit_price: Number(i.unit_price),
          line_total: Number(i.line_total),
        })),
      },
    };
  } catch (err) {
    console.error("[Track Action] Error:", err);
    return {
      ok: false,
      error: "ऑर्डर शोधताना तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.",
    };
  }
}

