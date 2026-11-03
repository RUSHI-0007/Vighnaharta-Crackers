"use server";

import { verifyAdminSession } from "@/actions/auth";
import { productSchema, type ProductFormValues } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

export async function createProductAction(
  values: ProductFormValues
): Promise<{ ok: boolean; data?: { id: string }; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const validated = productSchema.safeParse(values);
    if (!validated.success) {
      return { ok: false, error: validated.error.issues[0]?.message || "Validation failed" };
    }

    // Auto-generate unique slug from English name
    const baseSlug = validated.data.name_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("products")
      .insert({
        category_id: validated.data.category_id,
        slug: uniqueSlug,
        name_en: validated.data.name_en,
        name_mr: validated.data.name_mr,
        description: validated.data.description || null,
        price: validated.data.price,
        discount_percent: validated.data.discount_percent,
        unit: validated.data.unit,
        image_path: validated.data.image_path || null,
        in_stock: validated.data.in_stock,
        featured: validated.data.featured,
      })
      .select("id")
      .single();

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true, data: { id: data.id } };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to create product" };
  }
}

export async function updateProductAction(
  id: string,
  values: ProductFormValues
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const validated = productSchema.safeParse(values);
    if (!validated.success) {
      return { ok: false, error: validated.error.issues[0]?.message || "Validation failed" };
    }

    const { error } = await supabase
      .from("products")
      .update({
        category_id: validated.data.category_id,
        name_en: validated.data.name_en,
        name_mr: validated.data.name_mr,
        description: validated.data.description || null,
        price: validated.data.price,
        discount_percent: validated.data.discount_percent,
        unit: validated.data.unit,
        image_path: validated.data.image_path || null,
        in_stock: validated.data.in_stock,
        featured: validated.data.featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update product" };
  }
}

export async function deleteProductAction(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete product" };
  }
}

export async function duplicateProductAction(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const { data: existing, error: fetchErr } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchErr || !existing) {
      return { ok: false, error: "Product not found to duplicate" };
    }

    const newSlug = `${existing.slug}-copy-${Date.now().toString(36)}`;
    const { error: insertErr } = await supabase.from("products").insert({
      category_id: existing.category_id,
      slug: newSlug,
      name_en: `${existing.name_en} (Copy)`,
      name_mr: `${existing.name_mr} (प्रत)`,
      description: existing.description,
      price: existing.price,
      discount_percent: existing.discount_percent,
      unit: existing.unit,
      image_path: existing.image_path,
      in_stock: existing.in_stock,
      featured: false,
    });

    if (insertErr) {
      return { ok: false, error: insertErr.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to duplicate product" };
  }
}

export async function toggleStockAction(
  id: string,
  in_stock: boolean
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const { error } = await supabase
      .from("products")
      .update({ in_stock, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) return { ok: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update stock" };
  }
}

export async function bulkUpdateStockAction(
  ids: string[],
  in_stock: boolean
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const { error } = await supabase
      .from("products")
      .update({ in_stock, updated_at: new Date().toISOString() })
      .in("id", ids);

    if (error) return { ok: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Bulk update failed" };
  }
}

export async function bulkUpdateDiscountAction(
  ids: string[],
  discount_percent: number
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const { error } = await supabase
      .from("products")
      .update({ discount_percent, updated_at: new Date().toISOString() })
      .in("id", ids);

    if (error) return { ok: false, error: error.message };

    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Bulk discount update failed" };
  }
}

