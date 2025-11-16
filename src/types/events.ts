export enum EventCategory {
  ALL = "all",
  MUSIC = "music",
  FOOD = "food",
  ART = "art",
  NETWORKING = "networking",
  WELLNESS = "wellness",
}

export enum EventTab {
  UPCOMING = "upcoming",
  SAVED = "saved",
  PAST = "past",
}

export interface EventCardData {
  id: string;
  title: string;
  image_url: string;
  category: EventCategory;
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

export const EVENT_CATEGORIES = [
  { key: "all", label: "All", icon: "🔥" },
  { key: "music", label: "Music", icon: "🎵" },
  { key: "food", label: "Food & Drink", icon: "🍔" },
  { key: "art", label: "Art & Culture", icon: "🎨" },
  { key: "networking", label: "Networking", icon: "🤝" },
  { key: "wellness", label: "Wellness", icon: "🧘" },
];

export const SORT_OPTIONS = [
  { key: "popular", label: "Most Popular" },
  { key: "price_low_high", label: "Price: Low → High" },
  { key: "price_high_low", label: "Price: High → Low" },
  { key: "soon", label: "Starting Soonest" },
  { key: "newest", label: "Newest Added" },
];

// export const mockEvents: EventItem[] = [
//   {
//     id: "1",
//     title: "Palmwine & Chill: Lagos Edition",
//     description: "Good music, palmwine tasting, and live DJ sets.",
//     date: "2025-11-20T19:00:00.000Z",
//     location: "Lekki Phase 1",
//     price: "₦10,000",
//     imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
//     category: EventCategory.Music,
//     createdAt: "2025-10-01T12:00:00.000Z",
//   },
//   {
//     id: "2",
//     title: "Art & Wine Sip Session",
//     description: "A guided art experience with premium wine tasting.",
//     date: "2025-11-05T16:00:00.000Z",
//     location: "Ikoyi",
//     price: "₦15,000",
//     imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//     category: EventCategory.ArtCulture,
//     createdAt: "2025-10-02T09:00:00.000Z",
//     isSaved: true,
//   },
//   {
//     id: "3",
//     title: "Outdoor Fitness Bootcamp",
//     description: "High-energy cardio + strength training.",
//     date: "2025-10-10T07:00:00.000Z", // past event
//     location: "Bodija",
//     price: "₦3,000",
//     imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74",
//     category: EventCategory.Wellness,
//     createdAt: "2025-09-15T08:00:00.000Z",
//   },
//   {
//     id: "4",
//     title: "Food Lovers Festival",
//     description: "Over 40 food vendors. Taste, eat, relax.",
//     date: "2025-12-15T12:00:00.000Z",
//     location: "Ring Road",
//     price: "₦2,000",
//     imageUrl: "https://images.unsplash.com/photo-1464195643332-1f39524e4600",
//     category: EventCategory.FoodDrink,
//     createdAt: "2025-10-03T15:00:00.000Z",
//   },
//   {
//     id: "5",
//     title: "Tech Mixer: IB Connects",
//     description: "Networking event for founders & developers.",
//     date: "2025-11-10T17:00:00.000Z",
//     location: "UI Gate",
//     price: "Free",
//     imageUrl: "https://images.unsplash.com/photo-1515169067865-5387ec356754",
//     category: EventCategory.Networking,
//     createdAt: "2025-10-04T11:00:00.000Z",
//   },
// ];
