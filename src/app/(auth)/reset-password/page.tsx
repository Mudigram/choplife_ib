"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isValidSession, setIsValidSession] = useState(false);

    useEffect(() => {
        // Check if user has a valid recovery session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setIsValidSession(true);
            } else {
                toast.error("Invalid or expired reset link. Please request a new one.");
                setTimeout(() => router.push("/forgot-password"), 3000);
            }
        };
        checkSession();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            setError("Failed to reset password. Please try again.");
            toast.error("Failed to reset password.");
            console.error("Reset password error:", error);
        } else {
            toast.success("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }

        setLoading(false);
    };

    if (!isValidSession) {
        return (
            <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center px-4 py-8">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-chop-accent-cta/30 border-t-chop-accent-cta rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-chop-text-subtle">Verifying reset link...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center px-4 py-8">
            <div className="relative w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <Sparkles className="w-8 h-8 text-chop-accent-cta animate-pulse" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-chop-accent-cta via-chop-accent-point to-chop-accent-cta bg-clip-text text-transparent">
                            ChopLife
                        </h1>
                    </div>
                    <p className="text-chop-text-subtle text-sm">Create a new password</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)]">
                    <h2 className="text-2xl font-bold text-chop-text-light mb-2">Reset Password</h2>
                    <p className="text-chop-text-subtle text-sm mb-6">
                        Enter your new password below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password Input */}
                        <div className="relative">
                            <label
                                className={`absolute left-12 transition-all duration-200 pointer-events-none ${passwordFocused || password
                                        ? "-top-2 text-xs text-chop-accent-cta bg-chop-bg-dark px-2"
                                        : "top-4 text-chop-text-subtle"
                                    }`}
                            >
                                New Password
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

                        {/* Password Strength Indicator */}
                        <div className="text-xs space-y-1 -mt-2">
                            <div className={`flex items-center gap-1 transition-colors ${password.length >= 6 ? "text-green-400" : "text-chop-text-subtle"
                                }`}>
                                {password.length >= 6 ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                <span>At least 6 characters</span>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative">
                            <label
                                className={`absolute left-12 transition-all duration-200 pointer-events-none ${confirmPasswordFocused || confirmPassword
                                        ? "-top-2 text-xs text-chop-accent-cta bg-chop-bg-dark px-2"
                                        : "top-4 text-chop-text-subtle"
                                    }`}
                            >
                                Confirm Password
                            </label>
                            <Lock className="absolute left-4 top-4 w-5 h-5 text-chop-text-subtle" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setConfirmPasswordFocused(true)}
                                onBlur={() => setConfirmPasswordFocused(false)}
                                className="w-full h-14 pl-12 pr-12 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-chop-text-light placeholder-transparent focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-4 text-chop-text-subtle hover:text-chop-accent-cta transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Match Indicator */}
                        {confirmPassword && (
                            <div className="text-xs -mt-2">
                                <div className={`flex items-center gap-1 transition-colors ${password === confirmPassword ? "text-green-400" : "text-red-400"
                                    }`}>
                                    {password === confirmPassword ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                    <span>{password === confirmPassword ? "Passwords match" : "Passwords do not match"}</span>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-chop-accent-error/10 border border-chop-accent-error/30 rounded-xl p-3 text-chop-accent-error text-sm animate-shake">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || password !== confirmPassword || password.length < 6}
                            className="w-full h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold rounded-xl shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Resetting Password...
                                </span>
                            ) : (
                                "Reset Password"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                        <span className="text-chop-text-subtle text-xs">OR</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-chop-text-subtle/30 to-transparent"></div>
                    </div>

                    {/* Back to Login Link */}
                    <p className="text-center text-chop-text-subtle text-sm">
                        Remember your password?{" "}
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
                    Your password will be updated securely
                </p>
            </div>
        </div>
    );
}
