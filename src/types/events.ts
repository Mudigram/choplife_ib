// -------------------------
// EVENT CATEGORY ENUMS
// -------------------------
export enum EventCategory {
  ALL = "all",
  TECH = "Tech",
  MUSIC = "Music",
  ART = "Art",
  PARTY = "Party",
  COMEDY = "Comedy",
  FITNESS = "Fitness",
  LIFESTYLE_FUN = "Lifestyle Fun",
  SPORTS = "Sports",
  MOVIE = "Movie",
}

// -------------------------
// EVENT TABS ENUM
// -------------------------
export enum EventTab {
  UPCOMING = "upcoming",
  SAVED = "saved",
  PAST = "past",
}

// -------------------------
// CARD DISPLAY DATA (UI Shaped)
// -------------------------
export interface EventCardData {
  id: string;
  title: string;
  thumbnail: string;
  // category comes from the DB as a string; prefer a union to allow both raw strings and enum values
  category: string | EventCategory;
  location: string;
  price: number | "free";
  time: string;
  start_time: string;
  end_time?: string;
  venue_name?: string;
  saved?: boolean;
  description?: string;
  slug: string;
}

// -------------------------
// DATABASE TYPES (Supabase)
// Matches your ibadan_events schema
// -------------------------
export interface IbadanEvent {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  thumbnail: string;
  venue: string;
  location: string;
  city: string;
  start_date_time: string;
  end_date_time: string | null;
  price_ngn: number;
  category: string | null;
  organizer_id: string | null;
  is_verified: boolean;
  ticket_link: string | null;
  lat?: number | null;
  lng?: number | null;
}

// -------------------------
// EVENT SECTION TABLE (supabase)
// -------------------------
export interface EventSection {
  id: number;
  section_slug: string;
  event_id: number;
  priority: number;
  created_at: string;
}

// -------------------------
// COMBINED RESULT FOR HOOK
// -------------------------
export interface SectionWithEvents {
  section: string;
  events: IbadanEvent[];
}

// -------------------------
// CONSTANTS FOR FILTER UI
// -------------------------
export const EVENT_CATEGORIES = [
  { key: EventCategory.ALL, label: "All", icon: "🔥" },
  { key: EventCategory.TECH, label: "Tech", icon: "💻" },
  { key: EventCategory.MUSIC, label: "Music", icon: "�" },
  { key: EventCategory.ART, label: "Art & Culture", icon: "🎨" },
  { key: EventCategory.PARTY, label: "Party", icon: "🎉" },
  { key: EventCategory.COMEDY, label: "Comedy", icon: "🎭" },
  { key: EventCategory.FITNESS, label: "Fitness", icon: "🏃" },
  { key: EventCategory.LIFESTYLE_FUN, label: "Lifestyle Fun", icon: "✨" },
  { key: EventCategory.SPORTS, label: "Sports", icon: "🏅" },
  { key: EventCategory.MOVIE, label: "Movie", icon: "🎬" },
];

export const SORT_OPTIONS = [
  { key: "popular", label: "Most Popular" },
  { key: "price_low_high", label: "Price: Low → High" },
  { key: "price_high_low", label: "Price: High → Low" },
  { key: "soon", label: "Starting Soonest" },
  { key: "newest", label: "Newest Added" },
];
