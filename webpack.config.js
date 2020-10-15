var PACKAGE = require("./package.json");
var version = PACKAGE.version;
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist/js",
    filename: "bundle.min." + version + ".js",
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
	filename: '../index.html',
	scriptLoading: 'defer',
	template: 'src/html/indextemplate.html'
	})
  ],
  module: {
    rules: [
    ],
  },
};
