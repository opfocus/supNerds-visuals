/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.discordapp.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
