/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ['assets.bonkerscorner.com', 'sslimages.shoppersstop.com', "images.bewakoof.com"],
  },
}

module.exports = nextConfig
