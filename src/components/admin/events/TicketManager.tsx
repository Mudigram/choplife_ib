"use client";

import { useState } from "react";
import { TicketTier } from "@/hooks/useEventTickets";
import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

type TicketManagerProps = {
    tickets: Partial<TicketTier>[];
    onChange: (tickets: Partial<TicketTier>[]) => void;
};

export default function TicketManager({ tickets, onChange }: TicketManagerProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [tempTicket, setTempTicket] = useState<Partial<TicketTier>>({
        tier_name: "",
        price_ngn: 0,
        quantity_total: 100,
        description: "",
        benefits: [],
        is_available: true
    });
    const [benefitInput, setBenefitInput] = useState("");

    const handleAddBenefit = () => {
        if (!benefitInput.trim()) return;
        setTempTicket(prev => ({
            ...prev,
            benefits: [...(prev.benefits || []), benefitInput.trim()]
        }));
        setBenefitInput("");
    };

    const removeBenefit = (index: number) => {
        setTempTicket(prev => ({
            ...prev,
            benefits: prev.benefits?.filter((_, i) => i !== index)
        }));
    };

    const handleSaveTicket = () => {
        if (!tempTicket.tier_name) return;

        if (editingIndex !== null) {
            const newTickets = [...tickets];
            newTickets[editingIndex] = tempTicket;
            onChange(newTickets);
            setEditingIndex(null);
        } else {
            onChange([...tickets, tempTicket]);
        }

        resetForm();
    };

    const handleEdit = (index: number) => {
        setTempTicket(tickets[index]);
        setEditingIndex(index);
        setIsAdding(true);
    };

    const handleDelete = (index: number) => {
        onChange(tickets.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setTempTicket({
            tier_name: "",
            price_ngn: 0,
            quantity_total: 100,
            description: "",
            benefits: [],
            is_available: true
        });
        setIsAdding(false);
        setEditingIndex(null);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Tickets</h3>
                {!isAdding && (
                    <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="px-3 py-1.5 bg-chop-accent-cta/10 text-chop-accent-cta rounded-lg text-sm font-medium hover:bg-chop-accent-cta/20 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Ticket Tier
                    </button>
                )}
            </div>

            {/* Ticket Form */}
            {isAdding && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400">Tier Name</label>
                            <input
                                type="text"
                                value={tempTicket.tier_name || ""}
                                onChange={e => setTempTicket({ ...tempTicket, tier_name: e.target.value })}
                                placeholder="e.g. Early Bird"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400">Price (₦)</label>
                            <input
                                type="number"
                                value={tempTicket.price_ngn || 0}
                                onChange={e => setTempTicket({ ...tempTicket, price_ngn: parseFloat(e.target.value) })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400">Total Quantity</label>
                            <input
                                type="number"
                                value={tempTicket.quantity_total || 0}
                                onChange={e => setTempTicket({ ...tempTicket, quantity_total: parseInt(e.target.value) })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400">Description</label>
                            <input
                                type="text"
                                value={tempTicket.description || ""}
                                onChange={e => setTempTicket({ ...tempTicket, description: e.target.value })}
                                placeholder="Optional details"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-chop-accent-cta outline-none"
                            />
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Benefits (Perks)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={benefitInput}
                                onChange={e => setBenefitInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), handleAddBenefit())}
                                placeholder="Add a benefit..."
                                className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-chop-accent-cta outline-none"
                            />
                            <button
                                type="button"
                                onClick={handleAddBenefit}
                                className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tempTicket.benefits?.map((benefit, i) => (
                                <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-chop-accent-cta/20 text-chop-accent-cta text-xs rounded-md">
                                    {benefit}
                                    <button onClick={() => removeBenefit(i)} className="hover:text-white">
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveTicket}
                            className="px-3 py-1.5 bg-chop-accent-cta text-black text-xs font-bold rounded-lg hover:bg-chop-accent-point"
                        >
                            {editingIndex !== null ? "Update Ticket" : "Add Ticket"}
                        </button>
                    </div>
                </div>
            )}

            {/* Ticket List */}
            <div className="space-y-2">
                {tickets.map((ticket, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg group">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-white">{ticket.tier_name}</span>
                                <span className="text-chop-accent-point text-sm">₦{ticket.price_ngn?.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                                {ticket.quantity_total} available • {ticket.benefits?.length || 0} benefits
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => handleEdit(index)}
                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md"
                            >
                                <Edit2 size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
                {tickets.length === 0 && !isAdding && (
                    <div className="text-center py-4 text-gray-500 text-sm border border-dashed border-white/10 rounded-lg">
                        No tickets added yet
                    </div>
                )}
            </div>
        </div>
    );
}
