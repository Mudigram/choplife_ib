"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Bell,
    MapPin,
    Lock,
    Trash2,
    LogOut,
    ChevronRight,
    ChevronDown,
    Shield,
    Eye,
    EyeOff,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SettingsPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [expandedSection, setExpandedSection] = useState<string | null>("account");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);

    // Redirect if not logged in
    if (!user) {
        router.push("/login");
        return null;
    }

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out successfully");
        router.push("/");
    };

    const handleDeleteAccount = () => {
        // TODO: Implement actual account deletion
        console.log("Delete account requested");
        toast.success("Account deleted successfully");
        setShowDeleteModal(false);
        handleLogout();
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-chop-bg-dark pb-24">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-chop-bg-dark/80 backdrop-blur-md border-b border-white/10 p-4 pt-6">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-2xl font-bold text-chop-text-light">Settings</h1>
                </div>
            </div>

            <div className="max-w-lg mx-auto p-4 space-y-4 mt-4">
                {/* Account Section */}
                <SettingsSection
                    title="Account"
                    icon={User}
                    expanded={expandedSection === "account"}
                    onToggle={() => toggleSection("account")}
                >
                    <div className="space-y-4">
                        <SettingItem
                            icon={Mail}
                            label="Email"
                            value={user.email || "Not set"}
                            description="Your account email address"
                        />
                        <SettingItem
                            icon={User}
                            label="Username"
                            value={user.user_metadata?.username || user.email?.split("@")[0] || "User"}
                            description="Your display name"
                        />
                    </div>
                </SettingsSection>

                {/* Preferences Section */}
                <SettingsSection
                    title="Preferences"
                    icon={Bell}
                    expanded={expandedSection === "preferences"}
                    onToggle={() => toggleSection("preferences")}
                >
                    <div className="space-y-4">
                        <ToggleSetting
                            icon={Bell}
                            label="Notifications"
                            description="Receive updates about events and places"
                            enabled={notificationsEnabled}
                            onToggle={() => {
                                setNotificationsEnabled(!notificationsEnabled);
                                toast.success(`Notifications ${!notificationsEnabled ? "enabled" : "disabled"}`);
                            }}
                        />
                        <ToggleSetting
                            icon={MapPin}
                            label="Location Services"
                            description="Show nearby places and events"
                            enabled={locationEnabled}
                            onToggle={() => {
                                setLocationEnabled(!locationEnabled);
                                toast.success(`Location services ${!locationEnabled ? "enabled" : "disabled"}`);
                            }}
                        />
                    </div>
                </SettingsSection>

                {/* Privacy & Security Section */}
                <SettingsSection
                    title="Privacy & Security"
                    icon={Shield}
                    expanded={expandedSection === "privacy"}
                    onToggle={() => toggleSection("privacy")}
                >
                    <div className="space-y-4">
                        <Link
                            href="/privacy"
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-chop-accent-cta" />
                                <div>
                                    <div className="text-chop-text-light font-medium">Privacy Policy</div>
                                    <div className="text-sm text-chop-text-subtle">How we handle your data</div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-chop-text-subtle" />
                        </Link>
                        <Link
                            href="/terms"
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-chop-accent-cta" />
                                <div>
                                    <div className="text-chop-text-light font-medium">Terms of Service</div>
                                    <div className="text-sm text-chop-text-subtle">Our terms and conditions</div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-chop-text-subtle" />
                        </Link>
                    </div>
                </SettingsSection>

                {/* Actions Section */}
                <div className="space-y-3 pt-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                    >
                        <LogOut className="w-5 h-5 text-chop-accent-cta group-hover:text-chop-accent-point transition-colors" />
                        <span className="text-chop-text-light font-medium">Logout</span>
                    </button>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors group"
                    >
                        <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                        <span className="text-red-400 group-hover:text-red-300 font-medium transition-colors">
                            Delete Account
                        </span>
                    </button>
                </div>

                {/* About Section */}
                <div className="pt-8 text-center space-y-2">
                    <Link
                        href="/about"
                        className="text-sm text-chop-accent-cta hover:text-chop-accent-point transition-colors"
                    >
                        About ChopLife IB
                    </Link>
                    <p className="text-xs text-chop-text-subtle">Version 1.0.0</p>
                </div>
            </div>

            {/* Delete Account Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-chop-bg-card rounded-2xl p-6 max-w-md w-full border border-red-500/30"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                                    <Trash2 className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-chop-text-light">Delete Account</h3>
                            </div>
                            <p className="text-chop-text-subtle mb-6">
                                Are you sure you want to delete your account? This action cannot be undone. All your
                                data, reviews, and favorites will be permanently deleted.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-chop-text-light font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Settings Section Component
function SettingsSection({
    title,
    icon: Icon,
    expanded,
    onToggle,
    children,
}: {
    title: string;
    icon: any;
    expanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-chop-accent-cta" />
                    <span className="text-chop-text-light font-semibold">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-chop-text-subtle" />
                </motion.div>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-white/10">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Setting Item Component
function SettingItem({
    icon: Icon,
    label,
    value,
    description,
}: {
    icon: any;
    label: string;
    value: string;
    description?: string;
}) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
            <Icon className="w-5 h-5 text-chop-accent-cta mt-0.5" />
            <div className="flex-1">
                <div className="text-chop-text-light font-medium">{label}</div>
                {description && <div className="text-xs text-chop-text-subtle mt-0.5">{description}</div>}
                <div className="text-sm text-chop-text-subtle mt-1">{value}</div>
            </div>
        </div>
    );
}

// Toggle Setting Component
function ToggleSetting({
    icon: Icon,
    label,
    description,
    enabled,
    onToggle,
}: {
    icon: any;
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-start gap-3 flex-1">
                <Icon className="w-5 h-5 text-chop-accent-cta mt-0.5" />
                <div>
                    <div className="text-chop-text-light font-medium">{label}</div>
                    <div className="text-xs text-chop-text-subtle mt-0.5">{description}</div>
                </div>
            </div>
            <button
                onClick={onToggle}
                className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? "bg-chop-accent-cta" : "bg-white/20"
                    }`}
            >
                <motion.div
                    animate={{ x: enabled ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                />
            </button>
        </div>
    );
}
