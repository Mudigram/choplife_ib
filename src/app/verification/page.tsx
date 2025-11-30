"use client";

import Link from "next/link";
import { CheckCircle, Shield, Users, Star, ArrowRight, Lock } from "lucide-react";

export default function VerificationPage() {
    return (
        <div className="min-h-screen bg-chop-bg-dark text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-20 px-4">
                {/* Background Elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-chop-accent-cta/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chop-accent-point/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                        <Shield className="w-4 h-4 text-chop-accent-cta" />
                        <span className="text-sm font-medium">Review Transparency</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight">
                        Honest Reviews,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-chop-accent-cta to-chop-accent-point">
                            Real Experiences.
                        </span>{" "}
                        Always.
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We believe in trust. Every recommendation on Choplife is carefully verified so you can explore the city with confidence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <button
                            disabled
                            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold text-lg shadow-lg opacity-60 cursor-not-allowed"
                        >
                            <span className="opacity-50">Become a Verified Reviewer</span>
                            <span className="absolute -top-2 -right-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
                                Coming Soon
                            </span>
                        </button>

                        <a
                            href="#how-it-works"
                            className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                        >
                            Learn How It Works
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Transparency Matters */}
            <section className="py-20 px-4 bg-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        Why We Keep It Real
                    </h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        Choplife was built to help you enjoy the best of Ibadan—from restaurants to events—without guessing. To keep things authentic, we currently use a verified review system. Every review comes from someone whose experience we can confirm. No paid posts. No fake hype. No inflated ratings.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <CheckCircle className="w-12 h-12 text-chop-accent-cta mb-4" />
                            <h3 className="text-xl font-bold mb-2">Genuine Experiences Only</h3>
                            <p className="text-gray-400">Every review is from a real visit, verified by our team.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <Lock className="w-12 h-12 text-chop-accent-point mb-4" />
                            <h3 className="text-xl font-bold mb-2">No Paid-For Reviews</h3>
                            <p className="text-gray-400">We never accept payment for positive reviews or ratings.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <Star className="w-12 h-12 text-yellow-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Early Curated System</h3>
                            <p className="text-gray-400">Carefully selected reviewers ensure accuracy and quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        How Our Verified Review System Works
                    </h2>

                    <div className="space-y-8">
                        {[
                            {
                                step: "01",
                                title: "Submission",
                                description: "Reviewers share their experience with proof (receipts, photos, timestamps).",
                            },
                            {
                                step: "02",
                                title: "Verification",
                                description: "Our team checks details to ensure the review is real and unbiased.",
                            },
                            {
                                step: "03",
                                title: "Approval",
                                description: "Only verified experiences go live on Choplife.",
                            },
                            {
                                step: "04",
                                title: "Community Impact",
                                description: "Your insight helps others discover amazing places and avoid disappointing ones.",
                            },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-6 items-start">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-chop-accent-cta to-chop-accent-point flex items-center justify-center text-2xl font-black">
                                    {item.step}
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-lg">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community */}
            <section className="py-20 px-4 bg-white/5">
                <div className="max-w-3xl mx-auto text-center">
                    <Users className="w-16 h-16 text-chop-accent-cta mx-auto mb-6" />

                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Want to Share Your Experiences?
                    </h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        We're expanding our trusted reviewer circle. If you enjoy discovering restaurants, cafés, lounges, events, or nightlife in Ibadan, we'd love to hear from you. Tell us a bit about yourself and we'll reach out when you're a good fit for our verified reviewer program.
                    </p>

                    <button
                        disabled
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold text-lg shadow-lg opacity-60 cursor-not-allowed mb-4"
                    >
                        <span className="opacity-50">Apply to Become a Verified Reviewer</span>
                        <span className="absolute -top-2 -right-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
                            Coming Soon
                        </span>
                    </button>

                    <p className="text-sm text-gray-500">
                        We review every application carefully. Selected reviewers will get early access to features and events.
                    </p>
                </div>
            </section>

            {/* Guidelines */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                        Simple Guidelines
                    </h2>

                    <div className="space-y-4">
                        {[
                            "Be honest about your experience",
                            "Share both the good and the bad",
                            "Include photos when possible",
                            "Keep your tone respectful",
                            "No sponsored or paid partnerships",
                        ].map((guideline, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                <CheckCircle className="w-6 h-6 text-chop-accent-cta flex-shrink-0" />
                                <span className="text-lg">{guideline}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 bg-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: "Can anyone apply to be a reviewer?",
                                a: "Yes. We assess every submission.",
                            },
                            {
                                q: "Are reviewers paid?",
                                a: "No. But verified reviewers get priority access, features, and recognition inside the app.",
                            },
                            {
                                q: "Can I submit reviews before being verified?",
                                a: "Not yet. Public reviews will open soon.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                <h3 className="text-xl font-bold mb-3 text-chop-accent-cta">{faq.q}</h3>
                                <p className="text-gray-300">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Let's Build a More Honest City Guide Together
                    </h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        Choplife is more than a travel guide — it's a community powered by real people and real stories. Your voice can help shape what thousands of explorers discover next.
                    </p>

                    <button
                        disabled
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold text-lg shadow-lg opacity-60 cursor-not-allowed"
                    >
                        <span className="opacity-50">Become a Verified Reviewer</span>
                        <span className="absolute -top-2 -right-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
                            Coming Soon
                        </span>
                    </button>

                    <div className="mt-12 pt-12 border-t border-white/10">
                        <Link
                            href="/home"
                            className="text-chop-accent-cta hover:text-chop-accent-point transition-colors inline-flex items-center gap-2"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
