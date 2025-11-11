// src/lib/supabaseServerClient.ts (server-only)
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // keep this secret, only in server env

if (!url || !serviceKey) throw new Error("Missing server-side supabase envs");

export const supabaseServer = createClient(url, serviceKey);
