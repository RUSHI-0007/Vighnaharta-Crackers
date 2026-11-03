import { z } from "zod";

export const trackFormSchema = z.object({
  orderCode: z.string().trim().min(5, "Please enter your Order Code"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter the 10-digit phone number used for the order"),
});

export type TrackFormInput = z.infer<typeof trackFormSchema>;

