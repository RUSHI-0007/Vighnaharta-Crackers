import { createClient } from "@/lib/supabase/server";
import type { CustomerSummary } from "@/types";

export async function getCustomers(search?: string): Promise<CustomerSummary[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("customer_summary")
      .select("*")
      .order("total_spent", { ascending: false });

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`
      );
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as CustomerSummary[];
  } catch {
    return [];
  }
}

