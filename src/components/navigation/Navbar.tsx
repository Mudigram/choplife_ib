"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Compass, User, Star, Search, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


export default function Navbar() {
    const pathname = usePathname();


    const [activePath, setActivePath] = useState("/home");
    // ✅ Check if user is logged in from Redux
    const user = useSelector((state: RootState) => state.auth.user);

    const navItems = [
        { name: "Home", icon: Home, href: "/home", protected: false },
        { name: "Search", icon: Search, href: "/feed", protected: false },
        { name: "Explore", icon: Compass, href: "/events", protected: true },
        { name: "Favorites", icon: Star, href: "/favorites", protected: true },
        { name: "Profile", icon: User, href: "/profile", protected: true },
    ];

    // Filter based on auth
    const visibleNavItems = navItems.filter((item) => !item.protected || user);

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 px-2 flex justify-center">
            <div
                className=" 
       bg-chop-bg-card/10 text-chop-text-light flex justify-around items-center h-18 w-full 
                backdrop-blur-sm backdrop-saturate-200 rounded-full border border-chop-text-subtle/30 
                md:w-[500px] md:rounded-3xl 
                shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300
      "
            >
                {visibleNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group relative flex flex-col items-center py-2 w-full 
                transition-all duration-200 
                 ${isActive ? "text-chop-accent-cta" : "text-chop-text-subtle hover:text-chop-text-light"}
              `}
                        >
                            <span className="absolute inset-0 rounded-full scale-0 group-active:scale-100 bg-gray-400/20 transition-transform duration-300" />

                            <div
                                className={`relative flex items-center justify-center rounded-full p-2 transition-all duration-300
                                    ${isActive
                                        ? "bg-chop-bg-dark/50 scale-100 shadow-[0_0_15px_rgba(255,193,7,0.7)]"
                                        : "bg-transparent group-hover:bg-chop-bg-dark/30"
                                    }
                                `}
                            >
                                <Icon className="w-6 h-6" />
                            </div>

                            <span className="text-[10px] font-medium mt-0.5">{item.name}</span>
                        </Link>
                    );
                })}

                {/* ✅ If not logged in, show Login */}
                {!user && (
                    <Link
                        href="/login"
                        className="flex flex-col items-center py-2 w-full text-chop-text-subtle hover:text-chop-text-light transition-all"
                    >
                        <div className="flex items-center justify-center rounded-full p-2">
                            <LogIn className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-medium mt-0.5">Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
