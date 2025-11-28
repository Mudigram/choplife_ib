"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Heart, Star, ExternalLink } from "lucide-react";
import { useEventAttendees, AttendeeStatus } from "@/hooks/useEventAttendees";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

type EventCTAProps = {
    eventId: string | number;
    eventTitle: string;
    eventDate?: string;
    ticketLink?: string | null;
    attendeeCount?: number;
};

export default function EventCTA({
    eventId,
    eventTitle,
    eventDate,
    ticketLink,
    attendeeCount = 0,
}: EventCTAProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { counts, userStatus, checkUserStatus, toggleRSVP } = useEventAttendees(eventId);

    useEffect(() => {
        if (user?.id) {
            checkUserStatus(user.id);
        }
    }, [user?.id]);

    const handleRSVP = async (status: AttendeeStatus) => {
        if (!user) {
            // Redirect to login or show auth modal
            window.location.href = "/login";
            return;
        }

        await toggleRSVP(user.id, status);
    };

    const handleAddToCalendar = () => {
        if (!eventDate) return;

        // Create .ics file for calendar download
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ChopLife//Event//EN
BEGIN:VEVENT
UID:${eventId}@choplife.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${new Date(eventDate).toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${eventTitle}
DESCRIPTION:Event from ChopLife
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${eventTitle.replace(/\s+/g, "_")}.ics`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const totalAttendees = counts.total || attendeeCount;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto px-4 py-6"
        >
            <div className="bg-gradient-to-br from-chop-accent-cta/10 to-chop-accent-point/10 border border-chop-accent-point/30 rounded-3xl p-6 backdrop-blur-xl">
                {/* Attendee Count */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-chop-accent-point" />
                    <span className="text-white font-semibold">
                        {totalAttendees} {totalAttendees === 1 ? "person" : "people"} going
                    </span>
                </div>

                {/* RSVP Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                        onClick={() => handleRSVP("going")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userStatus === "going"
                                ? "bg-green-500/20 border-green-500 text-green-400"
                                : "bg-white/5 border-white/10 text-white hover:border-green-500/50"
                            }`}
                    >
                        <Heart
                            className={`w-6 h-6 ${userStatus === "going" ? "fill-green-400" : ""}`}
                        />
                        <span className="text-xs font-medium">Going</span>
                        {counts.going > 0 && (
                            <span className="text-xs text-gray-400">{counts.going}</span>
                        )}
                    </button>

                    <button
                        onClick={() => handleRSVP("interested")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userStatus === "interested"
                                ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                                : "bg-white/5 border-white/10 text-white hover:border-yellow-500/50"
                            }`}
                    >
                        <Star
                            className={`w-6 h-6 ${userStatus === "interested" ? "fill-yellow-400" : ""}`}
                        />
                        <span className="text-xs font-medium">Interested</span>
                        {counts.interested > 0 && (
                            <span className="text-xs text-gray-400">{counts.interested}</span>
                        )}
                    </button>

                    <button
                        onClick={() => handleRSVP("maybe")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${userStatus === "maybe"
                                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                : "bg-white/5 border-white/10 text-white hover:border-blue-500/50"
                            }`}
                    >
                        <Calendar className={`w-6 h-6 ${userStatus === "maybe" ? "fill-blue-400" : ""}`} />
                        <span className="text-xs font-medium">Maybe</span>
                        {counts.maybe > 0 && (
                            <span className="text-xs text-gray-400">{counts.maybe}</span>
                        )}
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    {/* Get Tickets Button */}
                    {ticketLink && (
                        <Link
                            href={ticketLink}
                            target={ticketLink.startsWith("http") ? "_blank" : "_self"}
                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-xl font-bold text-white shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-105 active:scale-95 transition-all"
                        >
                            <span>Get Tickets</span>
                            {ticketLink.startsWith("http") && (
                                <ExternalLink className="w-4 h-4" />
                            )}
                        </Link>
                    )}

                    {/* Add to Calendar */}
                    {eventDate && (
                        <button
                            onClick={handleAddToCalendar}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition"
                        >
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">Add to Calendar</span>
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
