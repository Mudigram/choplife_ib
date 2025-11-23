"use client";

import {
    Heart,
    Wallet,
    Laptop,
    Moon,
    Music,
    TreePine,
    Coffee,
    Utensils,
    LayoutGrid
} from "lucide-react";


// Define a simple type for the filter tags
type Category = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

type CategoryFilterBarProps = {
    selected: string | null;
    onFilterSelect: (categoryId: string) => void;
};

// Curated Collections
const MOCK_CATEGORIES: Category[] = [
    { id: "all", label: "All", icon: <LayoutGrid size={16} /> },
    { id: "date_night", label: "Date Night", icon: <Heart size={16} /> },
    { id: "budget", label: "Budget Eats", icon: <Wallet size={16} /> },
    { id: "work_friendly", label: "Work Friendly", icon: <Laptop size={16} /> },
    { id: "late_night", label: "Late Night", icon: <Moon size={16} /> },
    { id: "live_music", label: "Live Music", icon: <Music size={16} /> },
    { id: "outdoor", label: "Outdoor", icon: <TreePine size={16} /> },
    { id: "cafes", label: "Cozy Cafes", icon: <Coffee size={16} /> },
    { id: "fine_dining", label: "Fine Dining", icon: <Utensils size={16} /> },
];


export default function CategoryFilterBar({ selected, onFilterSelect }: CategoryFilterBarProps) {
    const handleFilterClick = (id: string) => {
        onFilterSelect(id);
    };

    return (
        // Outer container for the filter bar
        // Uses `overflow-x-auto` to enable horizontal scrolling on mobile
        <div className="w-full bg-chop-bg-dark pt-2 pb-4">
            <div className="flex space-x-3 scrollbar-none overflow-x-auto overflow-hidden px-4 max-w-lg mx-auto">

                {MOCK_CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterClick(category.id)}
                        className={`
                        flex-shrink-0 
                        py-1.5 px-3 
                        text-sm font-medium
                        flex items-center gap-2 
                        rounded-full 
                        transition-colors duration-200
                        ${(selected === category.id || (category.id === 'all' && !selected))
                                ? 'bg-chop-accent-cta text-white shadow-md backdrop-blur-xl' // Active style
                                : 'backdrop-blur-2xl bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 shadow-lg' // Inactive glassy style
                            }
                    `}
                    >
                        {category.label}
                        {category.icon}
                    </button>
                ))}

            </div>
            {/* Utility class to hide scrollbar while keeping scroll functionality */}
            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
        </div>
    );
}