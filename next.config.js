/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ssnthailand.com', 'database.ssnthailand.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['antd', '@ant-design/charts', '@ant-design/icons'],
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://database.ssnthailand.com/api/public/:path*',
      },
    ];
  },
}

module.exports = nextConfig
