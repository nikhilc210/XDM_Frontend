import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Must be an object, not boolean
  turbopack: {},

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "corpernews.com" },
      { protocol: "https", hostname: "cdn.corpernews.com" },
      { protocol: "https", hostname: "api.corpernews.com" },
      { protocol: "http", hostname: "api.corpernews.com" },
    ],
  },
};

export default nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
