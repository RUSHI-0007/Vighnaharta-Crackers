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
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#e9e0d5] bg-[#fff9f0] px-3 py-1 text-xs font-semibold text-[#b91c32] hover:bg-[#f5eddf] transition-colors cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#b91c32]" />
          <span>Locating...</span>
        </>
      ) : hasLocation ? (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-emerald-700">Location Added</span>
        </>
      ) : (
        <>
          <MapPin className="h-3.5 w-3.5 text-[#b91c32]" />
          <span>Use My Location</span>
        </>
      )}
    </button>
  );
}
