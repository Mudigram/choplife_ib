"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Loader2 } from "lucide-react";
import { useEventFAQs } from "@/hooks/useEventFAQs";

type FAQSectionProps = {
    eventId: string | number;
};

export default function FAQSection({ eventId }: FAQSectionProps) {
    const { faqs, loading } = useEventFAQs(eventId);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-chop-accent-point" />
            </div>
        );
    }

    if (faqs.length === 0) {
        return null;
    }

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3"
        >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-chop-accent-point" />
                Frequently Asked Questions
            </h3>

            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-white/5 transition"
                        >
                            <span className="font-medium text-white pr-4">{faq.question}</span>
                            <ChevronDown
                                className={`w-5 h-5 text-chop-accent-point transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 text-gray-300 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
