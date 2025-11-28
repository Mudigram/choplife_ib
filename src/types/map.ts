export type MapItemType = "place" | "event";

export interface MapItem {
  id: string | number;
  type: MapItemType;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  image_url?: string | null;
  lat: number;
  lng: number;
  
  // Specific fields
  rating?: number | null; // For places
  price?: string | number | null; // For events/places
  date?: string | null; // For events
  slug?: string; // For navigation
}
