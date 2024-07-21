import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { env } from "@/env";
import type { Database } from "@hr-toolkit/supabase/types";

export interface SupabaseClientOptions {
  isAdmin: boolean;
}

export function createServerClient(
  clientOptions: SupabaseClientOptions = {
    isAdmin: false,
  },
) {
  const cookieStore = cookies();

  return _createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    clientOptions.isAdmin
      ? env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
      : env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options as Partial<ResponseCookie>);
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
     
    },
  );
}
