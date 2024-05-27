/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'static/assets/audio/',
          publicPath: '/_next/static/assets/audio/',
        },
      },
    });

    return config;
  },
};

export default nextConfig;
