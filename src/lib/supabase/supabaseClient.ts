// src/lib/supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Single exported Supabase client for client-side use.
 * Using NEXT_PUBLIC_* env vars so the client can be used in the browser.
 *
 * NOTE: For server-only operations (like a Next.js server action),
 * you should create a new client using the service_role key (kept on the server).
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

let supabase: SupabaseClient;

// Ensure a single client instance in dev (prevents hot-reload duplicates)
if (process.env.NODE_ENV === "production") {
  supabase = createClient(url, anonKey);
} else {
  // @ts-expect-error globalThis typing used to persist client across HMR in dev
  if (!globalThis.__supabase) {
    // @ts-expect-error globalThis typing used to persist client across HMR in dev
    globalThis.__supabase = createClient(url, anonKey);
  }
  // @ts-expect-error globalThis typing used to persist client across HMR in dev
  supabase = globalThis.__supabase;
}

export { supabase };
export default supabase;
