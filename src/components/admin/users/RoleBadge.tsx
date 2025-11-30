import { UserRole } from "@/lib/auth/roles";
import { Shield, CheckCircle, User } from "lucide-react";

type RoleBadgeProps = {
    role: UserRole;
};

export default function RoleBadge({ role }: RoleBadgeProps) {
    switch (role) {
        case "admin":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    <Shield size={12} />
                    Admin
                </span>
            );
        case "verified_reviewer":
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-chop-accent-cta/20 text-chop-accent-cta border border-chop-accent-cta/30">
                    <CheckCircle size={12} />
                    Verified
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-400 border border-white/10">
                    <User size={12} />
                    User
                </span>
            );
    }
}
