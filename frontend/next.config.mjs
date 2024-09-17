/** @type {import('next').NextConfig} */
import nextI18NextConfig from './next-i18next.config.js'; // Importa o módulo como um todo


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
  i18n: nextI18NextConfig.i18n, // Referência ao `i18n` dentro do módulo importado
  async redirects() {
    return [
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
