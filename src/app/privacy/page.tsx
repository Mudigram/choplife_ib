import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-chop-bg-dark text-chop-text-light">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-chop-bg-dark/80 backdrop-blur-md border-b border-white/10 p-4">
                <div className="max-w-3xl mx-auto flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold">Privacy Policy</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-6 py-12 space-y-8">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-chop-accent-cta/20 to-chop-accent-point/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Shield className="w-8 h-8 text-chop-accent-cta" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Privacy Policy</h2>
                        <p className="text-chop-text-subtle">Last updated: January 25, 2025</p>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none space-y-6">
                    <Section title="1. Introduction">
                        <p>
                            ChopLife IB ("we", "our", or "us") is committed to protecting your privacy. This
                            Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you use our Service.
                        </p>
                        <p>
                            Please read this privacy policy carefully. If you do not agree with the terms of this
                            privacy policy, please do not access the Service.
                        </p>
                    </Section>

                    <Section title="2. Information We Collect">
                        <h4 className="text-lg font-semibold text-chop-text-light mt-4 mb-2">
                            Personal Information
                        </h4>
                        <p>We may collect personal information that you voluntarily provide to us when you:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Register for an account</li>
                            <li>Write reviews or post content</li>
                            <li>Save favorites or create collections</li>
                            <li>Contact us for support</li>
                        </ul>
                        <p className="mt-3">This information may include:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Email address</li>
                            <li>Username</li>
                            <li>Profile information</li>
                            <li>User-generated content (reviews, photos, comments)</li>
                        </ul>

                        <h4 className="text-lg font-semibold text-chop-text-light mt-4 mb-2">
                            Automatically Collected Information
                        </h4>
                        <p>When you access the Service, we may automatically collect:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Device information (browser type, operating system)</li>
                            <li>IP address</li>
                            <li>Location data (with your permission)</li>
                            <li>Usage data (pages visited, time spent, features used)</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Provide, operate, and maintain the Service</li>
                            <li>Personalize your experience and provide recommendations</li>
                            <li>Process your requests and transactions</li>
                            <li>Send you updates, notifications, and promotional materials</li>
                            <li>Improve and optimize the Service</li>
                            <li>Detect and prevent fraud and abuse</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </Section>

                    <Section title="4. How We Share Your Information">
                        <p>We may share your information in the following situations:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>
                                <strong>Public Content:</strong> Reviews, ratings, and other content you post are
                                publicly visible
                            </li>
                            <li>
                                <strong>Service Providers:</strong> With third-party vendors who help us operate
                                the Service
                            </li>
                            <li>
                                <strong>Legal Requirements:</strong> When required by law or to protect our rights
                            </li>
                            <li>
                                <strong>Business Transfers:</strong> In connection with a merger, sale, or
                                acquisition
                            </li>
                        </ul>
                        <p className="mt-3">
                            We do not sell your personal information to third parties for marketing purposes.
                        </p>
                    </Section>

                    <Section title="5. Your Privacy Rights">
                        <p>Depending on your location, you may have the following rights:</p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>
                                <strong>Access:</strong> Request a copy of the personal information we hold about
                                you
                            </li>
                            <li>
                                <strong>Correction:</strong> Request correction of inaccurate information
                            </li>
                            <li>
                                <strong>Deletion:</strong> Request deletion of your personal information
                            </li>
                            <li>
                                <strong>Opt-out:</strong> Opt-out of marketing communications
                            </li>
                            <li>
                                <strong>Data Portability:</strong> Request transfer of your data to another service
                            </li>
                        </ul>
                        <p className="mt-3">
                            To exercise these rights, please contact us at{" "}
                            <span className="text-chop-accent-cta">privacy@choplifeib.com</span>
                        </p>
                    </Section>

                    <Section title="6. Data Security">
                        <p>
                            We implement appropriate technical and organizational security measures to protect
                            your personal information. However, no method of transmission over the Internet or
                            electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="7. Data Retention">
                        <p>
                            We retain your personal information for as long as necessary to provide the Service
                            and fulfill the purposes outlined in this Privacy Policy, unless a longer retention
                            period is required by law.
                        </p>
                    </Section>

                    <Section title="8. Children's Privacy">
                        <p>
                            The Service is not intended for children under 13 years of age. We do not knowingly
                            collect personal information from children under 13. If you believe we have collected
                            information from a child under 13, please contact us immediately.
                        </p>
                    </Section>

                    <Section title="9. International Data Transfers">
                        <p>
                            Your information may be transferred to and processed in countries other than your
                            country of residence. We take steps to ensure that your data receives an adequate
                            level of protection in the jurisdictions in which we process it.
                        </p>
                    </Section>

                    <Section title="10. Changes to This Privacy Policy">
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any
                            changes by posting the new Privacy Policy on this page and updating the "Last
                            updated" date.
                        </p>
                    </Section>

                    <Section title="11. Contact Us">
                        <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
                        <div className="mt-3 p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-chop-accent-cta">Email: privacy@choplifeib.com</p>
                            <p className="text-chop-text-subtle mt-1">
                                Address: Ibadan, Oyo State, Nigeria
                            </p>
                        </div>
                    </Section>
                </div>

                {/* Back to Home */}
                <div className="pt-8 text-center">
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-3">
            <h3 className="text-xl font-semibold text-chop-text-light">{title}</h3>
            <div className="text-chop-text-subtle space-y-3">{children}</div>
        </section>
    );
}
