import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Settings } from "@/types";

export const defaultSettings: Settings = {
  id: 1,
  upi_enabled: true,
  cod_enabled: true,
  upi_id: "9561851896@ybl",
  qr_image_path: null,
  min_order_amount: 300,
  accepting_orders: true,
  delivery_note: "ग्रामपंचायत समोर, गणेगाव खालसा परिसरामध्ये मोफत होम डिलिव्हरी उपलब्ध.",
};

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createSupabaseClient(url, key);
}

export async function getSettings(): Promise<Settings> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      return defaultSettings;
    }

    return {
      ...defaultSettings,
      ...data,
    } as Settings;
  } catch {
    return defaultSettings;
  }
}
