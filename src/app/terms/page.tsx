import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TermsPage() {
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
                    <h1 className="text-xl font-bold">Terms of Service</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-6 py-12 space-y-8">
                {/* Icon and Title */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-chop-accent-cta/20 to-chop-accent-point/20 rounded-2xl flex items-center justify-center mx-auto">
                        <Scale className="w-8 h-8 text-chop-accent-cta" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Terms of Service</h2>
                        <p className="text-chop-text-subtle">Last updated: January 25, 2025</p>
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none space-y-6">
                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing and using ChopLife IB ("the Service"), you accept and agree to be bound
                            by the terms and provision of this agreement. If you do not agree to these Terms of
                            Service, please do not use the Service.
                        </p>
                    </Section>

                    <Section title="2. Description of Service">
                        <p>
                            ChopLife IB is a platform that helps users discover places, events, and experiences
                            in Ibadan, Nigeria. The Service includes but is not limited to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Browsing and searching for places and events</li>
                            <li>Reading and writing reviews</li>
                            <li>Saving favorites and creating collections</li>
                            <li>Viewing location-based recommendations</li>
                            <li>Accessing event information and details</li>
                        </ul>
                    </Section>

                    <Section title="3. User Accounts">
                        <p>
                            To access certain features of the Service, you may be required to create an account.
                            You agree to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Provide accurate and complete information</li>
                            <li>Maintain the security of your account credentials</li>
                            <li>Notify us immediately of any unauthorized use</li>
                            <li>Be responsible for all activities under your account</li>
                        </ul>
                    </Section>

                    <Section title="4. User Content and Conduct">
                        <p>
                            You are responsible for any content you post on the Service, including reviews,
                            comments, and photos. You agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>Post false, misleading, or defamatory content</li>
                            <li>Violate any laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Post spam or unauthorized commercial content</li>
                            <li>Attempt to manipulate ratings or reviews</li>
                        </ul>
                    </Section>

                    <Section title="5. Intellectual Property">
                        <p>
                            The Service and its original content, features, and functionality are owned by
                            ChopLife IB and are protected by international copyright, trademark, and other
                            intellectual property laws.
                        </p>
                        <p>
                            By posting content on the Service, you grant us a non-exclusive, worldwide,
                            royalty-free license to use, display, and distribute your content in connection with
                            the Service.
                        </p>
                    </Section>

                    <Section title="6. Disclaimer of Warranties">
                        <p>
                            The Service is provided "as is" and "as available" without warranties of any kind,
                            either express or implied. We do not guarantee that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-chop-text-subtle">
                            <li>The Service will be uninterrupted or error-free</li>
                            <li>All information on the Service is accurate or complete</li>
                            <li>Any defects will be corrected</li>
                            <li>The Service is free from viruses or harmful components</li>
                        </ul>
                    </Section>

                    <Section title="7. Limitation of Liability">
                        <p>
                            ChopLife IB shall not be liable for any indirect, incidental, special, consequential,
                            or punitive damages resulting from your use of or inability to use the Service.
                        </p>
                    </Section>

                    <Section title="8. Modifications to Service">
                        <p>
                            We reserve the right to modify or discontinue the Service at any time, with or
                            without notice. We shall not be liable to you or any third party for any
                            modification, suspension, or discontinuance of the Service.
                        </p>
                    </Section>

                    <Section title="9. Changes to Terms">
                        <p>
                            We may update these Terms of Service from time to time. We will notify you of any
                            changes by posting the new Terms on this page and updating the "Last updated" date.
                        </p>
                    </Section>

                    <Section title="10. Contact Information">
                        <p>
                            If you have any questions about these Terms, please contact us at:
                        </p>
                        <p className="text-chop-accent-cta">support@choplifeib.com</p>
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
