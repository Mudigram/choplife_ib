"use client";

import { X, Bell } from "lucide-react";

type ComingSoonModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
};

export default function ComingSoonModal({
    isOpen,
    onClose,
    title = "Coming Soon",
    message = "We're working hard to bring you this feature. Stay tuned!"
}: ComingSoonModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-chop-bg-dark border border-white/10 p-6 w-full max-w-sm rounded-2xl shadow-xl relative animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-chop-text-subtle hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <div className="w-16 h-16 rounded-full bg-chop-accent-cta/10 flex items-center justify-center mb-2">
                        <Bell className="w-8 h-8 text-chop-accent-cta" />
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                        {title}
                    </h3>

                    <p className="text-chop-text-subtle text-sm leading-relaxed">
                        {message}
                    </p>

                    <button
                        onClick={onClose}
                        className="mt-4 w-full py-3 bg-chop-accent-cta hover:bg-chop-accent-cta/90 text-white rounded-xl font-medium transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
