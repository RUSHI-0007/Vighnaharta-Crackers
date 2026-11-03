"use client";

import React, { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { UploadCloud, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  label?: string;
  description?: string;
  previewUrl?: string | null;
  className?: string;
  isWebp?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*",
  maxSizeMB = 1,
  maxWidthOrHeight = 1600,
  label = "Upload Screenshot",
  description = "PNG, JPG up to 10MB (auto-compressed)",
  previewUrl: initialPreview = null,
  className,
  isWebp = false,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [compressing, setCompressing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    try {
      setCompressing(true);
      const options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
        fileType: isWebp ? "image/webp" : undefined,
      };

      const compressedFile = await imageCompression(file, options);
      const objectUrl = URL.createObjectURL(compressedFile);
      setPreview(objectUrl);
      setFileName(file.name);
      onFileSelect(compressedFile);
    } catch {
      // Fallback to original file if compression fails
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFileName(file.name);
      onFileSelect(file);
    } finally {
      setCompressing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
    onFileSelect(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-2xl border border-primary/40 bg-card p-3 flex items-center gap-3 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="h-16 w-16 rounded-xl object-cover border border-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span>Image Attached</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{fileName || "Selected file"}</p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl bg-secondary/80 text-foreground hover:bg-destructive hover:text-white transition-colors cursor-pointer"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border hover:border-primary/60 bg-card/40 hover:bg-card/70 p-6 text-center cursor-pointer transition-all"
        >
          {compressing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Compressing image...</p>
            </div>
          ) : (
            <>
              <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
