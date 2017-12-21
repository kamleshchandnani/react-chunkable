// const webpack = require("webpack");
// const baseConfig = require("./webpack.config.base");
// const paths = require("./paths");

// const devTools = "cheap-module-source-map";

// process.noDeprecation = true;
// const postCSSLoader = {
//   loader: "postcss-loader",
//   options: {
//     sourceMap: true,
//     plugins: (loader) => {
//       return [
//         require("postcss-import")({ root: loader.resourcePath }), // eslint-disable-line
//         require("postcss-cssnext")() // eslint-disable-line
//       ];
//     }
//   }
// };
// const plugins = [
//   new webpack.optimize.CommonsChunkPlugin({
//     // extract the vendor chunk into separate chunk
//     name: "vendor", // Name of the chunk
//     minChunks: Infinity, // Creates a chunk but no extra modules are moved into it
//     filename: "js/vendor.bundle-[chunkhash:8].js" // Output filename of the vendor chunk
//   }),
//   new webpack.optimize.CommonsChunkPlugin({
//     async: true, // Only code split bundles will be scanned
//     children: true, // all children of the commons chunk are selected
//     minChunks: 4 // The minimum number of chunks which need to contain a module
//   }),
//   new webpack.optimize.CommonsChunkPlugin({
//     // The runtime is the part of Webpack that resolves modules at runtime and handles async loading and more.
//     // If you add a CommonsChunkPlugin with the name of a chunk that does not exist as the name of an entry-point Webpack will extract the runtime, create a chunk by that name and put the runtime in there
//     name: "runtime" // to retain the vendor chunks hash when it's not changed
//   })
// ];

// module.exports = {
//   entry: {
//     // entry points of an application
//     bundle: "/src/index.js",
//     vendor: ["react", "react-dom"]
//   },
//   output: {
//     // options related to how webpack emits results
//     path: "public/build",
//     filename: "js/[name].[chunkhash:8].js",
//     chunkFilename: "js/[name].[chunkhash:8].js",
//     publicPath: "/"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader?importLoaders=1&sourceMap", postCSSLoader]
//       },
//       {
//         test: /\.scss$/,
//         use: [
//           "style-loader",
//           "css-loader?importLoaders=1&sourceMap",
//           postCSSLoader,
//           "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
//         ]
//       },
//       {
//         test: /\.html$/,
//         loader: "html-loader"
//       },
//       {
//         test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
//         use: "file-loader"
//       },
//       {
//         test: /\.json$/,
//         loader: "json-loader"
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: [
//           "react-hot-loader/webpack",
//           {
//             loader: "babel-loader",
//             query: {
//               // This is a feature of `babel-loader` for webpack (not Babel itself).
//               // It enables caching results in ./node_modules/.cache/babel-loader/
//               // directory for faster rebuilds.
//               cacheDirectory: true
//             }
//           }
//         ]
//       }
//     ]
//   },
//   resolve: baseConfig.resolve
// };
