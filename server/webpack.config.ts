// Libs
import * as webpack from "webpack";
import * as path from "path";
import * as Dotenv from "dotenv-webpack";
// import * as CleanWebpackPlugin from "clean-webpack-plugin";
// import nodeExternals = require("webpack-node-externals");

module.exports = (
  env: any,
  argv: {
    mode: string,
  },
): webpack.Configuration => {

  let isProduction = argv.mode === "production";

  return ({
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "build"),
    },
    mode: isProduction ? "production" : "development",
    target: "node",
    devtool: isProduction ? "eval-source-map" : "inline-source-map",
    node: {
      __dirname: false,
      __filename: true,
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                context: __dirname,
                configFile: "tsconfig.json",
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      // new CleanWebpackPlugin({
      //   verbose: true,
      // }),
      new webpack.IgnorePlugin(/^pg-native$/),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    externals: {
      knex: "commonjs knex",
    },
  });
};

// config.externals = [nodeExternals()];

