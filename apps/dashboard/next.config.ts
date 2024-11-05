import "./src/env.mjs";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ["@toolkit/supabase"],
  

};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  tunnelRoute: "/monitoring",
});
