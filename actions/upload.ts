"use server";

import { verifyAdminSession } from "@/actions/auth";
import { uploadProductImage, uploadSiteAsset } from "@/lib/storage";

export async function uploadProductImageAction(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    await verifyAdminSession();
    const file = formData.get("file") as File | null;
    if (!file) {
      return { ok: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `prod-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const res = await uploadProductImage(buffer, file.type || "image/webp", fileName);
    if (res.error || !res.url) {
      return { ok: false, error: res.error || "Upload failed" };
    }

    return { ok: true, url: res.url };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed" };
  }
}

export async function uploadSiteAssetAction(
  formData: FormData
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    await verifyAdminSession();
    const file = formData.get("file") as File | null;
    if (!file) {
      return { ok: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `asset-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const res = await uploadSiteAsset(buffer, file.type || "image/png", fileName);
    if (res.error || !res.url) {
      return { ok: false, error: res.error || "Upload failed" };
    }

    return { ok: true, url: res.url };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed" };
  }
}

