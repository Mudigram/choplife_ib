// src/types/place.ts
export type Place = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  image_url?: string;
  contact_info?: Record<string, string>;
  opening_hours?: Record<string, string>;
  is_featured?: boolean;
  average_rating?: number;
  total_reviews?: number;
  created_at?: string;
};
