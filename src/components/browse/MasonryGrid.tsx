import React from "react";

type MasonryGridProps = {
    children: React.ReactNode;
    className?: string;
};

export default function MasonryGrid({ children, className = "" }: MasonryGridProps) {
    return (
        <div className={`columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 ${className}`}>
            {children}
        </div>
    );
}
