import { ActivityItem } from "@/hooks/admin/useAdminStats";
import { MessageSquare, UserPlus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

type RecentActivityFeedProps = {
    activities: ActivityItem[];
};

export default function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(activities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedActivities = activities.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                <span className="text-xs text-gray-500">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, activities.length)} of {activities.length}
                </span>
            </div>

            <div className="space-y-6 flex-1">
                {displayedActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 group">
                        <div className="relative mt-1">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10">
                                {activity.image_url ? (
                                    <Image
                                        src={activity.image_url}
                                        alt={activity.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="text-gray-400">
                                        {activity.type === "review" && <MessageSquare size={18} />}
                                        {activity.type === "user_signup" && <UserPlus size={18} />}
                                        {activity.type === "event_created" && <Calendar size={18} />}
                                    </div>
                                )}
                            </div>
                            {/* Connector Line */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-full bg-white/10 group-last:hidden" />
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-medium text-white">{activity.title}</p>
                                <span className="text-xs text-gray-500">
                                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400">{activity.subtitle}</p>
                            {activity.status && (
                                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${activity.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                                        activity.status === "approved" ? "bg-green-500/20 text-green-400" :
                                            "bg-red-500/20 text-red-400"
                                    }`}>
                                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="text-center text-gray-500 py-8">No recent activity</div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 mt-auto border-t border-white/10">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
