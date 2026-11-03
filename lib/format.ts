import { siteConfig } from "@/config/site";

/**
 * Format amount as INR with currency symbol and no decimals.
 * e.g., ₹1,450
 */
export function formatCurrency(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(rounded);

  return `${siteConfig.currency.symbol}${formatted}`;
}

/**
 * Format 10-digit Indian phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}

/**
 * Format date in friendly IST format
 */
export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

