import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow cross-origin requests from the backend in dev
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api'}/:path*`,
      },
    ];
  },
  // Enable React strict mode for better dev-time warnings
  reactStrictMode: true,
  // Trust backend origin for images if needed in future
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
