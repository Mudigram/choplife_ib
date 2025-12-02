"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser, setRole, setError, setLoading } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getUserRole } from "@/lib/auth/roles";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Handle different error cases with user-friendly messages
            if (error.message.includes("Email not confirmed") || error.message.includes("email_not_confirmed")) {
                const friendlyMessage = "Please verify your email address first. Check your inbox for the verification link we sent you.";
                toast.error(friendlyMessage, { duration: 5000 });
                dispatch(setError(friendlyMessage));
            } else if (error.message.includes("Invalid login credentials")) {
                const friendlyMessage = "Invalid email or password. Please check your credentials and try again.";
                toast.error(friendlyMessage);
                dispatch(setError(friendlyMessage));
            } else if (error.message.includes("Email link is invalid or has expired")) {
                const friendlyMessage = "Your verification link has expired. Please sign up again.";
                toast.error(friendlyMessage);
                dispatch(setError(friendlyMessage));
            } else if (error.message.includes("User not found")) {
                const friendlyMessage = "No account found with this email. Please sign up first.";
                toast.error(friendlyMessage);
                dispatch(setError(friendlyMessage));
            } else {
                // Generic fallback for other errors
                const friendlyMessage = error.message.includes("network")
                    ? "Network error. Please check your connection and try again."
                    : "Unable to sign in. Please try again later.";
                dispatch(setError(friendlyMessage));
                toast.error(friendlyMessage);
            }
            dispatch(setLoading(false));
            return;
        }

        if (data.user) {
            dispatch(setUser(data.user));

            // Fetch and set user role
            const role = await getUserRole(data.user.id);
            if (role) {
                dispatch(setRole(role));
            }

            dispatch(setLoading(false));
            router.push("/home");
        }
    };

    return (
        <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center px-4 py-8">

            {/* Main Card */}
            <div className="relative w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <Sparkles className="w-8 h-8 text-chop-accent-cta animate-pulse" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-chop-accent-cta via-chop-accent-point to-chop-accent-cta bg-clip-text text-transparent">
                            ChopLife
                        </h1>
                    </div>
                    <p className="text-chop-text-subtle text-sm">Discover. Explore. Experience Ibadan.</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="relative bg-chop-bg-card/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)] ">
                    <h2 className="text-2xl font-bold text-chop-text-light mb-2">Welcome Back</h2>
                    <p className="text-chop-text-subtle text-sm mb-6">Sign in to continue your journey</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div className="relative">
                            <label
                                className={`absolute left-12 transition-all duration-200 pointer-events-none ${emailFocused || email
                                    ? "-top-2 text-xs text-chop-accent-cta bg-chop-bg-dark px-2"
                                    : "top-4 text-chop-text-subtle"
                                    }`}
                            >
                                Email Address
                            </label>
                            <Mail className="absolute left-4 top-4 w-5 h-5 text-chop-text-subtle" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className="w-full h-14 pl-12 pr-4 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-chop-text-light placeholder-transparent focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <label
                                className={`absolute left-12 transition-all duration-200 pointer-events-none ${passwordFocused || password
                                    ? "-top-2 text-xs text-chop-accent-cta bg-chop-bg-dark px-2"
                                    : "top-4 text-chop-text-subtle"
                                    }`}
                            >
                                Password
                            </label>
                            <Lock className="absolute left-4 top-4 w-5 h-5 text-chop-text-subtle" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className="w-full h-14 pl-12 pr-12 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-chop-text-light placeholder-transparent focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-chop-text-subtle hover:text-chop-accent-cta transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-chop-accent-error/10 border border-chop-accent-error/30 rounded-xl p-3 text-chop-accent-error text-sm animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold rounded-xl shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                        <span className="text-chop-text-subtle text-xs">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-chop-text-subtle text-sm">
                        Don't have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-chop-accent-cta font-semibold hover:text-chop-accent-point transition-colors"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-chop-text-subtle/60 text-xs mt-6">
                    By continuing, you agree to ChopLife's Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}
