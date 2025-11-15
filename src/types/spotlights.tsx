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
};
