import ExploreClient from "./ExploreClient";
import { supabaseServer } from "@/lib/supabase/supabaseServerClient";
import { MapItem } from "@/types/map";

export const dynamic = "force-dynamic";

type PlaceDB = {
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    latitude: number | null;
    longitude: number | null;
    image_url: string | null;
    average_rating: number | null;
    area: string | null;
};

type EventDB = {
    id: number;
    title: string;
    description: string | null;
    category: string | null;
    lat: number | null;
    lng: number | null;
    thumbnail: string;
    start_date_time: string;
    price_ngn: number;
    venue: string;
};

export default async function ExplorePage() {
    // Fetch Places
    const { data: places } = await supabaseServer
        .from("places")
        .select("id, name, description, category, latitude, longitude, image_url, average_rating, area")
        .limit(50)
        .returns<PlaceDB[]>();

    // Fetch Events
    const { data: events } = await supabaseServer
        .from("ibadan_events")
        .select("id, title, description, category, lat, lng, thumbnail, start_date_time, price_ngn, venue")
        .gte("start_date_time", new Date().toISOString()) // Only upcoming events
        .limit(50)
        .returns<EventDB[]>();

    // Normalize Data
    const mapItems: MapItem[] = [];

    if (places) {
        places.forEach((p) => {
            if (p.latitude && p.longitude) {
                mapItems.push({
                    id: p.id,
                    type: "place",
                    title: p.name,
                    subtitle: p.area || p.category,
                    description: p.description,
                    image_url: p.image_url,
                    lat: p.latitude,
                    lng: p.longitude,
                    rating: p.average_rating,
                    price: null,
                });
            }
        });
    }

    if (events) {
        events.forEach((e) => {
            if (e.lat && e.lng) {
                mapItems.push({
                    id: e.id,
                    type: "event",
                    title: e.title,
                    subtitle: e.venue,
                    description: e.description,
                    image_url: e.thumbnail,
                    lat: e.lat,
                    lng: e.lng,
                    date: new Date(e.start_date_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
                    price: e.price_ngn === 0 ? "Free" : e.price_ngn,
                    slug: e.title.toLowerCase().replace(/ /g, "-") + "-" + e.id,
                });
            }
        });
    }

    // Shuffle items for a mixed feed
    const shuffledItems = mapItems.sort(() => Math.random() - 0.5);

    return <ExploreClient initialItems={shuffledItems} />;
}
