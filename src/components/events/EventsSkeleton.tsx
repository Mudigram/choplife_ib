export default function EventsSkeleton() {
    return (
        <div className="space-y-3 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="
              w-full h-14
              rounded-xl
              bg-[rgba(255,255,255,0.05)]
              animate-pulse
            "
                />
            ))}
        </div>
    );
}
