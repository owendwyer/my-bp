
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
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
	filename: '../index.html',
	scriptLoading: 'defer',
	template: 'src/indextemplate.html'
	})
  ],
  module: {
    rules: [
    ],
  },
};
