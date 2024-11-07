import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";
// Note: import from 'nuqs/server' to avoid the "use client" directive

export const authSearchParams = {
  redirect_url: parseAsString.withDefault("/"),
  auth_type: parseAsString.withDefault("sign-in"),
  email: parseAsString.withDefault(""),
  active_tap: parseAsString.withDefault("sign-in"),
};

export const authSearchParamsCache = createSearchParamsCache(authSearchParams);
