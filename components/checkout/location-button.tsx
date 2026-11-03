"use client";

import { useGeolocation } from "@/hooks/use-geolocation";
import { MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface LocationButtonProps {
  onLocationFound: (coords: { lat: number; lng: number }) => void;
  hasLocation: boolean;
}

export function LocationButton({ onLocationFound, hasLocation }: LocationButtonProps) {
  const { loading, getLocation } = useGeolocation();

  const handleClick = async () => {
    const coords = await getLocation();
    if (coords) {
      onLocationFound(coords);
      toast.success("Location attached successfully!");
    } else {
      toast.error("Could not fetch location. Please enter address manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-secondary transition-all cursor-pointer"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          <span>Locating...</span>
        </>
      ) : hasLocation ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-emerald-400">Location Added</span>
        </>
      ) : (
        <>
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>Use My Location</span>
        </>
      )}
    </button>
  );
}
