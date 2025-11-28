"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Star, Calendar } from "lucide-react";
import Image from "next/image";
import { useEventAttendees } from "@/hooks/useEventAttendees";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type AttendeesSectionProps = {
    eventId: string | number;
};

export default function AttendeesSection({ eventId }: AttendeesSectionProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { attendees, counts, userStatus, checkUserStatus } = useEventAttendees(eventId);

    useEffect(() => {
        if (user?.id) {
            checkUserStatus(user.id);
        }
    }, [user?.id]);

    // Get attendees who are "going"
    const goingAttendees = attendees.filter((a) => a.status === "going").slice(0, 10);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4"
        >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-chop-accent-point" />
                Who's Attending
            </h3>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                    <Heart className="w-5 h-5 text-green-400 mb-1" />
                    <span className="text-2xl font-bold text-green-400">{counts.going}</span>
                    <span className="text-xs text-gray-400">Going</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <Star className="w-5 h-5 text-yellow-400 mb-1" />
                    <span className="text-2xl font-bold text-yellow-400">{counts.interested}</span>
                    <span className="text-xs text-gray-400">Interested</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                    <Calendar className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-2xl font-bold text-blue-400">{counts.maybe}</span>
                    <span className="text-xs text-gray-400">Maybe</span>
                </div>
            </div>

            {/* Attendee Avatars */}
            {goingAttendees.length > 0 && (
                <div>
                    <p className="text-sm text-gray-400 mb-3">
                        {counts.going} {counts.going === 1 ? "person is" : "people are"} going
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Avatar Stack */}
                        <div className="flex -space-x-3">
                            {goingAttendees.slice(0, 5).map((attendee, index) => (
                                <div
                                    key={attendee.id}
                                    className="relative w-10 h-10 rounded-full border-2 border-chop-bg-card overflow-hidden bg-gradient-to-br from-chop-accent-cta to-chop-accent-point"
                                    style={{ zIndex: 10 - index }}
                                >
                                    {attendee.avatar_url ? (
                                        <Image
                                            src={attendee.avatar_url}
                                            alt={attendee.username || "User"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                                            {(attendee.username || "?")[0].toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* More count */}
                        {counts.going > 5 && (
                            <span className="text-sm text-gray-400 ml-2">
                                +{counts.going - 5} more
                            </span>
                        )}
                    </div>

                    {/* Attendee Names */}
                    {goingAttendees.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {goingAttendees.slice(0, 8).map((attendee) => (
                                <div
                                    key={attendee.id}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                                >
                                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-chop-accent-cta to-chop-accent-point">
                                        {attendee.avatar_url ? (
                                            <Image
                                                src={attendee.avatar_url}
                                                alt={attendee.username || "User"}
                                                width={24}
                                                height={24}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                                                {(attendee.username || "?")[0].toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-sm text-white">
                                        {attendee.username || "Anonymous"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* User's Status */}
            {userStatus && (
                <div className="p-3 rounded-xl bg-chop-accent-point/10 border border-chop-accent-point/30">
                    <p className="text-sm text-chop-accent-point">
                        You're marked as <span className="font-bold capitalize">{userStatus}</span>
                    </p>
                </div>
            )}
        </motion.div>
    );
}
