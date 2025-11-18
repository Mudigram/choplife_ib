import { EventCategory } from "@/types/events";
import {
  Music,
  Palette,
  Film,
  Activity,
  HeartPulse,
  Sparkles,
} from "lucide-react";

export const EVENT_CATEGORIES = [
  { id: EventCategory.ALL, label: "All", icon: Sparkles },
  { id: EventCategory.TECH, label: "Tech", icon: Sparkles },
  { id: EventCategory.MUSIC, label: "Music", icon: Music },
  { id: EventCategory.ART, label: "Art & Culture", icon: Palette },
  { id: EventCategory.PARTY, label: "Party", icon: Music },
  { id: EventCategory.COMEDY, label: "Comedy", icon: Sparkles },
  { id: EventCategory.FITNESS, label: "Fitness", icon: Activity },
  { id: EventCategory.LIFESTYLE_FUN, label: "Lifestyle Fun", icon: HeartPulse },
  { id: EventCategory.SPORTS, label: "Sports", icon: Activity },
  { id: EventCategory.MOVIE, label: "Movie", icon: Film },
];
