import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { IbadanEvent } from "@/types/events";
import { TicketTier } from "@/hooks/useEventTickets";
import { uploadEventImage } from "@/lib/supabase/uploadEventImage";

export type EventFormData = Partial<IbadanEvent> & {
    tickets?: Partial<TicketTier>[];
};

type UseAdminEventsParams = {
    search?: string;
    category?: string;
    limit?: number;
};

export function useAdminEvents({ search = "", category = "all", limit = 50 }: UseAdminEventsParams = {}) {
    const [events, setEvents] = useState<IbadanEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, [search, category]);

    async function fetchEvents() {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from("ibadan_events")
                .select("*")
                .order("start_date_time", { ascending: true })
                .limit(limit);

            if (category !== "all") {
                query = query.eq("category", category);
            }

            if (search.trim()) {
                query = query.ilike("title", `%${search}%`);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            setEvents(data || []);
        } catch (err: any) {
            console.error("Error fetching events:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function createEvent(eventData: Partial<IbadanEvent>, tickets: Partial<TicketTier>[] = [], imageFile?: File) {
        try {
            setLoading(true);
            console.log("📝 Creating event...", { eventData, ticketsCount: tickets.length });

            let thumbnailUrl = eventData.thumbnail;

            if (imageFile && eventData.title) {
                console.log("📸 Uploading thumbnail...");
                thumbnailUrl = await uploadEventImage(imageFile, eventData.title);
                console.log("✅ Thumbnail uploaded:", thumbnailUrl);
            }

            // 1. Create Event
            const eventPayload = { ...eventData, thumbnail: thumbnailUrl };
            const { data: newEvent, error: createError } = await supabase
                .from("ibadan_events")
                .insert([eventPayload])
                .select()
                .single();

            if (createError) throw createError;
            console.log("✨ Event created:", newEvent);

            // 2. Create Tickets if any
            if (tickets.length > 0 && newEvent) {
                const ticketsPayload = tickets.map((ticket, index) => ({
                    ...ticket,
                    event_id: newEvent.id,
                    sort_order: index,
                    quantity_sold: 0,
                    is_available: true
                }));

                const { error: ticketsError } = await supabase
                    .from("event_tickets")
                    .insert(ticketsPayload);

                if (ticketsError) {
                    console.error("❌ Error creating tickets:", ticketsError);
                    // We don't throw here to avoid failing the whole operation if event was created
                    // But we should probably alert the user
                } else {
                    console.log("🎟️ Tickets created");
                }
            }

            setEvents((prev) => [newEvent, ...prev]);
            return { success: true, data: newEvent };
        } catch (err: any) {
            console.error("🚨 Error creating event:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    async function updateEvent(id: number, updates: Partial<IbadanEvent>, tickets: Partial<TicketTier>[] = [], imageFile?: File) {
        try {
            setLoading(true);
            let thumbnailUrl = updates.thumbnail;

            if (imageFile && updates.title) {
                thumbnailUrl = await uploadEventImage(imageFile, updates.title);
            }

            // 1. Update Event
            const { data: updatedEvent, error: updateError } = await supabase
                .from("ibadan_events")
                .update({ ...updates, thumbnail: thumbnailUrl })
                .eq("id", id)
                .select()
                .single();

            if (updateError) throw updateError;

            // 2. Handle Tickets (Upsert/Delete strategy is complex, for now we'll just upsert existing and insert new)
            // A simpler approach for MVP: 
            // - If ticket has ID, update it.
            // - If ticket has no ID, insert it.
            // - Deletions are handled separately or we can implement a sync strategy.
            
            if (tickets.length > 0) {
                const ticketsToUpsert = tickets.map((ticket, index) => ({
                    ...ticket,
                    event_id: id,
                    sort_order: index,
                    // Ensure defaults for new tickets
                    quantity_sold: ticket.quantity_sold ?? 0,
                    is_available: ticket.is_available ?? true
                }));

                const { error: ticketsError } = await supabase
                    .from("event_tickets")
                    .upsert(ticketsToUpsert);
                
                if (ticketsError) console.error("❌ Error updating tickets:", ticketsError);
            }

            setEvents((prev) => prev.map((e) => (e.id === id ? updatedEvent : e)));
            return { success: true, data: updatedEvent };
        } catch (err: any) {
            console.error("Error updating event:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    async function deleteEvent(id: number) {
        try {
            setLoading(true);
            // Tickets should cascade delete if foreign key is set up correctly, 
            // otherwise we might need to delete them first. Assuming cascade.
            const { error: deleteError } = await supabase
                .from("ibadan_events")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;

            setEvents((prev) => prev.filter((e) => e.id !== id));
            return { success: true };
        } catch (err: any) {
            console.error("Error deleting event:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    // Ticket specific actions
    async function deleteTicket(ticketId: string) {
        try {
             const { error } = await supabase
                .from("event_tickets")
                .delete()
                .eq("id", ticketId);
            
            if (error) throw error;
            return { success: true };
        } catch (err: any) {
             return { success: false, error: err.message };
        }
    }

    return {
        events,
        loading,
        error,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        deleteTicket
    };
}
