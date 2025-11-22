// src/lib/location.ts
import type { LocationSuggestion } from "@/types/location";

export async function reverseGeocode(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  return data.display_name || "Unknown Location";
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
