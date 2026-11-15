import type { NextConfig } from "next";

// Static export: every route is prerendered to plain HTML in /out, so search
// engines and AI crawlers that don't run JavaScript still read every page.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
