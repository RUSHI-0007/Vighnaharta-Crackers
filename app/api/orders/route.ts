import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { calculateEffectivePrice, calculateOrderTotals } from "@/lib/pricing";
import { generateOrderCode } from "@/lib/order-code";
import { uploadScreenshot } from "@/lib/storage";
import { sendEmail } from "@/lib/email/mailer";
import { ownerNewOrderEmail } from "@/lib/email/templates/owner-new-order";
import { customerOrderReceivedEmail } from "@/lib/email/templates/customer-order-received";
import type { OrderWithItems, PaymentMethod, Product } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Honeypot check
    const hp = formData.get("hp");
    if (hp && String(hp).trim().length > 0) {
      return NextResponse.json({ ok: false, error: "Bot detected" }, { status: 400 });
    }

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const landmark = formData.get("landmark") ? String(formData.get("landmark")).trim() : null;
    const notes = formData.get("notes") ? String(formData.get("notes")).trim() : null;
    const latStr = formData.get("lat");
    const lngStr = formData.get("lng");
    const lat = latStr ? parseFloat(String(latStr)) : null;
    const lng = lngStr ? parseFloat(String(lngStr)) : null;
    const paymentMethod = String(formData.get("payment_method") || "") as PaymentMethod;
    const itemsRaw = formData.get("items");
    const screenshotFile = formData.get("screenshot") as File | null;

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Valid name is required" }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: "Valid 10-digit phone number is required" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Valid email is required" }, { status: 400 });
    }
    if (!address || address.length < 5) {
      return NextResponse.json({ ok: false, error: "Valid address is required" }, { status: 400 });
    }
    if (paymentMethod !== "upi_qr" && paymentMethod !== "cod") {
      return NextResponse.json({ ok: false, error: "Invalid payment method" }, { status: 400 });
    }
    if (!itemsRaw) {
      return NextResponse.json({ ok: false, error: "Cart is empty" }, { status: 400 });
    }

    let parsedItems: Array<{ productId: string; quantity: number }> = [];
    try {
      parsedItems = JSON.parse(String(itemsRaw));
      if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
        throw new Error("Empty items array");
      }
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid items format" }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Fetch DB Settings
    const { data: settingsData } = await admin
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (settingsData) {
      if (!settingsData.accepting_orders) {
        return NextResponse.json(
          { ok: false, error: "सध्या नवीन ऑर्डर्स स्वीकारणे बंद आहे (Store is currently not accepting orders)" },
          { status: 400 }
        );
      }
      if (paymentMethod === "upi_qr" && !settingsData.upi_enabled) {
        return NextResponse.json(
          { ok: false, error: "UPI पेमेंट पद्धत सध्या बंद आहे" },
          { status: 400 }
        );
      }
      if (paymentMethod === "cod" && !settingsData.cod_enabled) {
        return NextResponse.json(
          { ok: false, error: "कॅश ऑन डिलिव्हरी सध्या बंद आहे" },
          { status: 400 }
        );
      }
    }

    // 2. Validate Screenshot for UPI
    let screenshotBuffer: Buffer | null = null;
    let screenshotPath: string | null = null;
    if (paymentMethod === "upi_qr") {
      if (!screenshotFile || !(screenshotFile instanceof File)) {
        return NextResponse.json(
          { ok: false, error: "UPI पेमेंट स्क्रीनशॉट जोडणे आवश्यक आहे." },
          { status: 400 }
        );
      }
      const arrayBuffer = await screenshotFile.arrayBuffer();
      screenshotBuffer = Buffer.from(arrayBuffer);

      if (screenshotBuffer.length > 2 * 1024 * 1024) {
        return NextResponse.json(
          { ok: false, error: "स्क्रीनशॉट फाईल साईझ खूप मोठी आहे (कमाल १-२ MB)." },
          { status: 400 }
        );
      }
    }

    // 3. Rate Limit: 5 orders per phone per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await admin
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("phone", phone)
      .gte("created_at", oneHourAgo);

    if (count !== null && count >= 5) {
      return NextResponse.json(
        { ok: false, error: "एका तासात कमाल ५ ऑर्डर्सची मर्यादा आहे. कृपया थोड्या वेळाने प्रयत्न करा." },
        { status: 429 }
      );
    }

    // 4. Server-side product price recomputation
    const productIds = parsedItems.map((i) => i.productId);
    const { data: dbProducts, error: prodError } = await admin
      .from("products")
      .select("*")
      .in("id", productIds);

    if (prodError || !dbProducts || dbProducts.length === 0) {
      return NextResponse.json(
        { ok: false, error: "फटाके लोड करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा." },
        { status: 400 }
      );
    }

    const productMap = new Map<string, Product>();
    for (const p of dbProducts) {
      productMap.set(p.id, p as Product);
    }

    const calculatedItems: Array<{
      product: Product;
      qty: number;
      unitPrice: number;
      mrp: number;
      lineTotal: number;
      discountPercent: number;
    }> = [];

    for (const item of parsedItems) {
      const prod = productMap.get(item.productId);
      if (!prod) {
        return NextResponse.json(
          { ok: false, error: "कार्टमधील काही फटाके उपलब्ध नाहीत." },
          { status: 400 }
        );
      }
      if (!prod.in_stock) {
        return NextResponse.json(
          { ok: false, error: `"${prod.name_mr}" चा स्टॉक संपला आहे.` },
          { status: 400 }
        );
      }
      const unitPrice = calculateEffectivePrice(prod.price, prod.discount_percent);
      const lineTotal = unitPrice * item.quantity;

      calculatedItems.push({
        product: prod,
        qty: item.quantity,
        unitPrice,
        mrp: prod.price,
        lineTotal,
        discountPercent: prod.discount_percent,
      });
    }

    const { subtotal, discountTotal, total } = calculateOrderTotals(
      calculatedItems.map((c) => ({
        mrp: c.mrp,
        discountPercent: c.discountPercent,
        quantity: c.qty,
      }))
    );

    const minOrder = settingsData?.min_order_amount || 0;
    if (total < minOrder) {
      return NextResponse.json(
        { ok: false, error: `किमान ऑर्डर रक्कम ₹${minOrder} आहे.` },
        { status: 400 }
      );
    }

    // 5. Generate Order Code (retry on collision)
    let orderCode = generateOrderCode();
    for (let attempt = 0; attempt < 3; attempt++) {
      const { data: existing } = await admin
        .from("orders")
        .select("id")
        .eq("order_code", orderCode)
        .maybeSingle();

      if (!existing) break;
      orderCode = generateOrderCode();
    }

    // 6. Upload Screenshot if UPI
    if (paymentMethod === "upi_qr" && screenshotBuffer && screenshotFile) {
      const ext = screenshotFile.name.split(".").pop() || "png";
      const fileName = `${orderCode}-${Date.now()}.${ext}`;
      const uploadResult = await uploadScreenshot(
        screenshotBuffer,
        screenshotFile.type || "image/png",
        fileName
      );
      if (uploadResult.path) {
        screenshotPath = uploadResult.path;
      }
    }

    // 7. Insert Order
    const { data: insertedOrder, error: orderInsertError } = await admin
      .from("orders")
      .insert({
        order_code: orderCode,
        customer_name: name,
        phone,
        customer_email: email,
        address,
        landmark,
        notes,
        lat,
        lng,
        subtotal,
        discount_total: discountTotal,
        total,
        payment_method: paymentMethod,
        payment_status: "pending",
        status: "pending",
        screenshot_path: screenshotPath,
      })
      .select()
      .single();

    if (orderInsertError || !insertedOrder) {
      console.error("[Orders API] Order insert error:", orderInsertError);
      return NextResponse.json(
        { ok: false, error: "ऑर्डर सेव्ह करता आली नाही. कृपया पुन्हा प्रयत्न करा." },
        { status: 500 }
      );
    }

    // 8. Insert Order Items Snapshots
    const itemsToInsert = calculatedItems.map((c) => ({
      order_id: insertedOrder.id,
      product_id: c.product.id,
      name_en: c.product.name_en,
      name_mr: c.product.name_mr,
      unit: c.product.unit,
      unit_price: c.unitPrice,
      mrp: c.mrp,
      qty: c.qty,
      line_total: c.lineTotal,
    }));

    const { error: itemsInsertError } = await admin
      .from("order_items")
      .insert(itemsToInsert);

    if (itemsInsertError) {
      console.error("[Orders API] Items insert error:", itemsInsertError);
    }

    // 9. Send Emails in parallel with Promise.allSettled
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const ownerEmailAddr = process.env.OWNER_EMAIL || process.env.GMAIL_USER || "vighnahartastall@gmail.com";

    const fullOrder: OrderWithItems = {
      ...insertedOrder,
      items: itemsToInsert.map((item, idx) => ({
        id: `item-${idx}`,
        ...item,
      })),
    };

    const ownerEmailContent = ownerNewOrderEmail(fullOrder, siteUrl);
    const customerEmailContent = customerOrderReceivedEmail(fullOrder, siteUrl);

    const attachments =
      paymentMethod === "upi_qr" && screenshotBuffer
        ? [
            {
              filename: `Payment-Screenshot-${orderCode}.png`,
              content: screenshotBuffer,
              contentType: "image/png",
            },
          ]
        : undefined;

    Promise.allSettled([
      sendEmail({
        to: ownerEmailAddr,
        subject: ownerEmailContent.subject,
        html: ownerEmailContent.html,
        attachments,
      }),
      sendEmail({
        to: email,
        subject: customerEmailContent.subject,
        html: customerEmailContent.html,
      }),
    ]).then((results) => {
      results.forEach((res, index) => {
        if (res.status === "rejected") {
          console.error(`[Orders API] Email #${index} failed:`, res.reason);
        }
      });
    });

    return NextResponse.json({
      ok: true,
      data: {
        orderCode,
        id: insertedOrder.id,
      },
    });
  } catch (err) {
    console.error("[Orders API] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

