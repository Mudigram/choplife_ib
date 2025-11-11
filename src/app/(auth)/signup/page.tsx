"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser, setError, setLoading } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        const { data, error } = await supabase.auth.signUp({
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
            <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
            <form onSubmit={handleSignup} className="space-y-4">
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
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                    Login
                </a>
            </p>
        </div>
    );
}
