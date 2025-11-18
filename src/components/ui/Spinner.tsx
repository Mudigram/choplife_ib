"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
    /** The size of the spinner icon and container. */
    size?: SpinnerSize;
    /** Optional custom message displayed below the spinner. */
    message?: string;
    /** If true, the spinner takes up full height/width of its parent for center alignment. */
    full?: boolean;
}

/**
 * A theme-consistent loading spinner component.
 * Uses the orange accent color and a subtle spinning animation.
 */
export default function Spinner({
    size = 'md',
    message,
    full = false
}: SpinnerProps) {

    // Determine icon size and text size based on the 'size' prop
    const iconSizeClasses = {
        sm: 'w-5 h-5', // For buttons or compact areas
        md: 'w-8 h-8', // Standard feed loading
        lg: 'w-12 h-12', // Full page loading
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const containerClasses = full
        ? "flex flex-col items-center justify-center w-full min-h-[40vh] p-8"
        : "flex flex-col items-center justify-center p-4";

    return (
        <div className={containerClasses}>
            <Loader2
                className={`
          animate-spin 
          text-orange-500 
          ${iconSizeClasses[size]} 
          transition-colors
        `}
            />

            {message && (
                <p className={`mt-3 text-chop-text-subtle ${textSizeClasses[size]}`}>
                    {message}
                </p>
            )}
        </div>
    );
}