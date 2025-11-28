"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Mail, Phone, Globe, Instagram, Twitter, Facebook, ExternalLink } from "lucide-react";
import { useOrganizer } from "@/hooks/useOrganizer";

type OrganizerCardProps = {
    organizerId?: string | null;
};

export default function OrganizerCard({ organizerId }: OrganizerCardProps) {
    const { organizer, events, loading } = useOrganizer(organizerId);

    if (!organizerId) return null;

    if (loading) {
        return (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md animate-pulse">
                <div className="h-24 bg-white/10 rounded-xl mb-4" />
                <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
                <div className="h-3 bg-white/10 rounded w-full" />
            </div>
        );
    }

    if (!organizer) return null;

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}&background=f8af2f&color=000`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4"
        >
            {/* Header */}
            <h3 className="text-lg font-semibold text-white">Event Organizer</h3>

            {/* Organizer Profile */}
            <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-chop-accent-point/50">
                    <Image
                        src={organizer.avatar_url || defaultAvatar}
                        alt={organizer.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-bold">{organizer.name}</h4>
                        {organizer.is_verified && (
                            <BadgeCheck className="w-5 h-5 text-chop-accent-point" />
                        )}
                    </div>
                    {organizer.bio && (
                        <p className="text-sm text-gray-300 line-clamp-2">{organizer.bio}</p>
                    )}
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
                {organizer.email && (
                    <a
                        href={`mailto:${organizer.email}`}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-chop-accent-point transition"
                    >
                        <Mail className="w-4 h-4" />
                        <span>{organizer.email}</span>
                    </a>
                )}
                {organizer.phone && (
                    <a
                        href={`tel:${organizer.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-chop-accent-point transition"
                    >
                        <Phone className="w-4 h-4" />
                        <span>{organizer.phone}</span>
                    </a>
                )}
            </div>

            {/* Social Links */}
            {organizer.social_links && (
                <div className="flex items-center gap-3">
                    {organizer.social_links.website && (
                        <a
                            href={organizer.social_links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <Globe className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {organizer.social_links.instagram && (
                        <a
                            href={organizer.social_links.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <Instagram className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {organizer.social_links.twitter && (
                        <a
                            href={organizer.social_links.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <Twitter className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {organizer.social_links.facebook && (
                        <a
                            href={organizer.social_links.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <Facebook className="w-4 h-4 text-white" />
                        </a>
                    )}
                </div>
            )}

            {/* Other Events */}
            {events.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                    <h5 className="text-sm font-semibold text-white mb-3">
                        Other Events by {organizer.name}
                    </h5>
                    <div className="space-y-2">
                        {events.slice(0, 3).map((event) => (
                            <Link
                                key={event.id}
                                href={`/events/${event.id}`}
                                className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-white group-hover:text-chop-accent-point transition">
                                            {event.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(event.start_date_time).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-chop-accent-point transition" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
