"use client";

import Link from "next/link";
import { Home, MapPin } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-chop-bg-dark flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-chop-accent-cta)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-chop-accent-point)]/10 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6 max-w-lg">
                {/* Main 404 Text */}
                <h1 className="text-[150px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-chop-accent-cta)] to-[var(--color-chop-accent-point)] opacity-80 select-none">
                    404
                </h1>

                {/* Thematic Headline */}
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Omo! You Don Lost? 🤷🏾‍♂️
                </h2>

                {/* Subtext */}
                <p className="text-gray-400 text-lg">
                    The page you're looking for is either broken or enjoying life somewhere else in Ibadan.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Home size={20} />
                        Go Back Home
                    </Link>

                    <Link
                        href="/places"
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <MapPin size={20} />
                        Find a Place
                    </Link>
                </div>
            </div>
        </div>
    );
}
