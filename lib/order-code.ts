import { siteConfig } from "@/config/site";

/**
 * Generate order code format: VFS-YYMMDD-XXXX
 * e.g., VFS-261103-9A2K
 */
export function generateOrderCode(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const datePart = `${yy}${mm}${dd}`;

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous 0, O, 1, I
  let rand = "";
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${siteConfig.orderCodePrefix}-${datePart}-${rand}`;
}

