import { EventCategory } from "@/types/events";
import {
  Music,
  UtensilsCrossed,
  Palette,
  Users,
  HeartPulse,
  Sparkles,
} from "lucide-react";

export const EVENT_CATEGORIES = [
  {
    id: EventCategory.ALL,
    label: "All",
    icon: Sparkles,
  },
  {
    id: EventCategory.MUSIC,
    label: "Music",
    icon: Music,
  },
  {
    id: EventCategory.FOOD,
    label: "Food & Drink",
    icon: UtensilsCrossed,
  },
  {
    id: EventCategory.ART,
    label: "Art & Culture",
    icon: Palette,
  },
  {
    id: EventCategory.NETWORKING,
    label: "Networking",
    icon: Users,
  },
  {
    id: EventCategory.WELLNESS,
    label: "Wellness",
    icon: HeartPulse,
  },
];
