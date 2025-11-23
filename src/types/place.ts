export type Place = {
  id: string;
  name: string;
  description?: string | null;

  category?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;

  created_by?: string | null;

  // --- Contact Info (JSONB) ---
  contact_info?: {
    phone?: string | null;
    website?: string | null;
    email?: string | null;
  } | null;

  // --- Opening Hours (JSONB OR string) ---
  opening_hours?:
    | string
    | {
        [day: string]: string;
      }
    | null;

  social_handles?: Record<string, string | null> | null;

  is_featured?: boolean | null;
  average_rating?: number | null;
  total_reviews?: number | null;
  area?: string | null;

  created_at?: string | null;
  updated_at?: string | null;

  open_time?: string | null;
  pricing_category?: string | null;
  cuisine_type?: string | null;
  price_range?: string | null;

  // --- New Fields ---
  accepts_reservations?: boolean | null;
  picture_policy?: string | null;
  origin_story?: string | null;
  mission?: string | null;

  // Special Highlights must be an array of strings
  special_highlights?: string[] | null;

  // Chef / Founder JSONB
  chef_founder?: {
    name?: string | null;
    role?: string | null;
    image_url?: string | null;
    bio?: string | null;
  } | null;
};
