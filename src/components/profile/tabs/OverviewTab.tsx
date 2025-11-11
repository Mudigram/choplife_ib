"use client";

import { Calendar, Star, MapPin } from "lucide-react";

type OverviewTabProps = {
    user: {
        total_points?: number;
        tags?: string[];
        created_at?: string;
        reviews_count?: number;
        favorites_count?: number;
    };
};

export default function OverviewTab({ user }: OverviewTabProps) {
    const {
        total_points = 0,
        tags = [],
        created_at,
        reviews_count = 0,
        favorites_count = 0,
    } = user;

    const joinDate = created_at
        ? new Date(created_at).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
        })
        : "—";

    return (
        <div className="p-5">
            {/* Points */}
            <div className="bg-chop-accent-point/10 border border-chop-accent-point/20 rounded-2xl p-4 mb-6 text-center">
                <h2 className="text-3xl font-bold text-chop-accent-point">{total_points}</h2>
                <p className="text-sm text-chop-text-subtle mt-1">Total ChopCoins Earned</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-chop-bg-card rounded-xl p-3 flex flex-col items-center border border-white/10">
                    <Star className="text-chop-accent-point mb-1" size={20} />
                    <p className="text-lg font-semibold text-chop-text-light">{reviews_count}</p>
                    <p className="text-xs text-chop-text-subtle">Reviews</p>
                </div>

                <div className="bg-chop-bg-card rounded-xl p-3 flex flex-col items-center border border-white/10">
                    <MapPin className="text-chop-accent-status mb-1" size={20} />
                    <p className="text-lg font-semibold text-chop-text-light">{favorites_count}</p>
                    <p className="text-xs text-chop-text-subtle">Favorites</p>
                </div>
            </div>

            {/* Tags / Interests */}
            {tags.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-chop-text-light mb-2">
                        Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-chop-accent-status/20 text-chop-accent-status text-xs px-3 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Join Date */}
            <div className="flex items-center text-chop-text-subtle text-sm">
                <Calendar size={16} className="mr-2" />
                Joined {joinDate}
            </div>
        </div>
    );
}
