import { createClient } from "@/lib/supabase/server";
import type { Order, OrderStatus, OrderWithItems, PaymentMethod } from "@/types";

export async function getOrders(options: {
  status?: OrderStatus | "all";
  paymentMethod?: PaymentMethod | "all";
  search?: string;
  limit?: number;
} = {}): Promise<Order[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (options.status && options.status !== "all") {
      query = query.eq("status", options.status);
    }
    if (options.paymentMethod && options.paymentMethod !== "all") {
      query = query.eq("payment_method", options.paymentMethod);
    }
    if (options.search) {
      query = query.or(
        `order_code.ilike.%${options.search}%,customer_name.ilike.%${options.search}%,phone.ilike.%${options.search}%`
      );
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as Order[];
  } catch {
    return [];
  }
}

export async function getOrderById(id: string): Promise<OrderWithItems | null> {
  try {
    const supabase = await createClient();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (orderError || !order) return null;

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id);

    return {
      ...(order as Order),
      items: (itemsError || !items ? [] : items) as OrderWithItems["items"],
    };
  } catch {
    return null;
  }
}

export async function getOrderCountsByStatus(): Promise<Record<string, number>> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("orders").select("status");
    const counts: Record<string, number> = {
      all: 0,
      pending: 0,
      confirmed: 0,
      out_for_delivery: 0,
      delivered: 0,
      cancelled: 0,
    };

    if (data) {
      counts.all = data.length;
      for (const row of data) {
        if (counts[row.status] !== undefined) {
          counts[row.status] += 1;
        }
      }
    }
    return counts;
  } catch {
    return { all: 0, pending: 0, confirmed: 0, out_for_delivery: 0, delivered: 0, cancelled: 0 };
  }
}

