"use server";

import { verifyAdminSession } from "@/actions/auth";
import { categorySchema, type CategoryFormValues } from "@/lib/validations/category";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(
  values: CategoryFormValues
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const validated = categorySchema.safeParse(values);
    if (!validated.success) {
      return { ok: false, error: validated.error.issues[0]?.message || "Invalid data" };
    }

    const { error } = await supabase.from("categories").insert({
      name_en: validated.data.name_en,
      name_mr: validated.data.name_mr,
      slug: validated.data.slug.toLowerCase().trim(),
      sort_order: validated.data.sort_order,
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "A category with this slug already exists." };
      }
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to create category" };
  }
}

export async function updateCategoryAction(
  id: string,
  values: CategoryFormValues
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();
    const validated = categorySchema.safeParse(values);
    if (!validated.success) {
      return { ok: false, error: validated.error.issues[0]?.message || "Invalid data" };
    }

    const { error } = await supabase
      .from("categories")
      .update({
        name_en: validated.data.name_en,
        name_mr: validated.data.name_mr,
        slug: validated.data.slug.toLowerCase().trim(),
        sort_order: validated.data.sort_order,
      })
      .eq("id", id);

    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update category" };
  }
}

export async function deleteCategoryAction(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { supabase } = await verifyAdminSession();

    // Check if products exist in category
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id);

    if (count !== null && count > 0) {
      return {
        ok: false,
        error: `Cannot delete: ${count} product(s) belong to this category. Move or delete them first.`,
      };
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      return { ok: false, error: error.message };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/shop");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete category" };
  }
}

