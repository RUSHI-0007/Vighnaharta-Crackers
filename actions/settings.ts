"use server";

import { verifyAdminSession } from "@/actions/auth";
import { settingsSchema, type SettingsFormValues } from "@/lib/validations/settings";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(
  values: SettingsFormValues
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const validated = settingsSchema.safeParse(values);
    if (!validated.success) {
      return { ok: false, error: validated.error.issues[0]?.message || "Validation failed" };
    }

    const { error } = await supabase
      .from("settings")
      .update({
        upi_enabled: validated.data.upi_enabled,
        cod_enabled: validated.data.cod_enabled,
        upi_id: validated.data.upi_id || null,
        qr_image_path: validated.data.qr_image_path || null,
        min_order_amount: validated.data.min_order_amount,
        accepting_orders: validated.data.accepting_orders,
        delivery_note: validated.data.delivery_note || null,
      })
      .eq("id", 1);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/settings");
    revalidatePath("/checkout");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update settings" };
  }
}

