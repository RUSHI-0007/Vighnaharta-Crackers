import { z } from "zod";

export const orderItemInputSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const orderFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email("Please enter a valid email address"),
  address: z.string().trim().min(5, "Delivery address must be at least 5 characters"),
  landmark: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  lat: z.coerce.number().optional().nullable(),
  lng: z.coerce.number().optional().nullable(),
  payment_method: z.enum(["upi_qr", "cod"]),
  items: z.array(orderItemInputSchema).min(1, "Your cart is empty"),
  hp: z.string().max(0, "Bot detected").optional().default(""), // Honeypot
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;

