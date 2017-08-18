const webpack = require("webpack");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const paths = require("./paths");

const devTools = "cheap-module-source-map";

const nodeEnv = process.env.NODE_ENV || "development";

process.noDeprecation = true;
const postCSSLoader = {
  loader: "postcss-loader",
  options: {
    sourceMap: true,
    plugins: (loader) => {
      return [
        require("postcss-import")({ root: loader.resourcePath }), // eslint-disable-line
        require("postcss-cssnext")() // eslint-disable-line
      ];
    }
  }
};
const plugins = [
  // new BundleAnalyzerPlugin(),
  new ProgressBarPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new WebpackCleanupPlugin({
    exclude: ["index.html", "manifest.json", "img/**/*.{png,jpg,gif,svg}"]
  }),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin(),
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
    sourceMap:
      devTools && (devTools.indexOf("sourcemap") >= 0 || devTools.indexOf("source-map") >= 0)
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // if omitted default value is 3
    minChunks: 3,
    filename: "js/vendor.bundle-[chunkhash:8].js"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 3
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "runtime"
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
      from: "../public/img",
      to: "img"
    },
    {
      from: "../public/manifest.json",
      to: "manifest.json"
    }
  ]),
  // new ExtractTextPlugin("css/styles.[chunkhash:8].css"),
  // hot reload
  new webpack.IgnorePlugin(/webpack-stats\.json$/)
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?importLoaders=1&sourceMap", postCSSLoader]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader?importLoaders=1&sourceMap",
          postCSSLoader,
          "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
        ]
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
