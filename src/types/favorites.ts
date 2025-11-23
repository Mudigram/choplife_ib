export type Favorite = {
    id: number;
    user_id: string;
    place_id?: string | null;
    event_id?: number | null;
    created_at: string;
};
