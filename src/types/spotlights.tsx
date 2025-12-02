export type FeaturedSpotlight = {
    id: number;
    partner_name: string;
    headline: string;
    sub_text: string | null;
    image_url: string;
    target_type: "restaurant" | "party" | "hotel";
    target_slug_id: string;
    cta_text: string;
    priority: number;
    is_active: boolean;
    created_at: string; // ISO timestamp
    is_new?: boolean; // Badge for new spotlights
    is_trending?: boolean; // Badge for trending spotlights
    save_count?: number; // Social proof - number of saves
};
