"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setUser, setRole, setError, setLoading } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

// Helper function to translate Supabase errors to user-friendly messages
function getFriendlyErrorMessage(error: string): string {
    if (error.includes("Password should be at least")) {
        return "Password must be at least 6 characters long.";
    }
    if (error.includes("User already registered")) {
        return "An account with this email already exists. Please sign in instead.";
    }
    if (error.includes("Invalid email")) {
        return "Please enter a valid email address.";
    }
    if (error.includes("Password should contain")) {
        return "Password must contain at least one uppercase letter, one character, one lowercase letter, and one number.";
    }
    if (error.includes("Signup requires a valid password")) {
        return "Please enter a valid password (at least 6 characters).";
    }
    if (error.includes("Unable to validate email address")) {
        return "Please enter a valid email address.";
    }
    return error; // Return original if no match
}

export default function SignupPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [usernameFocused, setUsernameFocused] = useState(false);

    const [success, setSuccess] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                    username: username,
                }
            }
        });

        if (error) {
            const friendlyMessage = getFriendlyErrorMessage(error.message);
            dispatch(setError(friendlyMessage));
            toast.error(friendlyMessage);
            dispatch(setLoading(false));
            return;
        }

        if (data.user) {
            dispatch(setLoading(false));
            setSuccess(true);
            toast.success("Account created! Please check your email to verify.");
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center px-4 py-8">
                <div className="relative w-full max-w-md">
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <Sparkles className="w-8 h-8 text-chop-accent-cta animate-pulse" />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-chop-accent-cta via-chop-accent-point to-chop-accent-cta bg-clip-text text-transparent">
                                ChopLife
                            </h1>
                        </div>
                    </div>

                    <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)] text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Mail className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-chop-text-light mb-2">Check Your Email!</h2>
                        <p className="text-chop-text-subtle text-sm mb-4">
                            We've sent a verification link to <br />
                            <span className="text-chop-accent-cta font-medium">{email}</span>
                        </p>

                        <div className="bg-chop-accent-cta/10 border border-chop-accent-cta/30 rounded-xl p-4 mb-6">
                            <p className="text-chop-text-light text-sm font-medium mb-2">📧 Important: Verify Your Email</p>
                            <p className="text-chop-text-subtle/80 text-xs">
                                Click the verification link in your email to activate your account.
                                Check your spam folder if you don't see it within a few minutes.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 text-chop-accent-cta font-semibold hover:text-chop-accent-point transition-colors"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

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
                    <p className="text-chop-text-subtle text-sm">Your journey starts here</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)]">
                    <h2 className="text-2xl font-bold text-chop-text-light mb-2">Create Account</h2>
                    <p className="text-chop-text-subtle text-sm mb-6">Join the ChopLife community</p>

                    <form onSubmit={handleSignup} className="space-y-5">
                        {/* Username Input */}
                        <div className="relative">
                            <label
                                className={`absolute left-12 transition-all duration-200 pointer-events-none ${usernameFocused || username
                                    ? "-top-2 text-xs text-chop-accent-cta bg-chop-bg-dark px-2"
                                    : "top-4 text-chop-text-subtle"
                                    }`}
                            >
                                Username
                            </label>
                            <User className="absolute left-4 top-4 w-5 h-5 text-chop-text-subtle" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                className="w-full h-14 pl-12 pr-4 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-chop-text-light placeholder-transparent focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none"
                                required
                            />
                        </div>

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
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4 text-chop-text-subtle hover:text-chop-accent-cta transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Hint */}
                        <div className="text-xs space-y-1 -mt-2">
                            <div className={`flex items-center gap-1 transition-colors ${password.length >= 6 ? "text-green-400" : "text-chop-text-subtle"
                                }`}>
                                {password.length >= 6 ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                <span>At least 6 characters</span>
                            </div>
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
                                    Creating Account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                        <span className="text-chop-text-subtle text-xs">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-chop-text-subtle text-sm">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-chop-accent-cta font-semibold hover:text-chop-accent-point transition-colors"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Footer Text */}
                <p className="text-center text-chop-text-subtle/60 text-xs mt-6">
                    By creating an account, you agree to ChopLife's Terms & Privacy Policy
                </p>
            </div>
        </div>
    );
}
