"use client";

import { AlertTriangle, Mail, Phone, Flag } from "lucide-react";
import { useOrganizer } from "@/hooks/useOrganizer";

type ContactSectionProps = {
    organizerId?: string | null;
};

export default function ContactSection({ organizerId }: ContactSectionProps) {
    const { organizer, loading } = useOrganizer(organizerId);

    if (!organizerId || loading || !organizer) return null;

    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact & Support</h3>

            {/* Organizer Contact */}
            <div className="space-y-2">
                <p className="text-sm text-gray-400">Have questions? Reach out to the organizer:</p>

                {organizer.email && (
                    <a
                        href={`mailto:${organizer.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">Email</p>
                            <p className="text-xs text-gray-400 group-hover:text-blue-400 transition">
                                {organizer.email}
                            </p>
                        </div>
                    </a>
                )}

                {organizer.phone && (
                    <a
                        href={`tel:${organizer.phone}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition group"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">Phone</p>
                            <p className="text-xs text-gray-400 group-hover:text-green-400 transition">
                                {organizer.phone}
                            </p>
                        </div>
                    </a>
                )}
            </div>

            {/* Report Event */}
            <button className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition w-full text-left group">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Flag className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-white">Report Event</p>
                    <p className="text-xs text-gray-400">Report inappropriate content or issues</p>
                </div>
            </button>

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-300">
                    ChopLife is a platform connecting you with events. The event organizer is solely responsible for the event content and operations.
                </p>
            </div>
        </div>
    );
}
