"use client";

import { useState } from 'react';

// Define a simple type for the filter tags
type Category = {
    id: string;
    label: string;
};

type CategoryFilterBarProps = {
    // A function to call when a user clicks a tag, allowing the parent (HomePage) to filter the feed.
    onFilterSelect: (categoryId: string) => void;
};

// ⚠️ MOCK DATA: In a real app, this would be fetched from Supabase ('categories' table)
const MOCK_CATEGORIES: Category[] = [
    { id: 'all', label: 'All Chops' },
    { id: 'nigerian', label: 'Nigerian 🇳🇬' },
    { id: 'ghanaian', label: 'Ghanaian 🇬🇭' },
    { id: 'quick', label: 'Quick Chop ⚡' },
    { id: 'budget', label: 'Budget Bites 💰' },
    { id: 'verified', label: 'Verified Chefs ✅' },
    { id: 'drinks', label: 'Drinks & Cocktails 🍹' },
];

export default function CategoryFilterBar({ onFilterSelect }: CategoryFilterBarProps) {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterClick = (id: string) => {
        setActiveFilter(id);
        onFilterSelect(id);
    };

    return (
        // Outer container for the filter bar
        // Uses `overflow-x-auto` to enable horizontal scrolling on mobile
        <div className="w-full bg-chop-bg-dark pt-2 pb-4">
            <div className="flex space-x-3 overflow-x-auto overflow-hidden px-4 max-w-lg mx-auto">

                {MOCK_CATEGORIES.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterClick(category.id)}
                        className={`
                        flex-shrink-0 
                        py-1.5 px-3 
                        text-sm font-medium 
                        rounded-full 
                        transition-colors duration-200
                        ${activeFilter === category.id
                                ? 'bg-chop-accent-cta text-white shadow-md backdrop-blur-xl' // Active style
                                : 'backdrop-blur-2xl bg-white/10 border border-white/20 text-gray-100 hover:bg-white/20 shadow-lg' // Inactive glassy style
                            }
                    `}
                    >
                        {category.label}
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