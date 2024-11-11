import * as Sentry from "@sentry/nextjs";
import { supabaseIntegration } from "@supabase/sentry-js-integration";
import { createBrowserClient } from "@/lib/supabase/browser";

const client = createBrowserClient();

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false,
  enabled: process.env.NODE_ENV === "production",
  integrations: [
    supabaseIntegration(client, Sentry, {
      tracing: true,
      breadcrumbs: true,
      errors: true,
    }),
  ],
});
