import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
