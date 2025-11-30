"use client";

import { useState } from "react";
import { IbadanEvent, EventCategory } from "@/types/events";
import { TicketTier } from "@/hooks/useEventTickets";
import ImageUpload from "@/components/admin/places/ImageUpload";
import TicketManager from "./TicketManager";
import GalleryUpload from "./GalleryUpload";
import { X } from "lucide-react";

type EventFormProps = {
    initialData?: Partial<IbadanEvent>;
    initialTickets?: Partial<TicketTier>[];
    onSubmit: (data: Partial<IbadanEvent>, tickets: Partial<TicketTier>[], imageFile?: File) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
};

export default function EventForm({ initialData, initialTickets = [], onSubmit, onCancel, loading }: EventFormProps) {
    const [formData, setFormData] = useState<Partial<IbadanEvent>>(initialData || {});
    const [tickets, setTickets] = useState<Partial<TicketTier>[]>(initialTickets);
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [activeTab, setActiveTab] = useState<"general" | "time_place" | "details" | "tickets" | "gallery">("general");
    const [highlightInput, setHighlightInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData, tickets, imageFile);
    };

    const handleChange = (field: keyof IbadanEvent, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddHighlight = () => {
        if (!highlightInput.trim()) return;
        setFormData(prev => ({
            ...prev,
            what_to_expect: [...(prev.what_to_expect || []), highlightInput.trim()]
        }));
        setHighlightInput("");
    };

    const removeHighlight = (index: number) => {
        setFormData(prev => ({
            ...prev,
            what_to_expect: prev.what_to_expect?.filter((_, i) => i !== index)
        }));
    };

    const tabs = [
        { id: "general", label: "General" },
        { id: "time_place", label: "Time & Place" },
        { id: "details", label: "Details" },
        { id: "tickets", label: "Tickets" },
        { id: "gallery", label: "Gallery" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-white/10 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? "border-chop-accent-cta text-chop-accent-cta"
                            : "border-transparent text-gray-400 hover:text-white"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {/* General Tab */}
                {activeTab === "general" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Event Title *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title || ""}
                                    onChange={e => handleChange("title", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Category</label>
                                <select
                                    value={formData.category || ""}
                                    onChange={e => handleChange("category", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                >
                                    <option value="">Select Category</option>
                                    {Object.values(EventCategory).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Description</label>
                            <textarea
                                rows={4}
                                value={formData.description || ""}
                                onChange={e => handleChange("description", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>

                        <ImageUpload
                            currentImage={formData.thumbnail}
                            onImageSelect={setImageFile}
                            label="Event Thumbnail"
                        />
                    </div>
                )}

                {/* Time & Place Tab */}
                {activeTab === "time_place" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Start Date & Time *</label>
                                <input
                                    required
                                    type="datetime-local"
                                    value={formData.start_date_time ? new Date(formData.start_date_time).toISOString().slice(0, 16) : ""}
                                    onChange={e => handleChange("start_date_time", new Date(e.target.value).toISOString())}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none [color-scheme:dark]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    value={formData.end_date_time ? new Date(formData.end_date_time).toISOString().slice(0, 16) : ""}
                                    onChange={e => handleChange("end_date_time", new Date(e.target.value).toISOString())}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none [color-scheme:dark]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Venue Name</label>
                            <input
                                type="text"
                                value={formData.venue || ""}
                                onChange={e => handleChange("venue", e.target.value)}
                                placeholder="e.g. Agodi Gardens"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Full Address</label>
                            <input
                                type="text"
                                value={formData.location || ""}
                                onChange={e => handleChange("location", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.lat || ""}
                                    onChange={e => handleChange("lat", parseFloat(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.lng || ""}
                                    onChange={e => handleChange("lng", parseFloat(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Base Price (Starting From)</label>
                            <input
                                type="number"
                                value={formData.price_ngn || 0}
                                onChange={e => handleChange("price_ngn", parseFloat(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Dress Code</label>
                            <input
                                type="text"
                                value={formData.dress_code || ""}
                                onChange={e => handleChange("dress_code", e.target.value)}
                                placeholder="e.g. Smart Casual"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">What to Expect (Highlights)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={highlightInput}
                                    onChange={e => setHighlightInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddHighlight())}
                                    placeholder="Add a highlight..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddHighlight}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.what_to_expect?.map((item, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-chop-accent-cta/20 text-chop-accent-cta rounded-full text-sm">
                                        {item}
                                        <button onClick={() => removeHighlight(i)} className="hover:text-white">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tickets Tab */}
                {activeTab === "tickets" && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">External Ticket Link (Optional)</label>
                            <input
                                type="url"
                                value={formData.ticket_link || ""}
                                onChange={e => handleChange("ticket_link", e.target.value)}
                                placeholder="https://tix.africa/..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                            <p className="text-xs text-gray-500">
                                If provided, a "Get Tickets" button will link to this URL.
                                You can still add internal ticket tiers below if you want to display pricing info.
                            </p>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <TicketManager
                                tickets={tickets}
                                onChange={setTickets}
                            />
                        </div>
                    </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                    <div className="animate-fade-in">
                        <GalleryUpload
                            images={formData.gallery_images || []}
                            onImagesChange={(imgs) => handleChange("gallery_images", imgs)}
                            eventTitle={formData.title || ""}
                        />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-chop-accent-cta text-black font-medium rounded-lg hover:bg-chop-accent-point transition-colors disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Event"}
                </button>
            </div>
        </form>
    );
}
