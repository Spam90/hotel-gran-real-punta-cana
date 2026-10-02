/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las fotografías son provisionales (stock), alojadas en Unsplash.
    // Deben sustituirse por material oficial del hotel antes de usarlas en producción.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
