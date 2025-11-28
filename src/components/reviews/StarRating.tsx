"use client";

import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = {
    rating: number;
    onRatingChange: (rating: number) => void;
    size?: number;
    readonly?: boolean;
};

export default function StarRating({
    rating,
    onRatingChange,
    size = 32,
    readonly = false,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value: number) => {
        if (!readonly) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value: number) => {
        if (!readonly) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (!readonly) {
            setHoverRating(0);
        }
    };

    const displayRating = hoverRating || rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    type="button"
                    onClick={() => handleClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                    disabled={readonly}
                    className={`transition-all duration-200 ${readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
                        }`}
                >
                    <Star
                        size={size}
                        className={`transition-colors duration-200 ${value <= displayRating
                                ? "fill-chop-accent-point text-chop-accent-point"
                                : "text-chop-text-subtle"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}
