import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "acpbvflnvlyyxniwbpxp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
