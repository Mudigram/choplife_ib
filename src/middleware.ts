import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Temporarily disabled - using client-side protection in admin layout instead
    // The middleware has issues accessing Supabase session cookies
    // Client-side protection in /admin/layout.tsx is more reliable
    
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
