import React from 'react'
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div>
            <div className="mt-4">
                <div className="flex items-center gap-2 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/20 px-4 py-2">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <input
                        placeholder="Search for Events"
                        className="flex-1 bg-transparent outline-none text-chop-text-light placeholder-zinc-400"
                        style={{ fontSize: "16px" }}
                    />

                </div>
            </div>
        </div>
    )
}
