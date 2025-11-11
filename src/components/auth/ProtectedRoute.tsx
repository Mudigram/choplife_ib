"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navigation/Navbar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="pb-20">{children}</main>
            <Navbar />
        </div>
    );
}
