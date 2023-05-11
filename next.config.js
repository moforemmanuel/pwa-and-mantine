const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const defaultRuntimeCaching = require('./cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: false,
  disable: process.env.NODE_ENV == 'development',
  register: true,
  // skipWaiting: true,
  // sw: 'ws.js',
  // scope: '/',

  // cache data for jsonplaceholder
  // runtimeCaching: defaultRuntimeCaching.concat({
  //   urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com/,
  //   handler: 'StaleWhileRevalidate',
  //   options: {
  //     cacheName: 'api-cache',
  //     // cacheableResponse: {
  //     //   statuses: [200],
  //     // },
  //   },
  // }),
});

const withPlugins = require('next-compose-plugins');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// module.exports = withBundleAnalyzer(withPWA(nextConfig));
// module.exports = (phase, { defaultConfig }) => {
//   console.log('phase: ', phase);
//   console.log('defaultConfig: ', defaultConfig.pwa);
//   return withPlugins([
//     [withBundleAnalyzer],
//     [
//       withPWA,
//       {
//         // other pwa config
//         // not applicable here, see npmjs
//       },
//     ],
//     nextConfig,
//   ]);
// };

module.exports = withPlugins([
  [withBundleAnalyzer],
  [
    withPWA,
    {
      // other pwa config
      // not applicable here, see npmjs
    },
  ],
  nextConfig,
]);
