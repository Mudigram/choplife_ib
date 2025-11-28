"use client";

import { motion } from "framer-motion";
import { Loader2, Check, X, Ticket } from "lucide-react";
import { useEventTickets } from "@/hooks/useEventTickets";
import Link from "next/link";

type TicketsTabProps = {
    eventId: string | number;
    ticketLink?: string | null;
};

export default function TicketsTab({ eventId, ticketLink }: TicketsTabProps) {
    const { tickets, loading, error } = useEventTickets(eventId);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-chop-accent-point" />
            </div>
        );
    }

    if (error || tickets.length === 0) {
        return (
            <div className="w-full max-w-lg mx-auto p-6 text-center">
                <p className="text-gray-400 mb-4">
                    {error ? "Failed to load tickets" : "No ticket information available"}
                </p>
                {ticketLink && (
                    <Link
                        href={ticketLink}
                        target={ticketLink.startsWith("http") ? "_blank" : "_self"}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-xl font-bold text-white hover:scale-105 transition"
                    >
                        <Ticket className="w-5 h-5" />
                        Get Tickets
                    </Link>
                )}
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4 space-y-4">
            {tickets.map((tier, index) => {
                const soldOut = tier.quantity_total ? tier.quantity_sold >= tier.quantity_total : false;
                const percentSold = tier.quantity_total
                    ? Math.round((tier.quantity_sold / tier.quantity_total) * 100)
                    : 0;

                return (
                    <motion.div
                        key={tier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-6 rounded-2xl border-2 backdrop-blur-md ${soldOut
                                ? "bg-gray-800/20 border-gray-600/30"
                                : index === 0
                                    ? "bg-gradient-to-br from-chop-accent-cta/20 to-chop-accent-point/20 border-chop-accent-point/50"
                                    : "bg-white/5 border-white/20"
                            }`}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {tier.tier_name}
                                    {index === 0 && !soldOut && (
                                        <span className="text-xs bg-chop-accent-point text-black px-2 py-1 rounded-full">
                                            BEST VALUE
                                        </span>
                                    )}
                                </h3>
                                {tier.description && (
                                    <p className="text-sm text-gray-400 mt-1">{tier.description}</p>
                                )}
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-chop-accent-point">
                                    ₦{tier.price_ngn.toLocaleString()}
                                </div>
                                {tier.quantity_total && (
                                    <div className="text-xs text-gray-400 mt-1">
                                        {tier.quantity_total - tier.quantity_sold} left
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Benefits */}
                        {tier.benefits && tier.benefits.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {tier.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-300">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Availability */}
                        {tier.quantity_total && (
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                    <span>Availability</span>
                                    <span>{percentSold}% sold</span>
                                </div>
                                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all ${percentSold >= 90 ? "bg-red-500" : "bg-chop-accent-point"
                                            }`}
                                        style={{ width: `${percentSold}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Button */}
                        {soldOut ? (
                            <button
                                disabled
                                className="w-full py-3 rounded-xl bg-gray-600 text-gray-400 font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Sold Out
                            </button>
                        ) : tier.is_available && ticketLink ? (
                            <Link
                                href={ticketLink}
                                target={ticketLink.startsWith("http") ? "_blank" : "_self"}
                                className="block w-full py-3 rounded-xl bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold text-center hover:scale-105 transition"
                            >
                                Select {tier.tier_name}
                            </Link>
                        ) : (
                            <button
                                disabled
                                className="w-full py-3 rounded-xl bg-gray-600 text-gray-400 font-semibold cursor-not-allowed"
                            >
                                Unavailable
                            </button>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
