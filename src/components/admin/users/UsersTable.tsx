"use client";

import { UserProfile } from "@/hooks/admin/useAdminUsers";
import { UserRole } from "@/lib/auth/roles";
import RoleBadge from "./RoleBadge";
import { format } from "date-fns";
import { MoreVertical, Trash2, ShieldCheck, UserX, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type UsersTableProps = {
    users: UserProfile[];
    onUpdateRole: (userId: string, newRole: UserRole) => void;
    onDelete: (userId: string) => void;
};

export default function UsersTable({ users, onUpdateRole, onDelete }: UsersTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const toggleMenu = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    return (
        <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="py-4 px-4 font-medium">User</th>
                        <th className="py-4 px-4 font-medium">Role</th>
                        <th className="py-4 px-4 font-medium">Joined</th>
                        <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                        <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                                        {user.avatar_url ? (
                                            <Image
                                                src={user.avatar_url}
                                                alt={user.username}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-lg">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{user.username}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <RoleBadge role={user.role} />
                            </td>
                            <td className="py-4 px-4">
                                <span className="text-sm text-gray-400">
                                    {format(new Date(user.created_at), "MMM d, yyyy")}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-right relative">
                                <button
                                    onClick={() => toggleMenu(user.id)}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {/* Dropdown Menu */}
                                {openMenuId === user.id && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setOpenMenuId(null)}
                                        />
                                        <div className="absolute right-4 top-12 z-20 w-48 bg-chop-bg-card border border-white/10 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                            <div className="p-1 space-y-0.5">
                                                {user.role !== "verified_reviewer" && user.role !== "admin" && (
                                                    <button
                                                        onClick={() => {
                                                            onUpdateRole(user.id, "verified_reviewer");
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-chop-accent-cta hover:bg-white/5 rounded-lg transition-colors"
                                                    >
                                                        <ShieldCheck size={14} />
                                                        Verify User
                                                    </button>
                                                )}

                                                {user.role === "verified_reviewer" && (
                                                    <button
                                                        onClick={() => {
                                                            onUpdateRole(user.id, "user");
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors"
                                                    >
                                                        <UserX size={14} />
                                                        Remove Verification
                                                    </button>
                                                )}

                                                {user.role !== "admin" && (
                                                    <button
                                                        onClick={() => {
                                                            if (confirm("Make this user an Admin?")) {
                                                                onUpdateRole(user.id, "admin");
                                                                setOpenMenuId(null);
                                                            }
                                                        }}
                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-purple-400 hover:bg-white/5 rounded-lg transition-colors"
                                                    >
                                                        <Shield size={14} />
                                                        Make Admin
                                                    </button>
                                                )}

                                                <div className="h-px bg-white/10 my-1" />

                                                <button
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this user? This cannot be undone.")) {
                                                            onDelete(user.id);
                                                            setOpenMenuId(null);
                                                        }
                                                    }}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete User
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
