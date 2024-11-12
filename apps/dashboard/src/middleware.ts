import type { NextRequest } from "next/server";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(
    request,
    NextResponse.next({
      request: request,
      headers: {
        ...request.headers,
        "x-pathname": request.nextUrl.pathname,
      },
    }),
  );

  if (!request.nextUrl.pathname.endsWith("/auth") && !user) {
    return NextResponse.redirect(
      new URL(`/auth?redirect_url=${request.nextUrl.pathname}`, request.url),
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
