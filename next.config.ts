import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack never infers it from a stray
  // package.json in a parent directory.
  turbopack: { root: path.resolve(import.meta.dirname) },
  images: {
    // Swap the local SVG placeholders in src/lib/content.ts for real photography
    // from either of these hosts without touching any component code.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
