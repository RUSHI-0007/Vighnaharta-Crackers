"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZoomIn, QrCode, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScreenshotViewer({
  signedUrl,
  orderCode,
}: {
  signedUrl: string | null;
  orderCode: string;
}) {
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!signedUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
        <QrCode className="h-6 w-6 mx-auto mb-2 opacity-50" />
        <span>No payment screenshot attached</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        onClick={() => setZoomOpen(true)}
        className="group relative rounded-2xl border border-border overflow-hidden bg-secondary/50 cursor-pointer max-w-sm aspect-[3/4] flex items-center justify-center shadow-inner"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={signedUrl}
          alt={`Payment Screenshot for ${orderCode}`}
          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-background/90 px-3.5 py-2 text-xs font-bold text-foreground shadow-lg">
            <ZoomIn className="h-4 w-4 text-primary" />
            <span>Tap to Zoom</span>
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setZoomOpen(true)}
          className="h-8 text-xs gap-1"
        >
          <ZoomIn className="h-3.5 w-3.5" />
          <span>Zoom</span>
        </Button>
        <a
          href={signedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline py-1.5 px-2"
        >
          <span>Open Full Image</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-3xl p-2 bg-black/95 border-border">
          <DialogHeader className="p-2 border-b border-white/10">
            <DialogTitle className="text-sm font-mono text-white">
              Payment Screenshot • {orderCode}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-2 max-h-[80vh] overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signedUrl}
              alt="Zoomed Payment Screenshot"
              className="max-h-[75vh] w-auto object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

