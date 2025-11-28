"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type AttendeeStatus = "going" | "interested" | "maybe";

export type Attendee = {
    id: string;
    user_id: string;
    status: AttendeeStatus;
    created_at: string;
    username?: string;
    avatar_url?: string;
};

export function useEventAttendees(eventId?: string | number) {
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userStatus, setUserStatus] = useState<AttendeeStatus | null>(null);
    const [counts, setCounts] = useState({
        going: 0,
        interested: 0,
        maybe: 0,
        total: 0,
    });

    // Fetch attendees
    useEffect(() => {
        if (!eventId) return;

        async function fetchAttendees() {
            setLoading(true);
            setError(null);

            try {
                const { data, error: fetchError } = await supabase
                    .from("event_attendees")
                    .select(`
                        id,
                        user_id,
                        status,
                        created_at,
                        users:user_id (username, avatar_url)
                    `)
                    .eq("event_id", eventId)
                    .order("created_at", { ascending: false });

                if (fetchError) throw fetchError;

                const formattedAttendees = (data || []).map((a: any) => ({
                    id: a.id,
                    user_id: a.user_id,
                    status: a.status,
                    created_at: a.created_at,
                    username: a.users?.username,
                    avatar_url: a.users?.avatar_url,
                }));

                setAttendees(formattedAttendees);

                // Calculate counts
                const going = formattedAttendees.filter((a) => a.status === "going").length;
                const interested = formattedAttendees.filter((a) => a.status === "interested").length;
                const maybe = formattedAttendees.filter((a) => a.status === "maybe").length;

                setCounts({
                    going,
                    interested,
                    maybe,
                    total: formattedAttendees.length,
                });
            } catch (err: any) {
                setError(err.message || "Failed to fetch attendees");
            } finally {
                setLoading(false);
            }
        }

        fetchAttendees();
    }, [eventId]);

    // Check user's current RSVP status
    const checkUserStatus = async (userId: string) => {
        if (!eventId || !userId) return;

        try {
            const { data } = await supabase
                .from("event_attendees")
                .select("status")
                .eq("event_id", eventId)
                .eq("user_id", userId)
                .single();

            setUserStatus(data?.status || null);
        } catch (err) {
            setUserStatus(null);
        }
    };

    // Toggle RSVP status
    const toggleRSVP = async (userId: string, status: AttendeeStatus) => {
        if (!eventId || !userId) return { success: false, error: "Missing required data" };

        try {
            // If clicking the same status, remove RSVP
            if (userStatus === status) {
                const { error: deleteError } = await supabase
                    .from("event_attendees")
                    .delete()
                    .eq("event_id", eventId)
                    .eq("user_id", userId);

                if (deleteError) throw deleteError;
                setUserStatus(null);
            } else {
                // Upsert new status
                const { error: upsertError } = await supabase
                    .from("event_attendees")
                    .upsert(
                        {
                            event_id: eventId,
                            user_id: userId,
                            status: status,
                        },
                        {
                            onConflict: "event_id,user_id",
                        }
                    );

                if (upsertError) throw upsertError;
                setUserStatus(status);
            }

            // Refresh attendees list
            const { data } = await supabase
                .from("event_attendees")
                .select(`
                    id,
                    user_id,
                    status,
                    created_at,
                    users:user_id (username, avatar_url)
                `)
                .eq("event_id", eventId)
                .order("created_at", { ascending: false });

            const formattedAttendees = (data || []).map((a: any) => ({
                id: a.id,
                user_id: a.user_id,
                status: a.status,
                created_at: a.created_at,
                username: a.users?.username,
                avatar_url: a.users?.avatar_url,
            }));

            setAttendees(formattedAttendees);

            const going = formattedAttendees.filter((a) => a.status === "going").length;
            const interested = formattedAttendees.filter((a) => a.status === "interested").length;
            const maybe = formattedAttendees.filter((a) => a.status === "maybe").length;

            setCounts({
                going,
                interested,
                maybe,
                total: formattedAttendees.length,
            });

            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return {
        attendees,
        loading,
        error,
        counts,
        userStatus,
        checkUserStatus,
        toggleRSVP,
    };
}
