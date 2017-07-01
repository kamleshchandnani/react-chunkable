const webpack = require("webpack");
const path = require("path");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const paths = require("./paths");

const devTools = "cheap-module-source-map";

const nodeEnv = process.env.NODE_ENV || "development";

process.noDeprecation = true;

const plugins = [
  // new BundleAnalyzerPlugin(),
  new ProgressBarPlugin(),
  new WebpackCleanupPlugin({
    exclude: ["index.html", "favicon.ico", "manifest.json", "css/", "img/**/*.{png,jpg,gif,svg}"]
  }),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin(),
  new LodashModuleReplacementPlugin(),
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
    },
    sourceMap: devTools &&
      (devTools.indexOf("sourcemap") >= 0 || devTools.indexOf("source-map") >= 0)
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    //if omitted default value is 3
    minChunks: 3,
    filename: "js/vendor.bundle-[chunkhash:8].js"
  }),
  //Magic for async bundles
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 3
  }),
  new HtmlWebpackPlugin({
    template: paths.appHtml,
    inject: true,
    minify: {
      removeComments: false,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new CopyWebpackPlugin([
    {
      from: "../public/favicon.ico",
      to: "favicon.ico"
    },
    {
      from: "../public/manifest.json",
      to: "manifest.json"
    }
  ]),
  new ExtractTextPlugin("css/styles.[chunkhash:8].css")
];

const appEntry = [
  // the entry point of our app
  paths.appIndexJs
];

module.exports = {
  devtool: devTools,
  context: baseConfig.context,
  entry: {
    bundle: appEntry,
    vendor: baseConfig.entry.vendor
  },
  output: {
    path: paths.appBuild,
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [
      //eslint check
      // {
      //   enforce: "pre",
      //   test: /\.js[x]*$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      // },

      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: true,
                localIdentName: "[local]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: () => {
                  return [
                    require("autoprefixer") // eslint-disable-line
                  ];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader"
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "react-hot-loader/webpack",
          {
            loader: "babel-loader",
            query: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins
};
