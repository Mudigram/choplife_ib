"use client";

import { Place } from "@/types/place";
import { Edit, Trash2, MapPin, Star } from "lucide-react";
import Image from "next/image";

type PlacesTableProps = {
    places: Place[];
    onEdit: (place: Place) => void;
    onDelete: (id: string) => void;
};

export default function PlacesTable({ places, onEdit, onDelete }: PlacesTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="py-4 px-4 font-medium">Place</th>
                        <th className="py-4 px-4 font-medium">Category</th>
                        <th className="py-4 px-4 font-medium">Area</th>
                        <th className="py-4 px-4 font-medium">Rating</th>
                        <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {places.map((place) => (
                        <tr key={place.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                                        {place.image_url ? (
                                            <Image
                                                src={place.image_url}
                                                alt={place.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <MapPin size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{place.name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                            {place.address || "No address"}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                                    {place.category || "Uncategorized"}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-gray-300 text-sm">
                                {place.area || "-"}
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-1 text-sm text-yellow-400">
                                    <Star size={14} className="fill-yellow-400" />
                                    <span>{place.average_rating?.toFixed(1) || "0.0"}</span>
                                    <span className="text-gray-500 text-xs">({place.total_reviews || 0})</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(place)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(place.id)}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
