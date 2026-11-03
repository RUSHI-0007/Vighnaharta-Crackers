import { emailLayout } from "./layout";
import { formatCurrency } from "@/lib/format";
import { siteConfig } from "@/config/site";
import type { OrderWithItems } from "@/types";

export function customerOrderReceivedEmail(
  order: OrderWithItems,
  siteUrl: string
): { subject: string; html: string } {
  const subject = `आम्हाला आपली ऑर्डर मिळाली आहे: ${order.order_code} - ${siteConfig.name.mr}`;
  const isCod = order.payment_method === "cod";

  const paymentNotice = isCod
    ? `<div style="background-color:#1E295B;border-left:4px solid #F59E0B;padding:12px 16px;border-radius:4px;margin:16px 0;color:#F8F7F2;">
        <strong>पेमेंट पद्धत: कॅश ऑन डिलिव्हरी (Cash on Delivery)</strong><br/>
        कृपया डिलिव्हरीच्या वेळी अचूक <strong>${formatCurrency(order.total)}</strong> रोख रक्कम तयार ठेवा. ऑर्डर निश्चित करण्यासाठी आम्ही आपल्याला कॉल करू.
       </div>`
    : `<div style="background-color:#1E295B;border-left:4px solid #34D399;padding:12px 16px;border-radius:4px;margin:16px 0;color:#F8F7F2;">
        <strong>पेमेंट पद्धत: UPI QR स्कॅन</strong><br/>
        आम्ही आपले UPI पेमेंट तपासून घेत आहोत. पेमेंट पडताळणी पूर्ण झाल्यावर आपल्याला त्वरित ईमेलद्वारे कळवण्यात येईल.
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
      <td style="padding:10px 8px;text-align:right;font-size:13px;font-weight:bold;color:#F97316;">${formatCurrency(item.line_total)}</td>
    </tr>`
    )
    .join("");

  const bodyContent = `
    <div style="margin-bottom:20px;">
      <h2 style="font-size:20px;color:#F97316;margin:0 0 8px 0;">नमस्कार ${order.customer_name},</h2>
      <p style="margin:0;font-size:14px;color:#CBD5E1;">
        ${siteConfig.name.mr} कडून दिवाळी फटाके खरेदी केल्याबद्दल मनापासून धन्यवाद! तुमची ऑर्डर यशस्वीरीत्या नोंदवली गेली आहे.
      </p>
    </div>

    <div style="background-color:#0B1030;border-radius:12px;padding:16px;margin-bottom:20px;border:1px solid #1E295B;">
      <p style="margin:0;font-size:12px;color:#94A3B8;text-transform:uppercase;">तुमचा ऑर्डर क्रमांक (Order Code)</p>
      <p style="margin:4px 0 0 0;font-size:20px;font-weight:bold;color:#F59E0B;font-family:monospace;">${order.order_code}</p>
    </div>

    ${paymentNotice}

    <h3 style="font-size:14px;color:#F59E0B;margin:20px 0 10px 0;text-transform:uppercase;">ऑर्डर तपशील (Order Items)</h3>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:16px;border-collapse:collapse;">
      <thead>
        <tr style="background-color:#1E295B;color:#94A3B8;font-size:11px;text-transform:uppercase;">
          <th style="padding:8px;text-align:left;">फटाका</th>
          <th style="padding:8px;text-align:center;">नग</th>
          <th style="padding:8px;text-align:right;">रक्कम</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div style="text-align:right;border-top:1px solid #222D64;padding-top:10px;margin-bottom:20px;">
      <p style="margin:4px 0;font-size:13px;color:#94A3B8;">एकूण मूळ किंमत: ${formatCurrency(order.subtotal)}</p>
      ${order.discount_total > 0 ? `<p style="margin:4px 0;font-size:13px;color:#34D399;">सूट बचत: -${formatCurrency(order.discount_total)}</p>` : ""}
      <p style="margin:6px 0 0 0;font-size:16px;color:#FFFFFF;">एकूण देय रक्कम: <strong style="color:#F97316;font-size:20px;">${formatCurrency(order.total)}</strong></p>
    </div>

    <div style="background-color:#0B1030;border-radius:10px;padding:12px;margin-bottom:24px;border:1px solid #1E295B;font-size:13px;">
      <strong style="color:#F59E0B;">डिलिव्हरीचा पत्ता:</strong><br/>
      ${order.address} ${order.landmark ? `(जवळ: ${order.landmark})` : ""}
    </div>

    <div style="text-align:center;margin-top:28px;">
      <a href="${siteUrl}/track?code=${order.order_code}" style="background-color:#F97316;color:#FFFFFF;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;font-size:14px;display:inline-block;">
        ऑर्डर ट्रॅक करा (Track Your Order) &rarr;
      </a>
      <p style="margin:16px 0 0 0;font-size:12px;color:#94A3B8;">
        काही शंका असल्यास संपर्क करा: <a href="tel:${siteConfig.phone}" style="color:#F59E0B;text-decoration:none;font-weight:bold;">+91 ${siteConfig.phone}</a>
      </p>
    </div>
  `;

  return {
    subject,
    html: emailLayout(subject, bodyContent),
  };
}

