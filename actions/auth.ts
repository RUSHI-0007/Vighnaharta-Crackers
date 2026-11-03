"use server";

import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";
import { redirect } from "next/navigation";

export async function verifyAdminSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized. Admin session required.");
  }
  return { user, supabase };
}

export async function loginAction(
  prevState: unknown,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  const validated = loginSchema.safeParse({ email, password });
  if (!validated.success) {
    return { ok: false, error: "कृपया अचूक ईमेल आणि पासवर्ड टाका." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      return { ok: false, error: "चुकीचा ईमेल किंवा पासवर्ड (Invalid credentials)." };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "लॉगिन अयशस्वी झाले.",
    };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

