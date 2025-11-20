import React from "react";
import { Place } from "@/types/place";
import Image from "next/image";
import {
    BookOpen,
    ScrollText,
    HeartHandshake,
    Sparkles,
    UserRound
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {
    place: Partial<Place>;
};

export default function AboutTab({ place }: Props) {
    const defaultAvatar =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(place?.name || "User") +
        "&background=random";

    const highlights = place.special_highlights ?? [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
                w-full max-w-lg mx-auto
                rounded-2xl p-6 space-y-10
                backdrop-blur-xl bg-white/5
                border border-white/10
                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                text-chop-text-light
            "
        >

            {/* TITLE */}
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }} className="text-2xl font-bold tracking-tight text-white">
                About {place.name}
            </motion.h1>

            {/* SHORT DESCRIPTION */}
            {place.description && (
                <p className="text-gray-300 leading-relaxed">
                    {place.description}
                </p>
            )}

            {/* OPENING HOURS */}
            {place.opening_hours && (
                <SectionCard
                    title="Opening Hours"
                    icon={<Clock4Icon />}
                >
                    {typeof place.opening_hours === "string" ? (
                        <p className="text-gray-300">{place.opening_hours}</p>
                    ) : (
                        <ul className="text-gray-300 space-y-1">
                            {Object.entries(place.opening_hours).map(([day, hours]) => (
                                <li key={day}>
                                    <span className="font-medium">{day}:</span> {hours}
                                </li>
                            ))}
                        </ul>
                    )}
                </SectionCard>
            )}

            {/* CONTACT */}
            <SectionCard
                title="Contact"
                icon={<BookOpen size={18} className="text-[var(--color-chop-accent-point)]" />}
            >
                <div className="space-y-2 text-gray-300">
                    {place.contact_info?.phone && (
                        <p>
                            <span className="font-medium text-white">Phone:</span>{" "}
                            {place.contact_info.phone}
                        </p>
                    )}

                    {place.contact_info?.website && (
                        <p>
                            <span className="font-medium text-white">Website:</span>{" "}
                            <a
                                href={place.contact_info.website}
                                target="_blank"
                                className="text-[var(--color-chop-accent-point)] underline"
                            >
                                {place.contact_info.website}
                            </a>
                        </p>
                    )}

                    <p>
                        <span className="font-medium text-white">Reservations:</span>{" "}
                        {place.accepts_reservations ? "Yes" : "No"}
                    </p>

                    {place.picture_policy && (
                        <p>
                            <span className="font-medium text-white">Picture Policy:</span>{" "}
                            {place.picture_policy}
                        </p>
                    )}
                </div>
            </SectionCard>

            {/* ORIGIN STORY */}
            {place.origin_story && (
                <SectionCard
                    title="Origin Story"
                    icon={<ScrollText size={18} className="text-[var(--color-chop-accent-point)]" />}
                >
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {place.origin_story}
                    </p>
                </SectionCard>
            )}

            {/* MISSION */}
            {place.mission && (
                <SectionCard
                    title="Mission"
                    icon={<HeartHandshake size={18} className="text-[var(--color-chop-accent-point)]" />}
                >
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {place.mission}
                    </p>
                </SectionCard>
            )}

            {/* SPECIAL HIGHLIGHTS */}
            {highlights.length > 0 && (
                <SectionCard
                    title="What Makes Them Special"
                    icon={<Sparkles size={18} className="text-[var(--color-chop-accent-point)]" />}
                >
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {highlights.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </SectionCard>
            )}

            {/* CHEF / FOUNDER */}
            {place.chef_founder?.name && (
                <SectionCard
                    title="Chef / Founder"
                    icon={<UserRound size={18} className="text-[var(--color-chop-accent-point)]" />}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-50 h-14 rounded-full overflow-hidden border border-white/10">
                            <Image
                                src={place.chef_founder.image_url || defaultAvatar}
                                alt={place.chef_founder.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="font-semibold text-white">
                                {place.chef_founder.name} — {place.chef_founder.role}
                            </p>
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                                {place.chef_founder.bio}
                            </p>
                        </div>
                    </div>
                </SectionCard>
            )}
        </motion.div>
    );
}

/* Reusable Section Component */
function SectionCard({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section
            className="
                p-4 rounded-xl
                bg-white/5 border border-white/10
                backdrop-blur-md shadow-sm
                space-y-3
            "
        >
            <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-lg font-semibold text-white drop-shadow">
                    {title}
                </h2>
            </div>

            <div>{children}</div>
        </section>
    );
}

/* Clock icon */
function Clock4Icon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="text-[var(--color-chop-accent-point)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
}
