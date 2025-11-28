"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data considered fresh for 5 minutes
                        staleTime: 5 * 60 * 1000,
                        // Data kept in cache for 30 minutes
                        gcTime: 30 * 60 * 1000,
                        // Don't refetch on window focus (prevents unnecessary requests)
                        refetchOnWindowFocus: false,
                        // Retry failed requests once
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
