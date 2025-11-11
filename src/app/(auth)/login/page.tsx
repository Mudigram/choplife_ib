"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser, setError, setLoading } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { setTheme } = useTheme();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
            return;
        }

        if (data.user) {
            dispatch(setUser(data.user));
            dispatch(setLoading(false));
            router.push("/dashboard");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 bg-white rounded-xl p-6 shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded-lg"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 py-2 rounded-lg bg-chop-accent-cta text-chop-text-light shadow-neon-cta transition"
                >
                    {loading ? "Signing In..." : "Login"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <p className="text-center text-sm mt-4">
                Don’t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                    Sign up
                </a>
            </p>
            <div className="flex justify-center mt-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    );
}
