"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import Link from "next/link";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            toast.error("Failed to send reset email. Please try again.");
            console.error("Reset password error:", error);
        } else {
            setEmailSent(true);
            toast.success("Password reset email sent! Check your inbox.");
        }

        setLoading(false);
    };

    if (emailSent) {
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
                    </div>

                    {/* Success Card */}
                    <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)] text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Mail className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-chop-text-light mb-2">Check Your Email!</h2>
                        <p className="text-chop-text-subtle text-sm mb-4">
                            We've sent a password reset link to <br />
                            <span className="text-chop-accent-cta font-medium">{email}</span>
                        </p>

                        <div className="bg-chop-accent-cta/10 border border-chop-accent-cta/30 rounded-xl p-4 mb-6">
                            <p className="text-chop-text-light text-sm font-medium mb-2">📧 Next Steps</p>
                            <p className="text-chop-text-subtle/80 text-xs">
                                Click the link in your email to reset your password.
                                The link will expire in 1 hour. Check your spam folder if you don't see it.
                            </p>
                        </div>

                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 text-chop-accent-cta font-semibold hover:text-chop-accent-point transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </div>
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
                    <p className="text-chop-text-subtle text-sm">Reset your password</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)]">
                    <h2 className="text-2xl font-bold text-chop-text-light mb-2">Forgot Password?</h2>
                    <p className="text-chop-text-subtle text-sm mb-6">
                        No worries! Enter your email and we'll send you a reset link.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold rounded-xl shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Link"
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
                    Need help? Contact support@choplife.com
                </p>
            </div>
        </div>
    );
}
