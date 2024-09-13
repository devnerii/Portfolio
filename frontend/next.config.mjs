/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return [
      // Redireciona de danielneri.online para www.danielneri.online
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'danielneri.online' }],
        destination: 'https://www.danielneri.online/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
