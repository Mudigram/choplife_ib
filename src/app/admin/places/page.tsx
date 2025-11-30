"use client";

import { useState } from "react";
import { useAdminPlaces } from "@/hooks/admin/useAdminPlaces";
import PlacesTable from "@/components/admin/places/PlacesTable";
import PlaceForm from "@/components/admin/places/PlaceForm";
import { Search, Plus, Upload, X } from "lucide-react";
import { Place } from "@/types/place";

export default function PlacesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlace, setEditingPlace] = useState<Place | undefined>();

    const { places, loading, createPlace, updatePlace, deletePlace, fetchPlaces } = useAdminPlaces({
        search: searchQuery,
        category: categoryFilter,
    });

    const handleAdd = () => {
        setEditingPlace(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (place: Place) => {
        setEditingPlace(place);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this place?")) {
            await deletePlace(id);
        }
    };

    const handleSubmit = async (data: Partial<Place>, imageFile?: File) => {
        let result;
        if (editingPlace) {
            result = await updatePlace(editingPlace.id, data, imageFile);
        } else {
            result = await createPlace(data, imageFile);
        }

        if (result.success) {
            setIsModalOpen(false);
            fetchPlaces(); // Refresh list
        } else {
            alert("Error saving place: " + result.error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-chop-text-light">Places Management</h1>
                    <p className="text-chop-text-subtle mt-1">Manage restaurants, bars, and hangouts</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg flex items-center gap-2 transition-colors">
                        <Upload size={18} />
                        Import CSV
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 bg-chop-accent-cta text-black font-medium rounded-lg hover:bg-chop-accent-point transition-colors flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Add Place
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search places..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-chop-accent-cta transition-colors"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-chop-accent-cta outline-none"
                >
                    <option value="all">All Categories</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Bar">Bar</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Club">Club</option>
                </select>
            </div>

            {/* List */}
            {loading ? (
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : places.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <p className="text-gray-400 text-lg">No places found</p>
                </div>
            ) : (
                <PlacesTable
                    places={places}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-chop-bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-chop-bg-card border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">
                                {editingPlace ? "Edit Place" : "Add New Place"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6">
                            <PlaceForm
                                initialData={editingPlace}
                                onSubmit={handleSubmit}
                                onCancel={() => setIsModalOpen(false)}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
