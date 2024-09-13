/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'source.unsplash.com', 'images.pexels.com'],
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
