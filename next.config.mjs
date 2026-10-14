/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    const backendUrl = (process.env.ERP_BACKEND_URL || process.env.NEXT_PUBLIC_ERP_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');
    return [
      {
        source: '/api/erp/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
