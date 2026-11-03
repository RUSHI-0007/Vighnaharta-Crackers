import { z } from "zod";

export const settingsSchema = z
  .object({
    upi_enabled: z.boolean().default(true),
    cod_enabled: z.boolean().default(true),
    upi_id: z.string().trim().optional().nullable(),
    qr_image_path: z.string().trim().optional().nullable(),
    min_order_amount: z.coerce.number().min(0, "Minimum order cannot be negative").default(0),
    accepting_orders: z.boolean().default(true),
    delivery_note: z.string().trim().optional().nullable(),
  })
  .refine((data) => data.upi_enabled || data.cod_enabled, {
    message: "At least one payment method (UPI or Cash on Delivery) must remain enabled.",
    path: ["upi_enabled"],
  });

export type SettingsFormValues = z.infer<typeof settingsSchema>;

