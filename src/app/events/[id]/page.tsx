"use client";

import { useParams } from "next/navigation";
import { useEventDetail } from "@/hooks/useEventDetail";
import EventHeader from "@/components/events/EventHeader";
import EventInfoSection from "@/components/events/EventInfoSection";
import EventTabs from "@/components/events/EventTabs";
import Spinner from "@/components/ui/Spinner";

export default function EventDetailPage() {
    const params = useParams();
    const eventId = params?.id as string | undefined;

    const { event, loading, error } = useEventDetail(eventId);

    if (loading) return <Spinner size="lg" message="Loading event..." full />;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!event) return <div className="p-6">Event not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-10">
            <div className="">
                <EventHeader event={event} />
                <EventInfoSection event={event} />
            </div>
            <EventTabs event={event} eventId={eventId} />
        </div>
    );
}
