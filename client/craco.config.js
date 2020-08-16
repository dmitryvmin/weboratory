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
      '@stores': path.resolve(__dirname, './src/stores'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@api(.*)$": "<rootDir>/src/api$1",
        "^@utils(.*)$": "<rootDir>/src/utils$1",
        "^@components(.*)$": "<rootDir>/src/components$1",
        "^@common(.*)$": "<rootDir>/src/common$1",
        "^@styles(.*)$": "<rootDir>/src/styles$1",
        "^@configs(.*)$": "<rootDir>/src/configs$1",
        "^@stores(.*)$": "<rootDir>/src/stores$1",
      }
    }
  }
}
