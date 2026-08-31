import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel injects its own adapter. Next 16.3 + standalone skips
  // next-server.js.nft.json, which Vercel's onBuildComplete still opens.
  output: process.env.VERCEL ? undefined : "standalone",
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
