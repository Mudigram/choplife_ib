"use client";

import { useState } from "react";
import { Share, X, Check, Facebook, Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type ShareButtonsProps = {
    title: string;
    url?: string;
    description?: string;
};

export default function ShareButtons({ title, url, description }: ShareButtonsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = description || `Check out ${title} on ChopLife!`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
            toast.error("Failed to copy link");
        }
    };

    const handleShare = async (platform: string) => {
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedText = encodeURIComponent(shareText);

        const shareLinks = {
            whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            instagram: shareUrl, // Instagram doesn't support web sharing, just copy link
        };

        if (platform === 'instagram') {
            await handleCopyLink();
            return;
        }

        window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
        setIsOpen(false);
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: shareText,
                    url: shareUrl,
                });
                setIsOpen(false);
            } catch (err) {
                // User cancelled, just close
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error("Share failed:", err);
                }
            }
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            {/* Share Button */}
            <button
                onClick={handleNativeShare}
                className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
            >
                {copied ? (
                    <Check size={22} className="text-green-400" />
                ) : (
                    <Share size={22} className="text-white" />
                )}
            </button>

            {/* Share Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-chop-bg-card/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.2)] p-6 max-w-sm w-full"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-chop-text-light">Share Event</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-chop-text-subtle hover:text-chop-text-light transition"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Share Options */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {/* WhatsApp */}
                                <button
                                    onClick={() => handleShare('whatsapp')}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-white">WhatsApp</span>
                                </button>

                                {/* Twitter */}
                                <button
                                    onClick={() => handleShare('twitter')}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Twitter className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Twitter</span>
                                </button>

                                {/* Facebook */}
                                <button
                                    onClick={() => handleShare('facebook')}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-blue-600/10 border border-blue-600/30 hover:bg-blue-600/20 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                                        <Facebook className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <span className="text-sm font-medium text-white">Facebook</span>
                                </button>

                                {/* Copy Link */}
                                <button
                                    onClick={handleCopyLink}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                        {copied ? (
                                            <Check className="w-6 h-6 text-green-400" />
                                        ) : (
                                            <LinkIcon className="w-6 h-6 text-white" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-white">
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
