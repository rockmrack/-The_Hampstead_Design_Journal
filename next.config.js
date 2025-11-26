module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Replace with your image domains
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL, // Example of using environment variables
  },
};