// next.config.js veya next.config.cjs
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "api.deezer.com",
      },
    ],
  },
};
