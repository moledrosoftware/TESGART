// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: 'http://localhost:5000/admin',
      },
      {
        source: '/login',
        destination: 'http://localhost:5000/login',
      },
    ];
  },
};

export default nextConfig;
