import Link from "next/link";
import { ReactNode } from "react";

type EmptyStateProps = {
    icon: ReactNode;
    title: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
};

export default function EmptyState({
    icon,
    title,
    description,
    ctaText,
    ctaLink,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            {/* Icon */}
            <div className="mb-4 text-gray-500 opacity-50">
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-6 max-w-md">
                {description}
            </p>

            {/* CTA Button */}
            {ctaText && ctaLink && (
                <Link
                    href={ctaLink}
                    className="px-6 py-2.5 bg-chop-accent-cta text-white rounded-full font-medium hover:bg-chop-accent-cta/90 transition-colors shadow-lg"
                >
                    {ctaText}
                </Link>
            )}
        </div>
    );
}
