const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'], // Added Unsplash for potential demo images
  },
};

module.exports = withContentlayer(nextConfig);