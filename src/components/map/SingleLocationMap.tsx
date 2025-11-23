"use client";

import dynamic from "next/dynamic";
import Spinner from "@/components/ui/Spinner";

type Props = {
    lat: number;
    lng: number;
    title: string;
};

const LeafletSingleMap = dynamic<Props>(() => import("./LeafletSingleMap"), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900/50 rounded-xl"><Spinner size="sm" message="Loading Map..." /></div>
});

export default function SingleLocationMap({ lat, lng, title }: Props) {
    return (
        <div className="w-full h-[300px] rounded-xl overflow-hidden">
            <LeafletSingleMap lat={lat} lng={lng} title={title} />
        </div>
    );
}
