"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface ScreenshotUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function ScreenshotUpload({ onFileSelect, error }: ScreenshotUploadProps) {
  return (
    <div className="space-y-1.5">
      <FileUpload
        onFileSelect={onFileSelect}
        maxSizeMB={1}
        maxWidthOrHeight={1400}
        label="Payment Screenshot *"
        description="Attach screenshot from GPay, PhonePe, or Paytm showing successful payment"
      />
      {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
    </div>
  );
}
