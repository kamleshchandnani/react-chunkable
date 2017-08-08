var express  = require("express")
var path = require("path")
var app      = express();
var ProdConfig = require("./webpack.config.prod"),
    proxy      = require("http-proxy-middleware"),
    options    = {
      target: "http://localhost:3003", // target host 
      changeOrigin: true,               // needed for virtual hosted sites 
      ws: true                         // proxy websockets 
    },
    gatewayProxy = proxy(options)

var serverConfig = {
    HOST: "0.0.0.0",
    PORT: "3000"
};

app.use("/api", gatewayProxy)
app.use(express.static(path.join(__dirname, "../public/index.html")))

app.get(/^(?!api).*/, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"))
});

app.listen(serverConfig.PORT, serverConfig.HOST, function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log("Listening at http://"+ serverConfig.HOST + ":" + serverConfig.PORT)
});