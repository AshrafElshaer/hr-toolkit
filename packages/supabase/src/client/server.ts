import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@hr-toolkit/env";
import type { Database } from "../types";

export type SupabaseClientOptions = {
  isAdmin: boolean;
};

export const createFetch =
  (options: Pick<RequestInit, "next" | "cache">) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    });
  };

export function createServerClient(options: SupabaseClientOptions = {
  isAdmin: false,
}) {
  const cookieStore = cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return _createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    },
  );
}
