"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { uploadProductImageAction } from "@/actions/upload";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProductImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

export function ProductImageUpload({ value, onChange }: ProductImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (file: File | null) => {
    if (!file) {
      onChange(null);
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadProductImageAction(formData);
      if (res.ok && res.url) {
        onChange(res.url);
        toast.success("Image uploaded!");
      } else {
        toast.error(res.error || "Failed to upload image");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <FileUpload
        onFileSelect={handleFileSelect}
        maxSizeMB={0.3} // ~300 KB
        maxWidthOrHeight={1000}
        label="Product Image (Drop or Tap to Select)"
        description="Auto-compressed to ~300KB WebP, max 1000px"
        previewUrl={value}
        isWebp={true}
      />
      {uploading && (
        <div className="flex items-center gap-2 text-xs text-primary font-medium">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Uploading to Supabase Storage...</span>
        </div>
      )}
    </div>
  );
}

