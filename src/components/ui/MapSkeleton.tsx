export default function MapSkeleton() {
    return (
        <div className="w-full h-full min-h-[300px] rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse flex items-center justify-center">
            <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-gray-700/50 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                </div>
                <p className="text-sm text-gray-400">Loading map...</p>
            </div>
        </div>
    );
}
