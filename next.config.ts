import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/bozza.html",
      },
    ];
  },
};

export default nextConfig;
