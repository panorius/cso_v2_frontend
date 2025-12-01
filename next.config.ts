import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour Docker et production
  output: "standalone",

  // Configuration pour les images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },

  // Configuration pour les variables d'environnement
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },

  // Configuration pour le développement avec hot-reload
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "localhost:4000"],
    },
  },

  // Configuration pour WebSockets et Socket.IO
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
      {
        source: "/socket.io/:path*",
        destination: `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket.io/:path*`,
      },
    ];
  },
};

export default nextConfig;
