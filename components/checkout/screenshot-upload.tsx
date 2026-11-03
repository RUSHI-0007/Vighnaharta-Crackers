"use client";

import { FileUpload } from "@/components/ui/file-upload";

interface ScreenshotUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export function ScreenshotUpload({ onFileSelect, error }: ScreenshotUploadProps) {
  return (
    <div className="space-y-2">
      <FileUpload
        onFileSelect={onFileSelect}
        maxSizeMB={1}
        maxWidthOrHeight={1400}
        label="Upload UPI Payment Screenshot *"
        description="Attach screenshot from GPay, PhonePe, or Paytm showing successful payment (Max 1 MB)"
      />
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
