const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@components': path.resolve(__dirname, './src/components'),
      '@common': path.resolve(__dirname, './src/common'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@configs': path.resolve(__dirname, './src/configs'),
    },
  },
}
