import { siteConfig } from "@/config/site";

export function emailLayout(title: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0B1030;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#F8F7F2;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0B1030;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#121842;border:1px solid #222D64;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#F97316,#EA580C);padding:24px 20px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:bold;color:#FFFFFF;letter-spacing:0.5px;">
                ${siteConfig.name.mr}
              </h1>
              <p style="margin:4px 0 0 0;font-size:12px;color:#FFE7D1;font-weight:500;">
                ${siteConfig.name.en} • ${siteConfig.address.mr}
              </p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding:28px 24px;font-size:14px;line-height:1.6;color:#E2E8F0;">
              ${bodyContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0D1236;padding:16px 20px;text-align:center;font-size:12px;color:#94A3B8;border-top:1px solid #1E2958;">
              <p style="margin:0 0 4px 0;">संपर्क: +91 ${siteConfig.phone} | संचालक: ${siteConfig.owner.mr}</p>
              <p style="margin:0;">${siteConfig.tagline.mr}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

