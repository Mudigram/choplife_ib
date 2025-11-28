"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Calendar, TrendingUp, Users, Sparkles } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  // Redirect logged-in users to home
  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  // Don't render landing page for logged-in users
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-chop-bg-dark via-chop-bg-dark to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-chop-accent-cta/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-chop-accent-point/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-chop-accent-cta to-chop-accent-point rounded-2xl flex items-center justify-center shadow-lg shadow-chop-accent-cta/30">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-chop-accent-cta via-chop-accent-point to-chop-accent-cta bg-clip-text text-transparent">
              ChopLife IB
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Discover Ibadan,{" "}
            <span className="bg-gradient-to-r from-chop-accent-cta to-chop-accent-point bg-clip-text text-transparent">
              One Vibe
            </span>{" "}
            at a Time
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-chop-text-subtle max-w-2xl mx-auto leading-relaxed"
          >
            Your ultimate guide to the best places, events, and experiences in Ibadan.
            Explore hidden gems, read reviews, and never miss out on what's happening.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              href="/home"
              className="group relative px-8 py-4 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-full font-semibold text-lg text-white shadow-lg shadow-chop-accent-cta/30 hover:shadow-chop-accent-cta/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10">Explore Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-chop-accent-point to-chop-accent-cta rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-white/5 border-2 border-white/20 rounded-full font-semibold text-lg text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto backdrop-blur-sm"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 pt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-chop-accent-cta">500+</div>
              <div className="text-sm text-chop-text-subtle">Places</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chop-accent-point">100+</div>
              <div className="text-sm text-chop-text-subtle">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-chop-accent-status">1000+</div>
              <div className="text-sm text-chop-text-subtle">Reviews</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-chop-accent-cta to-chop-accent-point bg-clip-text text-transparent">
              Explore Ibadan
            </span>
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-chop-accent-cta/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-chop-accent-cta/20 to-chop-accent-point/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-chop-accent-cta" />
                </div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-chop-text-subtle">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-chop-accent-cta/10 to-chop-accent-point/10 border border-chop-accent-cta/20 backdrop-blur-sm"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Exploring?
            </h3>
            <p className="text-xl text-chop-text-subtle mb-8">
              Join thousands discovering the best of Ibadan
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-full font-semibold text-lg text-white shadow-lg shadow-chop-accent-cta/30 hover:shadow-chop-accent-cta/50 transition-all duration-300 hover:scale-105"
            >
              Create Your Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-chop-accent-cta to-chop-accent-point rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">ChopLife IB</span>
            </div>
            <div className="flex gap-6 text-sm text-chop-text-subtle">
              <Link href="/about" className="hover:text-chop-accent-cta transition-colors">
                About
              </Link>
              <Link href="/terms" className="hover:text-chop-accent-cta transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-chop-accent-cta transition-colors">
                Privacy
              </Link>
            </div>
            <div className="text-sm text-chop-text-subtle">
              © 2025 ChopLife IB. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: MapPin,
    title: "Discover Places",
    description: "Find the best restaurants, cafes, bars, and hangout spots across Ibadan.",
  },
  {
    icon: Calendar,
    title: "Upcoming Events",
    description: "Never miss out on concerts, parties, festivals, and cultural events.",
  },
  {
    icon: Star,
    title: "Read Reviews",
    description: "Get authentic reviews from locals who know the city best.",
  },
  {
    icon: TrendingUp,
    title: "Trending Spots",
    description: "Stay updated with what's hot and happening right now.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of explorers sharing their favorite finds.",
  },
  {
    icon: Sparkles,
    title: "Personalized",
    description: "Get recommendations tailored to your preferences and location.",
  },
];
