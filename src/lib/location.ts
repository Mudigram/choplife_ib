// src/lib/location.ts
import type { LocationSuggestion } from "@/types/location";

export async function reverseGeocode(lat: number, lon: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.address) {
      // Prioritize specific area names that likely match "area" in DB
      const area =
        data.address.suburb ||
        data.address.neighbourhood ||
        data.address.residential ||
        data.address.district ||
        data.address.quarter ||
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown Location";

      return area;
    }

    return "Unknown Location";
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return "Unknown Location";
  }
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
