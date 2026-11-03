import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Category } from "@/types";

function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createSupabaseClient(url, key);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return [
        { id: "c1000000-0000-0000-0000-000000000001", name_en: "Sparklers", name_mr: "फुलबाजे", slug: "sparklers", sort_order: 1, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000002", name_en: "Flower Pots", name_mr: "अनार", slug: "flower-pots", sort_order: 2, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000003", name_en: "Ground Chakkars", name_mr: "भुईचक्र", slug: "ground-chakkars", sort_order: 3, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000004", name_en: "Rockets", name_mr: "रॉकेट", slug: "rockets", sort_order: 4, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000005", name_en: "Sound Crackers", name_mr: "आवाज फटाके", slug: "sound-crackers", sort_order: 5, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000006", name_en: "Sky Shots", name_mr: "स्काय शॉट्स", slug: "sky-shots", sort_order: 6, created_at: new Date().toISOString() },
        { id: "c1000000-0000-0000-0000-000000000007", name_en: "Gift Boxes", name_mr: "फॅमिली गिफ्ट बॉक्स", slug: "gift-boxes", sort_order: 7, created_at: new Date().toISOString() },
      ];
    }

    return data as Category[];
  } catch {
    return [];
  }
}
