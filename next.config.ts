import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  /* config options here */

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["i.namu.wiki"],
  },
};

module.exports = withContentlayer(nextConfig);
