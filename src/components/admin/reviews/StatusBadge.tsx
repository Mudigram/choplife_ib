import { ReviewStatus } from "@/hooks/admin/useAdminReviews";

type StatusBadgeProps = {
    status: ReviewStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const styles = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        approved: "bg-green-500/20 text-green-400 border-green-500/30",
        rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
