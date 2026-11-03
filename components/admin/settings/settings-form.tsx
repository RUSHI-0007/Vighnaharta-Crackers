"use client";

import { useState, useTransition } from "react";
import type { Settings } from "@/types";
import { updateSettingsAction } from "@/actions/settings";
import { PaymentMethodsCard } from "@/components/admin/settings/payment-methods-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [upiEnabled, setUpiEnabled] = useState(initialSettings.upi_enabled);
  const [codEnabled, setCodEnabled] = useState(initialSettings.cod_enabled);
  const [upiId, setUpiId] = useState(initialSettings.upi_id || "9561851896@ybl");
  const [qrImagePath, setQrImagePath] = useState<string | null>(
    initialSettings.qr_image_path
  );
  const [minOrder, setMinOrder] = useState<string>(
    String(initialSettings.min_order_amount ?? 0)
  );
  const [acceptingOrders, setAcceptingOrders] = useState(
    initialSettings.accepting_orders
  );
  const [deliveryNote, setDeliveryNote] = useState(
    initialSettings.delivery_note || ""
  );

  const [isPending, startTransition] = useTransition();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!upiEnabled && !codEnabled) {
      toast.error("At least one payment method (UPI or COD) must be enabled.");
      return;
    }

    startTransition(async () => {
      const res = await updateSettingsAction({
        upi_enabled: upiEnabled,
        cod_enabled: codEnabled,
        upi_id: upiId.trim() || null,
        qr_image_path: qrImagePath,
        min_order_amount: Number(minOrder) || 0,
        accepting_orders: acceptingOrders,
        delivery_note: deliveryNote.trim() || null,
      });

      if (res.ok) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error(res.error || "Failed to save settings.");
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
      {/* 1. Accepting Orders Master Switch */}
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="master_accepting" className="text-base font-bold cursor-pointer">
              Accepting Orders (स्टोअर सुरू / बंद)
            </Label>
            <p className="text-xs text-muted-foreground">
              Master switch: when disabled, checkout is blocked with a friendly message.
            </p>
          </div>
          <Switch
            id="master_accepting"
            checked={acceptingOrders}
            onCheckedChange={setAcceptingOrders}
          />
        </div>
      </div>

      {/* 2. Payment Methods Card */}
      <PaymentMethodsCard
        upiEnabled={upiEnabled}
        onUpiEnabledChange={setUpiEnabled}
        codEnabled={codEnabled}
        onCodEnabledChange={setCodEnabled}
        upiId={upiId}
        onUpiIdChange={setUpiId}
        qrImagePath={qrImagePath}
        onQrImagePathChange={setQrImagePath}
      />

      {/* 3. General Stall Operations */}
      <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
        <div className="border-b border-border/60 pb-3">
          <h3 className="font-heading text-base font-bold text-foreground">
            Order & Delivery Rules
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure order thresholds and customer-facing delivery notes.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="min_order">Minimum Order Amount (₹)</Label>
          <Input
            id="min_order"
            type="number"
            min="0"
            value={minOrder}
            onChange={(e) => setMinOrder(e.target.value)}
            placeholder="300"
            className="max-w-xs font-mono"
          />
          <p className="text-[11px] text-muted-foreground">
            Customers cannot place orders below this value (set 0 for no minimum).
          </p>
        </div>

        <div className="space-y-1.5 pt-2">
          <Label htmlFor="delivery_note">Delivery Note Banner / Notice</Label>
          <Textarea
            id="delivery_note"
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            placeholder="उदा. ग्रामपंचायत समोर, गणेगाव खालसा परिसरामध्ये २४ तासांत मोफत होम डिलिव्हरी उपलब्ध."
            className="min-h-[80px]"
          />
          <p className="text-[11px] text-muted-foreground">
            Displayed on the checkout page and cart summary for customers.
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 px-6 text-sm font-bold gap-2 rounded-xl"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

