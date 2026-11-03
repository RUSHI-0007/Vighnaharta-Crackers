import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadScreenshot(
  fileBuffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<{ path: string | null; error: string | null }> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("payment-screenshots")
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      return { path: null, error: error.message };
    }
    return { path: data.path, error: null };
  } catch (err) {
    return { path: null, error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function getScreenshotSignedUrl(path: string): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("payment-screenshots")
      .createSignedUrl(path, 3600); // 1 hour

    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

export async function uploadProductImage(
  fileBuffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<{ url: string | null; error: string | null }> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("product-images")
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      return { url: null, error: error.message };
    }

    const { data: pubUrl } = admin.storage
      .from("product-images")
      .getPublicUrl(data.path);

    return { url: pubUrl.publicUrl, error: null };
  } catch (err) {
    return { url: null, error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function uploadSiteAsset(
  fileBuffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<{ url: string | null; error: string | null }> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("site-assets")
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      });

    if (error) {
      return { url: null, error: error.message };
    }

    const { data: pubUrl } = admin.storage
      .from("site-assets")
      .getPublicUrl(data.path);

    return { url: pubUrl.publicUrl, error: null };
  } catch (err) {
    return { url: null, error: err instanceof Error ? err.message : "Upload failed" };
  }
}

