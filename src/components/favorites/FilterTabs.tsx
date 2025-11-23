"use client";

type FilterTabsProps = {
    activeFilter: "all" | "places" | "events";
    onFilterChange: (filter: "all" | "places" | "events") => void;
};

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
    const tabs = [
        { id: "all" as const, label: "All" },
        { id: "places" as const, label: "Places" },
        { id: "events" as const, label: "Events" },
    ];

    return (
        <div className="flex gap-2 p-4 border-b border-white/10">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onFilterChange(tab.id)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${activeFilter === tab.id
                            ? "bg-chop-accent-cta text-white shadow-md"
                            : "bg-white/5 text-gray-300 hover:bg-white/10"
                        }
                    `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
