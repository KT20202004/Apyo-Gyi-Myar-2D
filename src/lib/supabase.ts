import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || "http://mock.supabase.co";
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || "mock-anon-key";

if (supabaseUrl === "http://mock.supabase.co") {
  console.warn("Missing VITE_SUPABASE_URL! Make sure to set it in your environment variables. Using placeholder for compilation.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
