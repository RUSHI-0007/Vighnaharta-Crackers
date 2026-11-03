import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
  try {
    const transporter = getTransporter();
    const fromUser = process.env.GMAIL_USER || "vighnahartastall@gmail.com";

    if (!transporter) {
      console.warn("[Mailer] Gmail credentials not configured. Skipping email send:", options.subject);
      return { ok: true };
    }

    await transporter.sendMail({
      from: `"विघ्नहर्ता फटाका स्टॉल" <${fromUser}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });

    return { ok: true };
  } catch (err) {
    console.error("[Mailer] Failed to send email:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

