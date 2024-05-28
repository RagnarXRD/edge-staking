import dns from "dns";
/** @type {import('next').NextConfig} */

dns.setDefaultResultOrder("ipv4first");

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "postimg.cc",
      },
    ],
  },
};

export default nextConfig;
