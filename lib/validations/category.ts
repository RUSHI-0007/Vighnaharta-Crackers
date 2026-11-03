import { z } from "zod";

export const categorySchema = z.object({
  name_en: z.string().trim().min(2, "English name is required"),
  name_mr: z.string().trim().min(2, "Marathi name is required"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  sort_order: z.coerce.number().int().default(0),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

