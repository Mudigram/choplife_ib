"use client";

import { useParams } from "next/navigation";
import { useEventDetail } from "@/hooks/useEventDetail";
import EventHeader from "@/components/events/EventHeader";
import EventInfoSection from "@/components/events/EventInfoSection";
import EventTabs from "@/components/events/EventTabs";
import EventDetailSkeleton from "@/components/ui/EventDetailSkeleton";
import GetTicketsFAB from "@/components/events/GetTicketsFAB";
import EventCTA from "@/components/events/EventCTA";
import SimilarEvents from "@/components/events/SimilarEvents";

export default function EventDetailPage() {
    const params = useParams();
    const eventId = params?.id as string | undefined;

    const { event, loading, error } = useEventDetail(eventId);

    if (loading) return <EventDetailSkeleton />;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!event) return <div className="p-6">Event not found</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-10">
            <div className="">
                <EventHeader event={event} />
                <EventInfoSection event={event} />

                {/* Hero CTA Section */}
                <EventCTA
                    eventId={event.id}
                    eventTitle={event.title}
                    eventDate={event.start_date_time}
                    ticketLink={event.ticket_link}
                    attendeeCount={event.attendee_count || 0}
                />
            </div>
            <EventTabs event={event} eventId={eventId} />

            {/* Similar Events */}
            <SimilarEvents
                eventId={event.id}
                category={event.category}
                organizerId={event.organizer_id}
            />

            {/* Floating Get Tickets Button */}
            <GetTicketsFAB
                ticketLink={event.ticket_link}
                eventId={eventId}
                eventTitle={event.title}
            />
        </div>
    );
}
