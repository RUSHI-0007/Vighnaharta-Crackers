/**
 * Calculate the effective discounted price:
 * round(price * (1 - discount_percent / 100))
 */
export function calculateEffectivePrice(price: number, discountPercent = 0): number {
  if (discountPercent <= 0) return Math.round(price);
  if (discountPercent >= 100) return 0;
  return Math.round(price * (1 - discountPercent / 100));
}

/**
 * Calculate line item totals: unitPrice (after discount), mrp, lineTotal, lineDiscount
 */
export function calculateLineTotal(
  mrp: number,
  discountPercent: number,
  quantity: number
): {
  unitPrice: number;
  lineTotal: number;
  lineDiscount: number;
} {
  const unitPrice = calculateEffectivePrice(mrp, discountPercent);
  const lineTotal = unitPrice * quantity;
  const lineDiscount = (mrp - unitPrice) * quantity;
  return { unitPrice, lineTotal, lineDiscount };
}

/**
 * Calculate cart or order totals
 */
export function calculateOrderTotals(
  items: Array<{ mrp: number; discountPercent: number; quantity: number }>
): {
  subtotal: number;
  discountTotal: number;
  total: number;
} {
  let subtotal = 0;
  let discountTotal = 0;

  for (const item of items) {
    const { lineDiscount } = calculateLineTotal(
      item.mrp,
      item.discountPercent,
      item.quantity
    );
    subtotal += item.mrp * item.quantity;
    discountTotal += lineDiscount;
  }

  const total = subtotal - discountTotal;
  return { subtotal, discountTotal, total };
}

export interface CartTotals {
  subtotal: number;
  discountTotal: number;
  total: number;
  totalCount: number;
}

/**
 * Pure helper to compute cart totals and count from raw items array
 */
export function computeCartTotals(
  items: Array<{ mrp: number; discount_percent?: number; discountPercent?: number; quantity: number }>
): CartTotals {
  let subtotal = 0;
  let discountTotal = 0;
  let totalCount = 0;

  for (const item of items) {
    const disc = item.discount_percent ?? item.discountPercent ?? 0;
    const { lineDiscount } = calculateLineTotal(item.mrp, disc, item.quantity);
    subtotal += item.mrp * item.quantity;
    discountTotal += lineDiscount;
    totalCount += item.quantity;
  }

  const total = subtotal - discountTotal;
  return { subtotal, discountTotal, total, totalCount };
}
