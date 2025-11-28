"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket } from "lucide-react";
import Link from "next/link";

type GetTicketsFABProps = {
    ticketLink?: string | null;
    eventId?: string;
    eventTitle?: string;
};

export default function GetTicketsFAB({ ticketLink, eventId, eventTitle }: GetTicketsFABProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show FAB when scrolled past 300px
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render if no ticket link
    if (!ticketLink) return null;

    const isExternalLink = ticketLink.startsWith('http');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-24 right-6 z-40"
                >
                    {isExternalLink ? (
                        <a
                            href={ticketLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-full shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:shadow-[0_0_40px_rgba(248,175,47,0.8)] hover:scale-110 active:scale-95 transition-all group"
                        >
                            <Ticket className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                            <span className="font-bold text-white">Get Tickets</span>
                        </a>
                    ) : (
                        <Link
                            href={ticketLink}
                            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-full shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:shadow-[0_0_40px_rgba(248,175,47,0.8)] hover:scale-110 active:scale-95 transition-all group"
                        >
                            <Ticket className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
                            <span className="font-bold text-white">Get Tickets</span>
                        </Link>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
