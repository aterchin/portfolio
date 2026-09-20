import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "mdx"],
  allowedDevOrigins: ["192.168.1.154"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
