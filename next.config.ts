import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // Maintain this configuration
    },
  },
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
  },
};

export default nextConfig;
