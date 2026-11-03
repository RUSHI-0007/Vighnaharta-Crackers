import { z } from "zod";

export const productSchema = z.object({
  name_en: z.string().trim().min(2, "English name is required"),
  name_mr: z.string().trim().min(2, "Marathi name is required"),
  category_id: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("MRP must be greater than 0"),
  discount_percent: z.coerce
    .number()
    .int()
    .min(0, "Discount cannot be negative")
    .max(90, "Discount cannot exceed 90%"),
  unit: z.string().trim().min(1, "Unit is required (e.g., Box of 10)"),
  description: z.string().trim().optional().nullable(),
  in_stock: z.boolean().default(true),
  featured: z.boolean().default(false),
  image_path: z.string().trim().optional().nullable(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

