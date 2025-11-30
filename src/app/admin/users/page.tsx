"use client";

import { useState } from "react";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import UsersTable from "@/components/admin/users/UsersTable";
import { Search, Users as UsersIcon } from "lucide-react";
import { UserRole } from "@/lib/auth/roles";

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");

    const { users, loading, updateUserRole, deleteUser } = useAdminUsers({
        search: searchQuery,
        roleFilter: roleFilter,
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-chop-text-light">Users</h1>
                <p className="text-chop-text-subtle mt-1">Manage user roles and permissions</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-chop-accent-cta transition-colors"
                    />
                </div>

                <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
                    {(["all", "verified_reviewer", "admin"] as const).map((role) => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${roleFilter === role
                                    ? "bg-white/10 text-white shadow-sm"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {role === "all" ? "All" : role === "verified_reviewer" ? "Verified" : "Admins"}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : users.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <UsersIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No users found</p>
                </div>
            ) : (
                <UsersTable
                    users={users}
                    onUpdateRole={updateUserRole}
                    onDelete={deleteUser}
                />
            )}
        </div>
    );
}
