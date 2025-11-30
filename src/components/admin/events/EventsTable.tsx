"use client";

import { IbadanEvent } from "@/types/events";
import { Edit, Trash2, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

type EventsTableProps = {
    events: IbadanEvent[];
    onEdit: (event: IbadanEvent) => void;
    onDelete: (id: number) => void;
};

export default function EventsTable({ events, onEdit, onDelete }: EventsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="py-4 px-4 font-medium">Event</th>
                        <th className="py-4 px-4 font-medium">Date & Time</th>
                        <th className="py-4 px-4 font-medium">Venue</th>
                        <th className="py-4 px-4 font-medium">Price</th>
                        <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {events.map((event) => (
                        <tr key={event.id} className="group hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                                        {event.thumbnail ? (
                                            <Image
                                                src={event.thumbnail}
                                                alt={event.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                                <Calendar size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white">{event.title}</div>
                                        <div className="text-xs text-gray-500">
                                            {event.category || "Uncategorized"}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="text-sm text-gray-300">
                                    {format(new Date(event.start_date_time), "MMM d, yyyy")}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {format(new Date(event.start_date_time), "h:mm a")}
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <div className="flex items-center gap-1.5 text-sm text-gray-300">
                                    <MapPin size={14} className="text-gray-500" />
                                    <span className="truncate max-w-[150px]">{event.venue}</span>
                                </div>
                            </td>
                            <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                                    {event.price_ngn === 0 ? "Free" : `₦${event.price_ngn.toLocaleString()}`}
                                </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(event)}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(event.id)}
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
