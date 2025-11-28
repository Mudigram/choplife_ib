import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Heart, Users, Sparkles, Calendar } from "lucide-react";

export default function AboutPage() {
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
                    <h1 className="text-xl font-bold">About ChopLife IB</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-6 py-12 space-y-12">
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-chop-accent-cta to-chop-accent-point rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-chop-accent-cta/30">
                        <MapPin className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point bg-clip-text text-transparent">
                            ChopLife IB
                        </h2>
                        <p className="text-xl text-chop-text-subtle">
                            Your Ultimate Guide to Ibadan's Best Experiences
                        </p>
                    </div>
                </div>

                {/* Mission Statement */}
                <section className="space-y-4">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="text-chop-text-subtle leading-relaxed">
                        ChopLife IB is dedicated to helping you discover and experience the best that Ibadan
                        has to offer. From hidden culinary gems to vibrant nightlife, cultural events to
                        peaceful hangout spots, we're your trusted companion in exploring Nigeria's ancient
                        city.
                    </p>
                    <p className="text-chop-text-subtle leading-relaxed">
                        We believe that every neighborhood has its own unique flavor, and every event tells a
                        story. Our platform connects locals and visitors with authentic experiences, powered by
                        a community that truly knows and loves Ibadan.
                    </p>
                </section>

                {/* What We Offer */}
                <section className="space-y-6">
                    <h3 className="text-2xl font-bold">What We Offer</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FeatureCard
                            icon={MapPin}
                            title="Discover Places"
                            description="Find the best restaurants, cafes, bars, and hangout spots across Ibadan"
                        />
                        <FeatureCard
                            icon={Calendar}
                            title="Upcoming Events"
                            description="Stay updated with concerts, parties, festivals, and cultural happenings"
                        />
                        <FeatureCard
                            icon={Heart}
                            title="Save Favorites"
                            description="Create your personal collection of must-visit places and events"
                        />
                        <FeatureCard
                            icon={Users}
                            title="Community Reviews"
                            description="Read authentic reviews from locals who know the city best"
                        />
                        <FeatureCard
                            icon={Sparkles}
                            title="Personalized Recommendations"
                            description="Get suggestions tailored to your preferences and location"
                        />
                        <FeatureCard
                            icon={MapPin}
                            title="Interactive Maps"
                            description="Explore Ibadan visually and find places near you"
                        />
                    </div>
                </section>

                {/* Our Story */}
                <section className="space-y-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold">Our Story</h3>
                    <p className="text-chop-text-subtle leading-relaxed">
                        ChopLife IB was born from a simple idea: make it easier for people to discover the
                        amazing experiences Ibadan has to offer. As locals who have explored every corner of
                        this beautiful city, we noticed that many hidden gems remained unknown to both
                        residents and visitors.
                    </p>
                    <p className="text-chop-text-subtle leading-relaxed">
                        We created this platform to bridge that gap, bringing together a community of explorers,
                        food lovers, event enthusiasts, and culture seekers. Today, ChopLife IB is the go-to
                        resource for anyone looking to experience the authentic spirit of Ibadan.
                    </p>
                </section>

                {/* Values */}
                <section className="space-y-4">
                    <h3 className="text-2xl font-bold">Our Values</h3>
                    <div className="space-y-3">
                        <ValueItem
                            title="Authenticity"
                            description="We prioritize genuine experiences and honest reviews from real people"
                        />
                        <ValueItem
                            title="Community"
                            description="We're built by locals, for locals, celebrating what makes Ibadan unique"
                        />
                        <ValueItem
                            title="Discovery"
                            description="We encourage exploration and help you find experiences beyond the obvious"
                        />
                        <ValueItem
                            title="Inclusivity"
                            description="Everyone is welcome to explore, share, and contribute to our community"
                        />
                    </div>
                </section>

                {/* Contact Section */}
                <section className="space-y-4 text-center p-8 bg-gradient-to-br from-chop-accent-cta/10 to-chop-accent-point/10 rounded-2xl border border-chop-accent-cta/20">
                    <h3 className="text-2xl font-bold">Get in Touch</h3>
                    <p className="text-chop-text-subtle">
                        Have questions, suggestions, or just want to say hello?
                    </p>
                    <div className="flex flex-col items-center gap-3 pt-4">
                        <a
                            href="mailto:hello@choplifeib.com"
                            className="flex items-center gap-2 text-chop-accent-cta hover:text-chop-accent-point transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            <span>hello@choplifeib.com</span>
                        </a>
                        <p className="text-sm text-chop-text-subtle">Ibadan, Oyo State, Nigeria</p>
                    </div>
                </section>

                {/* Social Links (Placeholder) */}
                <section className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">Follow Us</h3>
                    <div className="flex justify-center gap-4">
                        <SocialLink href="#" label="Twitter" />
                        <SocialLink href="#" label="Instagram" />
                        <SocialLink href="#" label="Facebook" />
                    </div>
                </section>

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

function FeatureCard({
    icon: Icon,
    title,
    description,
}: {
    icon: any;
    title: string;
    description: string;
}) {
    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-chop-accent-cta/20 to-chop-accent-point/20 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-chop-accent-cta" />
                </div>
                <div>
                    <h4 className="font-semibold text-chop-text-light mb-1">{title}</h4>
                    <p className="text-sm text-chop-text-subtle">{description}</p>
                </div>
            </div>
        </div>
    );
}

function ValueItem({ title, description }: { title: string; description: string }) {
    return (
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <h4 className="font-semibold text-chop-text-light mb-1">{title}</h4>
            <p className="text-sm text-chop-text-subtle">{description}</p>
        </div>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors text-sm"
        >
            {label}
        </a>
    );
}
