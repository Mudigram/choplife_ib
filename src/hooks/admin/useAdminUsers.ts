import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { UserRole } from "@/lib/auth/roles";

export type UserProfile = {
    id: string;
    username: string;
    email: string; // Note: email might not be in public 'users' table depending on schema, but usually is for admins
    avatar_url: string | null;
    role: UserRole;
    created_at: string;
};

type UseAdminUsersParams = {
    search?: string;
    roleFilter?: UserRole | "all";
    limit?: number;
};

export function useAdminUsers({ search = "", roleFilter = "all", limit = 50 }: UseAdminUsersParams = {}) {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter]);

    async function fetchUsers() {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from("users")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(limit);

            if (roleFilter !== "all") {
                query = query.eq("role", roleFilter);
            }

            if (search.trim()) {
                // Search by username or email
                query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%`);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            setUsers(data || []);
        } catch (err: any) {
            console.error("Error fetching users:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function updateUserRole(userId: string, newRole: UserRole) {
        try {
            const { error: updateError } = await supabase
                .from("users")
                .update({ role: newRole })
                .eq("id", userId);

            if (updateError) throw updateError;

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );

            return { success: true };
        } catch (err: any) {
            console.error("Error updating user role:", err);
            return { success: false, error: err.message };
        }
    }

    async function deleteUser(userId: string) {
        try {
            // Note: This only deletes from the public 'users' table.
            // To delete from Supabase Auth (auth.users), you need a server-side admin client.
            // For now, we'll just delete the profile which effectively removes them from the app's view.
            const { error: deleteError } = await supabase
                .from("users")
                .delete()
                .eq("id", userId);

            if (deleteError) throw deleteError;

            setUsers((prev) => prev.filter((user) => user.id !== userId));
            return { success: true };
        } catch (err: any) {
            console.error("Error deleting user:", err);
            return { success: false, error: err.message };
        }
    }

    return {
        users,
        loading,
        error,
        fetchUsers,
        updateUserRole,
        deleteUser,
    };
}
