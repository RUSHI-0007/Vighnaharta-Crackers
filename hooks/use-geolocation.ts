"use client";

import { useState, useCallback } from "react";

interface Coords {
  lat: number;
  lng: number;
}

interface GeolocationState {
  coords: Coords | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    loading: false,
    error: null,
  });

  const getLocation = useCallback((): Promise<Coords | null> => {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !navigator.geolocation) {
        setState({
          coords: null,
          loading: false,
          error: "Geolocation is not supported by your browser",
        });
        resolve(null);
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState({ coords, loading: false, error: null });
          resolve(coords);
        },
        (error) => {
          let errorMsg = "Unable to retrieve your location";
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = "Location permission was denied";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = "Location information is unavailable";
          } else if (error.code === error.TIMEOUT) {
            errorMsg = "Location request timed out";
          }
          setState({ coords: null, loading: false, error: errorMsg });
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    });
  }, []);

  return { ...state, getLocation };
}

