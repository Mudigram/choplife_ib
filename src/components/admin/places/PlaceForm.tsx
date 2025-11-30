"use client";

import { useState } from "react";
import { Place } from "@/types/place";
import ImageUpload from "./ImageUpload";
import { X } from "lucide-react";

type PlaceFormProps = {
    initialData?: Partial<Place>;
    onSubmit: (data: Partial<Place>, imageFile?: File) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
};

export default function PlaceForm({ initialData, onSubmit, onCancel, loading }: PlaceFormProps) {
    const [formData, setFormData] = useState<Partial<Place>>(initialData || {});
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [activeTab, setActiveTab] = useState<"general" | "location" | "details" | "contact">("general");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData, imageFile);
    };

    const handleChange = (field: keyof Place, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNestedChange = (parent: "contact_info" | "social_handles", field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [parent]: {
                ...(prev[parent] as any || {}),
                [field]: value
            }
        }));
    };

    const tabs = [
        { id: "general", label: "General" },
        { id: "location", label: "Location" },
        { id: "details", label: "Details" },
        { id: "contact", label: "Contact" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
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
                                <label className="text-sm text-gray-400">Name *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name || ""}
                                    onChange={e => handleChange("name", e.target.value)}
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
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Cafe">Cafe</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Club">Club</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="Park">Park</option>
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
                            currentImage={formData.image_url}
                            onImageSelect={setImageFile}
                            label="Cover Image"
                        />
                    </div>
                )}

                {/* Location Tab */}
                {activeTab === "location" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Address</label>
                            <input
                                type="text"
                                value={formData.address || ""}
                                onChange={e => handleChange("address", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Area</label>
                            <input
                                type="text"
                                value={formData.area || ""}
                                onChange={e => handleChange("area", e.target.value)}
                                placeholder="e.g. Bodija, Ring Road"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.latitude || ""}
                                    onChange={e => handleChange("latitude", parseFloat(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={formData.longitude || ""}
                                    onChange={e => handleChange("longitude", parseFloat(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Tab */}
                {activeTab === "details" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Pricing Category</label>
                                <select
                                    value={formData.pricing_category || ""}
                                    onChange={e => handleChange("pricing_category", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                >
                                    <option value="">Select...</option>
                                    <option value="Budget">Budget (₦)</option>
                                    <option value="Moderate">Moderate (₦₦)</option>
                                    <option value="Expensive">Expensive (₦₦₦)</option>
                                    <option value="Luxury">Luxury (₦₦₦₦)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Cuisine Type</label>
                                <input
                                    type="text"
                                    value={formData.cuisine_type || ""}
                                    onChange={e => handleChange("cuisine_type", e.target.value)}
                                    placeholder="e.g. Nigerian, Continental"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Price Range (Text)</label>
                            <input
                                type="text"
                                value={formData.price_range || ""}
                                onChange={e => handleChange("price_range", e.target.value)}
                                placeholder="e.g. ₦2,000 - ₦5,000"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* Contact Tab */}
                {activeTab === "contact" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Phone</label>
                            <input
                                type="tel"
                                value={formData.contact_info?.phone || ""}
                                onChange={e => handleNestedChange("contact_info", "phone", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Website</label>
                            <input
                                type="url"
                                value={formData.contact_info?.website || ""}
                                onChange={e => handleNestedChange("contact_info", "website", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Instagram Handle</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2 text-gray-500">@</span>
                                <input
                                    type="text"
                                    value={formData.social_handles?.instagram || ""}
                                    onChange={e => handleNestedChange("social_handles", "instagram", e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                                />
                            </div>
                        </div>
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
                    {loading ? "Saving..." : "Save Place"}
                </button>
            </div>
        </form>
    );
}
