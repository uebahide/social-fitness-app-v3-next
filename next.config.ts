import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: isProd
      ? [
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_API_HOST ?? '',
            pathname: '/storage/**',
          },
        ]
      : [
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8000',
            pathname: '/storage/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
            pathname: '/storage/**',
          },
        ],
  },
};

export default nextConfig;
