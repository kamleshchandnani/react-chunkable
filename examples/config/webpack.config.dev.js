const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const baseConfig = require("./webpack.config.base");
const paths = require("./paths");

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
  new ProgressBarPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // if omitted default value is 3
    minChunks: 2,
    filename: "vendor-commons.js"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ["runtime"]
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 3
  }),
  new webpack.DefinePlugin({
    "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
  }),

  new HtmlWebpackPlugin({
    template: paths.appHtml,
    production: false,
    inject: true
  }),
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  // If you require a missing module and then `npm install` it, you still have
  // to restart the development server for Webpack to discover it. This plugin
  // makes the discovery automatic so you don't have to restart.
  // new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  new webpack.NamedModulesPlugin()
];

const appEntry = [
  // activate HMR for React
  "react-hot-loader/patch",

  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  // "webpack-dev-server/client?http://localhost:3000",

  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  "webpack/hot/only-dev-server",
  // the entry point of our app
  paths.appIndexJs
];

module.exports = {
  devtool: "source-map",
  context: baseConfig.context,
  entry: {
    bundle: appEntry,
    vendor: baseConfig.entry.vendor
  },
  output: {
    path: paths.appPublic,
    pathinfo: true,
    filename: "[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      // eslint check
      {
        enforce: "pre",
        // test: /reducer.js/,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      // "!" is for chaining and the order goes right-left
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
      // {
      //   test: /\.css$/,
      //   loader: "style!css?importLoaders=1!postcss",
      //   options: {
      //     plugins: function () {
      //       return [
      //         require("precss"),
      //         require("autoprefixer")
      //       ];
      //     }
      //   }
      // },
      // {
      //   test: /\.scss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
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
  plugins,
  devServer: {
    contentBase: paths.appSrc,
    historyApiFallback: true,
    port: 3001,
    hot: true,
    // inline: true,
    compress: false,
    stats: { colors: true }
  }
};
// "start": "sw-precache --config=./config/sw-precache-config.json --verbose && webpack-dev-server --config ./config/webpack.config.dev.js",
