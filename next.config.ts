import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
