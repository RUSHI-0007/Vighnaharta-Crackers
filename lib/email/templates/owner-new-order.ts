import { emailLayout } from "./layout";
import { formatCurrency } from "@/lib/format";
import type { OrderWithItems } from "@/types";

export function ownerNewOrderEmail(
  order: OrderWithItems,
  siteUrl: string
): { subject: string; html: string } {
  const isCod = order.payment_method === "cod";
  const paymentMethodLabel = isCod ? "COD" : "UPI";
  const subject = `New Order ${order.order_code} - ${paymentMethodLabel} - Rs ${order.total} - ${order.customer_name}`;

  const mapLink =
    order.lat && order.lng
      ? `<p style="margin:4px 0 0 0;"><a href="https://maps.google.com/?q=${order.lat},${order.lng}" target="_blank" style="color:#F59E0B;text-decoration:underline;font-weight:600;">📍 Google Maps Location उघडा</a></p>`
      : "";

  const codWarning = isCod
    ? `<div style="background-color:#EF4444;color:#FFFFFF;padding:12px 16px;border-radius:8px;font-weight:bold;margin:16px 0;font-size:15px;text-align:center;">
        ⚠️ COLLECT ${formatCurrency(order.total)} CASH ON DELIVERY
      </div>`
    : `<div style="background-color:#1E295B;border:1px solid #F97316;color:#FFE7D1;padding:12px 16px;border-radius:8px;margin:16px 0;font-size:13px;">
        🔍 कृपया डिलिव्हरीपूर्वी पेमेंट स्क्रीनशॉट तपासून घ्या (Verify payment screenshot before dispatch).
      </div>`;

  const itemsRows = order.items
    .map(
      (item) => `
    <tr style="border-bottom:1px solid #222D64;">
      <td style="padding:10px 8px;font-size:13px;color:#F8F7F2;">
        <strong>${item.name_mr}</strong><br/>
        <span style="font-size:11px;color:#94A3B8;">${item.name_en} (${item.unit})</span>
      </td>
      <td style="padding:10px 8px;text-align:center;font-size:13px;">${item.qty}</td>
      <td style="padding:10px 8px;text-align:right;font-size:13px;">${formatCurrency(item.unit_price)}</td>
      <td style="padding:10px 8px;text-align:right;font-size:13px;font-weight:bold;color:#F97316;">${formatCurrency(item.line_total)}</td>
    </tr>`
    )
    .join("");

  const bodyContent = `
    <div style="margin-bottom:20px;">
      <h2 style="font-size:20px;color:#F97316;margin:0 0 8px 0;">नवीन ऑर्डर प्राप्त झाली!</h2>
      <p style="margin:0;font-size:14px;color:#CBD5E1;">ऑर्डर कोड: <strong style="color:#FFFFFF;font-family:monospace;font-size:16px;">${order.order_code}</strong></p>
    </div>

    ${codWarning}

    <div style="background-color:#0B1030;border-radius:12px;padding:16px;margin-bottom:20px;border:1px solid #1E295B;">
      <h3 style="font-size:14px;color:#F59E0B;margin:0 0 10px 0;text-transform:uppercase;">ग्राहक माहिती (Customer Details)</h3>
      <p style="margin:4px 0;"><strong>नाव:</strong> ${order.customer_name}</p>
      <p style="margin:4px 0;"><strong>फोन:</strong> <a href="tel:${order.phone}" style="color:#F97316;font-weight:bold;text-decoration:none;">+91 ${order.phone} (Tap to Call)</a></p>
      <p style="margin:4px 0;"><strong>ईमेल:</strong> ${order.customer_email}</p>
      <p style="margin:4px 0;"><strong>पत्ता:</strong> ${order.address}</p>
      ${order.landmark ? `<p style="margin:4px 0;"><strong>लँडमार्क:</strong> ${order.landmark}</p>` : ""}
      ${mapLink}
      ${order.notes ? `<p style="margin:4px 0;color:#F59E0B;"><strong>सूचना (Notes):</strong> ${order.notes}</p>` : ""}
    </div>

    <h3 style="font-size:14px;color:#F59E0B;margin:0 0 10px 0;text-transform:uppercase;">ऑर्डर केलेले फटाके (Items)</h3>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:20px;border-collapse:collapse;">
      <thead>
        <tr style="background-color:#1E295B;color:#94A3B8;font-size:11px;text-transform:uppercase;">
          <th style="padding:8px;text-align:left;">फटाका</th>
          <th style="padding:8px;text-align:center;">नग</th>
          <th style="padding:8px;text-align:right;">दर</th>
          <th style="padding:8px;text-align:right;">एकूण</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div style="text-align:right;border-top:1px solid #222D64;padding-top:12px;margin-bottom:24px;">
      <p style="margin:4px 0;font-size:13px;color:#94A3B8;">एकूण मूळ किंमत: <strong>${formatCurrency(order.subtotal)}</strong></p>
      ${order.discount_total > 0 ? `<p style="margin:4px 0;font-size:13px;color:#34D399;">सूट (Discount): <strong>-${formatCurrency(order.discount_total)}</strong></p>` : ""}
      <p style="margin:8px 0 0 0;font-size:18px;color:#FFFFFF;">अंतिम देय रक्कम: <strong style="color:#F97316;font-size:22px;">${formatCurrency(order.total)}</strong></p>
    </div>

    <div style="text-align:center;margin-top:28px;">
      <a href="${siteUrl}/admin/orders/${order.id}" style="background-color:#F97316;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:bold;font-size:14px;display:inline-block;">
        Admin Dashboard मध्ये ऑर्डर उघडा &rarr;
      </a>
    </div>
  `;

  return {
    subject,
    html: emailLayout(subject, bodyContent),
  };
}

