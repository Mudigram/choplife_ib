import { supabase } from "../supabase/supabaseClient";

export type UserRole = "admin" | "verified_reviewer" | "user";

/**
 * Get the role of a user by their ID
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("role")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching user role:", error);
            return null;
        }

        return (data?.role as UserRole) || "user";
    } catch (error) {
        console.error("Error in getUserRole:", error);
        return null;
    }
}

/**
 * Check if a user is an admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
    const role = await getUserRole(userId);
    return role === "admin";
}

/**
 * Check if a user is a verified reviewer (can submit reviews)
 */
export async function isVerifiedReviewer(userId: string): Promise<boolean> {
    const role = await getUserRole(userId);
    return role === "verified_reviewer" || role === "admin";
}

/**
 * Check if a user has a specific permission
 */
export async function hasPermission(
    userId: string,
    permission: "admin" | "review" | "moderate"
): Promise<boolean> {
    const role = await getUserRole(userId);

    if (!role) return false;

    switch (permission) {
        case "admin":
            return role === "admin";
        case "review":
            return role === "verified_reviewer" || role === "admin";
        case "moderate":
            return role === "admin";
        default:
            return false;
    }
}

/**
 * Get user role from Redux state (client-side check)
 * Note: Always verify on server-side for security
 */
export function getRoleFromUser(user: any): UserRole {
    return user?.user_metadata?.role || user?.role || "user";
}

/**
 * Check if role allows review submission
 */
export function canSubmitReviews(role: UserRole): boolean {
    return role === "verified_reviewer" || role === "admin";
}

/**
 * Check if role allows admin access
 */
export function canAccessAdmin(role: UserRole): boolean {
    return role === "admin";
}
