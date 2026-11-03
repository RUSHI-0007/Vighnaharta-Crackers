import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { jsonToCsv } from "@/lib/csv";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type } = await params;

    if (type === "customers") {
      const { data, error } = await supabase
        .from("customer_summary")
        .select("*")
        .order("total_spent", { ascending: false });

      if (error || !data) {
        return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
      }

      const headers = [
        { key: "name", label: "Customer Name" },
        { key: "phone", label: "Phone Number" },
        { key: "email", label: "Email Address" },
        { key: "address", label: "Latest Address" },
        { key: "orders_count", label: "Orders Count" },
        { key: "total_spent", label: "Total Spent (INR)" },
        { key: "first_order_at", label: "First Order Date" },
        { key: "last_order_at", label: "Last Order Date" },
      ];

      const csv = jsonToCsv(data, headers);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="customers-${Date.now()}.csv"`,
        },
      });
    }

    if (type === "orders") {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data) {
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
      }

      const headers = [
        { key: "order_code", label: "Order Code" },
        { key: "created_at", label: "Date" },
        { key: "customer_name", label: "Customer Name" },
        { key: "phone", label: "Phone Number" },
        { key: "customer_email", label: "Email" },
        { key: "address", label: "Address" },
        { key: "payment_method", label: "Payment Method" },
        { key: "payment_status", label: "Payment Status" },
        { key: "status", label: "Order Status" },
        { key: "subtotal", label: "Subtotal" },
        { key: "discount_total", label: "Discount" },
        { key: "total", label: "Total Amount" },
      ];

      const csv = jsonToCsv(data, headers);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="orders-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: "Invalid export type" }, { status: 400 });
  } catch (err) {
    console.error("[CSV Export API] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

