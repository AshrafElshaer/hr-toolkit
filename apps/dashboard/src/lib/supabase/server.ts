import { env } from "@/env.mjs";
import { auth } from "@clerk/nextjs/server";
import { createServerClient as createClient } from "@supabase/ssr";
import type { Database } from "@toolkit/supabase/types";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();

  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (error) {}
        },
      },
    },
  );
}
