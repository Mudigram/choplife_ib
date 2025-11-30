"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useAppDispatch } from "@/redux/store";
import { setUser, setLoading, setError } from "@/redux/slices/authSlice";
import { Sparkles, Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

function VerifyContent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push("/signup");
        }
    }, [email, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0 && !canResend) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(timer);
    }, [countdown, canResend]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        dispatch(setLoading(true));

        try {
            const { data, error } = await supabase.auth.verifyOtp({
                email,
                token: otp,
                type: "signup",
            });

            if (error) throw error;

            if (data.user) {
                dispatch(setUser(data.user));
                toast.success("Email verified successfully!");
                router.push("/home");
            }
        } catch (error: any) {
            console.error("Verification error:", error);
            toast.error(error.message || "Invalid code. Please try again.");
            dispatch(setError(error.message));
        } finally {
            setIsSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    const handleResend = async () => {
        if (!canResend || !email) return;

        try {
            const { error } = await supabase.auth.resend({
                type: "signup",
                email,
            });

            if (error) throw error;

            toast.success("Verification code resent!");
            setCountdown(60);
            setCanResend(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to resend code");
        }
    };

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
                    <p className="text-chop-text-subtle text-sm">Verify your email to continue</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="relative bg-chop-bg-card/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.1)]">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-chop-accent-cta/10 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-8 h-8 text-chop-accent-cta" />
                        </div>
                        <h2 className="text-2xl font-bold text-chop-text-light">Check your inbox</h2>
                        <p className="text-chop-text-subtle text-sm text-center mt-2">
                            We sent a verification code to <br />
                            <span className="text-chop-text-light font-medium">{email}</span>
                        </p>
                    </div>

                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-chop-text-subtle mb-2 text-center">
                                Enter 6-digit code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                className="w-full h-14 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-center text-2xl tracking-[0.5em] font-bold text-chop-text-light focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none"
                                placeholder="000000"
                                required
                                maxLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || otp.length !== 6}
                            className="w-full h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold rounded-xl shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify Email <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-chop-text-subtle mb-2">Didn't receive the code?</p>
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-chop-accent-cta font-semibold hover:text-chop-accent-point transition-colors"
                            >
                                Resend Code
                            </button>
                        ) : (
                            <p className="text-xs text-chop-text-subtle/60">
                                Resend in {countdown}s
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-chop-bg-dark flex items-center justify-center"><Loader2 className="w-8 h-8 text-chop-accent-cta animate-spin" /></div>}>
            <VerifyContent />
        </Suspense>
    );
}
