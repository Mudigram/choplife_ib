"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminHeader from "@/components/admin/layout/AdminHeader";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, role } = useAppSelector((state) => state.auth);

    useEffect(() => {
        // Client-side check (middleware handles server-side)
        if (!user) {
            router.push("/login");
        } else if (role !== "admin") {
            router.push("/home");
        }
    }, [user, role, router]);

    // Show loading while checking auth
    if (!user || role !== "admin") {
        return (
            <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center">
                <div className="text-chop-text-light">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-chop-bg-dark">
            {/* Admin Header */}
            <AdminHeader />

            <div className="flex">
                {/* Admin Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <main className="flex-1 ml-64 mt-16 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
