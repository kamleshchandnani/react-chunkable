var fs = require("fs")
var http = require("http")

var Express = require("express");
var webpack = require("webpack");

var webpackConfig = require("./webpack.config.dev");
var compiler = webpack(webpackConfig);

var host = "localhost";
var port = 3001;

var serverOptions = {
  contentBase: "http://" + host + ":" + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {colors: true},
};

var app = new Express();
const server = new http.Server(app)

app.use(require("webpack-dev-middleware")(compiler, serverOptions));
app.use(require("webpack-hot-middleware")(compiler));

server.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info("==> ðŸš§  Webpack development server listening on port %s", port);
  }
});