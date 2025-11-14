// src/lib/location.ts
import type { LocationSuggestion } from "@/types/location";

export async function reverseGeocode(lat: number, lng: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );

  const data = await res.json();

  return data?.display_name || "Unknown Location";
}

export async function searchLocations(
  query: string
): Promise<LocationSuggestion[]> {
  if (!query) return [];

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`
  );

  return await res.json();
}
