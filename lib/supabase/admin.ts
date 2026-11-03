import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role admin client for server-only operations.
 * Bypasses RLS for order insertion, customer lookup, and private storage uploads.
 * NEVER import this into client-side code.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

