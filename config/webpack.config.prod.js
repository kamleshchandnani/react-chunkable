const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const paths = require("./paths");

const nodeEnv = process.env.NODE_ENV || "production";

process.noDeprecation = true;

const plugins = [
  // new BundleAnalyzerPlugin(),
  new ProgressBarPlugin(),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    mangle: true,
    debug: false,
    minimize: true,
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    }
  })
];

const appEntry = [
  // the entry point of our app
  paths.appIndexJs
];

module.exports = {
  entry: {
    bundle: appEntry
  },
  output: {
    path: paths.appBuild,
    filename: "index.js",
    publicPath: "/",
    // library: "react-chunkable",
    library: {
      root: "react-chunkable-root",
      amd: "react-chunkable-amd",
      commonjs: "react-chunkable"
    },
    libraryTarget: "cjs"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins
};
