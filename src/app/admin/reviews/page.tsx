"use client";

import { useState } from "react";
import { useAdminReviews, ReviewStatus } from "@/hooks/admin/useAdminReviews";
import ReviewCard from "@/components/admin/reviews/ReviewCard";
import { Search, CheckSquare, XSquare } from "lucide-react";

export default function ReviewsPage() {
    const [statusFilter, setStatusFilter] = useState<ReviewStatus | "all">("pending");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set());

    const { reviews, loading, updateReviewStatus, bulkUpdateStatus, refetch } = useAdminReviews({
        status: statusFilter,
        search: searchQuery,
    });

    const handleApprove = async (id: string) => {
        const result = await updateReviewStatus(id, "approved");
        if (result.success) {
            refetch();
        }
    };

    const handleReject = async (id: string) => {
        const result = await updateReviewStatus(id, "rejected");
        if (result.success) {
            refetch();
        }
    };

    const handleBulkApprove = async () => {
        if (selectedReviews.size === 0) return;
        const result = await bulkUpdateStatus(Array.from(selectedReviews), "approved");
        if (result.success) {
            setSelectedReviews(new Set());
        }
    };

    const handleBulkReject = async () => {
        if (selectedReviews.size === 0) return;
        const result = await bulkUpdateStatus(Array.from(selectedReviews), "rejected");
        if (result.success) {
            setSelectedReviews(new Set());
        }
    };

    const toggleSelection = (id: string) => {
        const newSelection = new Set(selectedReviews);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedReviews(newSelection);
    };

    const selectAll = () => {
        if (selectedReviews.size === reviews.length) {
            setSelectedReviews(new Set());
        } else {
            setSelectedReviews(new Set(reviews.map(r => r.id)));
        }
    };

    const tabs = [
        { label: "Pending", value: "pending" as const, count: reviews.filter(r => r.status === "pending").length },
        { label: "All", value: "all" as const },
        { label: "Approved", value: "approved" as const },
        { label: "Rejected", value: "rejected" as const },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-chop-text-light">Review Management</h1>
                <p className="text-chop-text-subtle mt-1">Moderate user reviews for places and events</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* Status Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setStatusFilter(tab.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === tab.value
                                    ? "bg-chop-accent-cta text-black"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {tab.label}
                            {tab.count !== undefined && statusFilter === tab.value && (
                                <span className="ml-2 px-2 py-0.5 bg-black/20 rounded-full text-xs">
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-chop-accent-cta transition-colors"
                    />
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedReviews.size > 0 && (
                <div className="bg-chop-accent-cta/10 border border-chop-accent-cta/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-white font-medium">
                            {selectedReviews.size} review{selectedReviews.size > 1 ? "s" : ""} selected
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBulkApprove}
                                className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors border border-green-500/30 flex items-center gap-2"
                            >
                                <CheckSquare size={16} />
                                Approve All
                            </button>
                            <button
                                onClick={handleBulkReject}
                                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/30 flex items-center gap-2"
                            >
                                <XSquare size={16} />
                                Reject All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No reviews found</p>
                    <p className="text-gray-500 text-sm mt-2">
                        {statusFilter !== "all"
                            ? `No ${statusFilter} reviews at the moment`
                            : "Try adjusting your filters"}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Select All */}
                    {statusFilter === "pending" && reviews.length > 0 && (
                        <button
                            onClick={selectAll}
                            className="text-sm text-chop-accent-cta hover:text-chop-accent-point transition-colors"
                        >
                            {selectedReviews.size === reviews.length ? "Deselect All" : "Select All"}
                        </button>
                    )}

                    {/* Review Cards */}
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onApprove={handleApprove}
                            onReject={handleReject}
                            isSelected={selectedReviews.has(review.id)}
                            onSelect={statusFilter === "pending" ? toggleSelection : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
