const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist/js",
    filename: "index.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
	scriptLoading: 'defer',
	template: 'src/html/indextemplatedev.html'
	})
  ],
	externals: {
		"pixi.js": "PIXI",
  	"opdPreloader": "opdPreloader"
	//	{"gsap": "gsap"},
	//	{"WebFont": "WebFont"},
	//	{"Howler": "Howler"}
	},
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
    ],
  },
};
