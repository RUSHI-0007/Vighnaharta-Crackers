"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { uploadSiteAssetAction } from "@/actions/upload";
import { toast } from "sonner";
import { QrCode, Banknote, AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

interface PaymentMethodsCardProps {
  upiEnabled: boolean;
  onUpiEnabledChange: (enabled: boolean) => void;
  codEnabled: boolean;
  onCodEnabledChange: (enabled: boolean) => void;
  upiId: string;
  onUpiIdChange: (val: string) => void;
  qrImagePath: string | null;
  onQrImagePathChange: (path: string | null) => void;
}

export function PaymentMethodsCard({
  upiEnabled,
  onUpiEnabledChange,
  codEnabled,
  onCodEnabledChange,
  upiId,
  onUpiIdChange,
  qrImagePath,
  onQrImagePathChange,
}: PaymentMethodsCardProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpiToggle = (checked: boolean) => {
    if (!checked && !codEnabled) {
      toast.error("Both payment methods cannot be disabled. Keep at least one enabled.");
      return;
    }
    onUpiEnabledChange(checked);
  };

  const handleCodToggle = (checked: boolean) => {
    if (!checked && !upiEnabled) {
      toast.error("Both payment methods cannot be disabled. Keep at least one enabled.");
      return;
    }
    onCodEnabledChange(checked);
  };

  const handleQrUpload = async (file: File | null) => {
    if (!file) {
      onQrImagePathChange(null);
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadSiteAssetAction(formData);
      if (res.ok && res.url) {
        onQrImagePathChange(res.url);
        toast.success("QR code image uploaded!");
      } else {
        toast.error(res.error || "Failed to upload QR image.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "QR upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 space-y-6">
      <div className="border-b border-border/60 pb-3">
        <h3 className="font-heading text-base font-bold text-foreground">
          Payment Method Controls
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Enable or disable payment options available to customers during checkout.
        </p>
      </div>

      <div className="space-y-4">
        {/* UPI Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <Label htmlFor="upi_toggle" className="font-bold cursor-pointer">
                UPI QR Payments
              </Label>
              <p className="text-xs text-muted-foreground">
                Customers scan shop QR code and attach payment screenshot
              </p>
            </div>
          </div>
          <Switch
            id="upi_toggle"
            checked={upiEnabled}
            onCheckedChange={handleUpiToggle}
          />
        </div>

        {/* UPI ID & QR Code Image settings - shown only if UPI is enabled */}
        {upiEnabled && (
          <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4 space-y-4 ml-2 sm:ml-4 border-l-4 border-l-primary">
            <div className="space-y-1.5">
              <Label htmlFor="upi_id_input">UPI ID for Receiving Payments *</Label>
              <Input
                id="upi_id_input"
                value={upiId}
                onChange={(e) => onUpiIdChange(e.target.value)}
                placeholder="e.g. 9561851896@ybl"
                className="font-mono"
              />
              <p className="text-[11px] text-muted-foreground">
                This UPI ID is copied by customers and embedded in the QR payment URI.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Custom Stall QR Code Image (Optional)</Label>
              <FileUpload
                onFileSelect={handleQrUpload}
                maxSizeMB={0.5}
                maxWidthOrHeight={800}
                label="Upload Shop QR Image"
                description="Upload your PhonePe / GPay QR code standee photo"
                previewUrl={qrImagePath}
              />
              {uploading && (
                <div className="flex items-center gap-2 text-xs text-primary font-medium">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading QR to site-assets bucket...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* COD Toggle */}
        <div className="flex items-center justify-between rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <Banknote className="h-5 w-5" />
            </div>
            <div>
              <Label htmlFor="cod_toggle" className="font-bold cursor-pointer">
                Cash on Delivery (COD)
              </Label>
              <p className="text-xs text-muted-foreground">
                Customers pay cash in hand when firecrackers are delivered
              </p>
            </div>
          </div>
          <Switch
            id="cod_toggle"
            checked={codEnabled}
            onCheckedChange={handleCodToggle}
          />
        </div>

        {!upiEnabled && !codEnabled && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>At least one payment method must remain active.</span>
          </div>
        )}
      </div>
    </div>
  );
}

