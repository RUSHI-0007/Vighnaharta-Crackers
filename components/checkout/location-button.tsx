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
      toast.success("Delivery location attached successfully!", {
        description: `Coordinates: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`,
      });
    } else {
      toast.error("Could not fetch location. Please check browser permissions or enter address manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card/70 px-3.5 py-2 text-xs font-semibold text-amber-300 hover:bg-secondary active:scale-95 transition-all min-h-[40px] cursor-pointer"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
          <span>Detecting location...</span>
        </>
      ) : hasLocation ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-emerald-400 font-bold">Location Attached ✓</span>
        </>
      ) : (
        <>
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>Use My Current Location</span>
        </>
      )}
    </button>
  );
}
