import { emailLayout } from "./layout";
import { siteConfig } from "@/config/site";
import type { OrderStatus } from "@/types";

const statusMessages: Record<OrderStatus, { title: string; color: string; desc: string }> = {
  pending: {
    title: "पडताळणी प्रलंबित (Pending Verification)",
    color: "#F59E0B",
    desc: "तुमची ऑर्डर आमच्याकडे प्रलंबित आहे.",
  },
  confirmed: {
    title: "ऑर्डर निश्चित झाली (Order Confirmed)",
    color: "#34D399",
    desc: "अभिनंदन! तुमची ऑर्डर निश्चित करण्यात आली असून फटाके पॅकिंगसाठी पाठवले आहेत.",
  },
  out_for_delivery: {
    title: "डिलिव्हरीसाठी बाहेर पडली (Out for Delivery)",
    color: "#38BDF8",
    desc: "तुमचे फटाके आमच्या डिलिव्हरी प्रतिनिधीकडे सुपूर्द करण्यात आले आहेत आणि ते लवकरच आपल्या पत्त्यावर पोहोचतील.",
  },
  delivered: {
    title: "ऑर्डर वितरित झाली (Delivered)",
    color: "#10B981",
    desc: "तुमची फटाक्यांची ऑर्डर यशस्वीरीत्या पोहोचवण्यात आली आहे! आपली दिवाळी आनंदाची आणि सुरक्षित जावो हीच सदिच्छा.",
  },
  cancelled: {
    title: "ऑर्डर रद्द करण्यात आली (Order Cancelled)",
    color: "#EF4444",
    desc: "तुमची ऑर्डर रद्द करण्यात आली आहे.",
  },
};

export function customerStatusUpdateEmail(
  orderCode: string,
  customerName: string,
  newStatus: OrderStatus,
  adminNote: string | null,
  siteUrl: string
): { subject: string; html: string } {
  const statusInfo = statusMessages[newStatus];
  const subject = `ऑर्डर स्थिती अपडेट [${orderCode}]: ${statusInfo.title} - ${siteConfig.name.mr}`;

  const adminNoteBox = adminNote
    ? `<div style="background-color:#0B1030;border-left:4px solid ${statusInfo.color};padding:12px 16px;border-radius:6px;margin:20px 0;font-size:14px;">
        <strong style="color:${statusInfo.color};display:block;margin-bottom:4px;">दुकानदाराचा संदेश (Note from Stall):</strong>
        <p style="margin:0;color:#F8F7F2;">${adminNote}</p>
       </div>`
    : "";

  const bodyContent = `
    <div style="margin-bottom:20px;">
      <h2 style="font-size:20px;color:#F97316;margin:0 0 8px 0;">नमस्कार ${customerName},</h2>
      <p style="margin:0;font-size:14px;color:#CBD5E1;">
        तुमच्या ऑर्डर <strong style="color:#FFFFFF;font-family:monospace;">${orderCode}</strong> ची स्थिती अपडेट झाली आहे:
      </p>
    </div>

    <div style="background-color:#0B1030;border:1px solid #1E295B;border-radius:12px;padding:20px;text-align:center;margin:20px 0;">
      <span style="display:inline-block;padding:6px 16px;border-radius:20px;background-color:${statusInfo.color}20;color:${statusInfo.color};font-weight:bold;font-size:14px;border:1px solid ${statusInfo.color}50;margin-bottom:8px;">
        ${statusInfo.title}
      </span>
      <p style="margin:10px 0 0 0;font-size:14px;color:#E2E8F0;line-height:1.5;">
        ${statusInfo.desc}
      </p>
    </div>

    ${adminNoteBox}

    <div style="text-align:center;margin-top:28px;">
      <a href="${siteUrl}/track?code=${orderCode}" style="background-color:#F97316;color:#FFFFFF;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:bold;font-size:14px;display:inline-block;">
        ऑर्डरची सद्यस्थिती पहा (Track Status) &rarr;
      </a>
      <p style="margin:16px 0 0 0;font-size:12px;color:#94A3B8;">
        काही अडचण असल्यास संपर्क: <a href="tel:${siteConfig.phone}" style="color:#F59E0B;text-decoration:none;font-weight:bold;">+91 ${siteConfig.phone}</a>
      </p>
    </div>
  `;

  return {
    subject,
    html: emailLayout(subject, bodyContent),
  };
}

