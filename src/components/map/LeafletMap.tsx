"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Fix for default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    items: ScrollItem[];
    userLocation?: { lat: number; lng: number };
};

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

export default function LeafletMap({ items, userLocation }: Props) {
    const router = useRouter();

    // Default center (Ibadan) if no user location
    const defaultCenter: [number, number] = [7.3775, 3.9470];
    const center = userLocation ? [userLocation.lat, userLocation.lng] as [number, number] : defaultCenter;

    return (
        <MapContainer
            center={center}
            zoom={13}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
            className="z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>You are here</Popup>
                </Marker>
            )}

            <MapUpdater center={center} />

            {items.map((item) => {
                if (!item.lat || !item.lng) return null;
                return (
                    <Marker
                        key={item.id}
                        position={[item.lat, item.lng]}
                    >
                        <Popup className="min-w-[200px]">
                            <div
                                className="cursor-pointer"
                                onClick={() => router.push(`/places/${item.id}`)}
                            >
                                <div className="relative w-full h-24 mb-2 rounded-md overflow-hidden">
                                    {item.image_url ? (
                                        <Image
                                            src={item.image_url}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">No Image</div>
                                    )}
                                </div>
                                <h3 className="font-bold text-sm">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.subtitle}</p>
                                {item.rating && <p className="text-xs text-yellow-500">⭐ {item.rating}</p>}
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}
