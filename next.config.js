/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
        pathname: "/pbxt/**",
      },
    ],
  },
};

module.exports = nextConfig;
