const paths = require("./paths");

module.exports = {
  context: paths.appSrc,
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [paths.appSrc, "node_modules"]
  }
};
