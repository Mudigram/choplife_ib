import { useEffect, useRef, useState } from "react";

export function usePullToRefresh(onRefresh: () => Promise<void>) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const startY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let touchStartY = 0;
        let canPull = false;

        const handleTouchStart = (e: TouchEvent) => {
            // Only allow pull-to-refresh at the top of the page
            if (container.scrollTop === 0) {
                touchStartY = e.touches[0].clientY;
                canPull = true;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!canPull) return;

            const touchY = e.touches[0].clientY;
            const distance = touchY - touchStartY;

            // Only track downward pulls
            if (distance > 0 && container.scrollTop === 0) {
                // Prevent default scrolling behavior
                e.preventDefault();
                
                // Add resistance to the pull (diminishing returns)
                const resistanceFactor = 0.4;
                const adjustedDistance = distance * resistanceFactor;
                
                // Cap at 120px
                setPullDistance(Math.min(adjustedDistance, 120));
            }
        };

        const handleTouchEnd = async () => {
            if (pullDistance > 60 && !isRefreshing) {
                setIsRefreshing(true);
                try {
                    await onRefresh();
                } finally {
                    setIsRefreshing(false);
                }
            }
            setPullDistance(0);
            canPull = false;
        };

        container.addEventListener("touchstart", handleTouchStart, { passive: true });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
        };
    }, [onRefresh, pullDistance, isRefreshing]);

    return {
        containerRef,
        isRefreshing,
        pullDistance,
    };
}
