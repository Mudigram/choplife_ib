"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Navbar from "@/components/navigation/Navbar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        // Redirect to login if not logged in
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    // Don’t render until auth status is confirmed
    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-chop-bg-dark">
            <main className="pb-20">{children}</main>
            <Navbar />
        </div>
    );
}
