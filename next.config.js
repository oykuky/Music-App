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
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
    localeDetection:false,    
  },
};
