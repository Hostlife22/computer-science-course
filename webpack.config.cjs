const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { paths } = require("./config.cjs");
const { entries, htmlTemplates } = require("./entriesAndHtmlTemplates.cjs");

const mode =
	process.env.NODE_ENV === "production" ? "production" : "development";
const target = mode === "production" ? "browserslist" : "web";
const devtool = mode === "production" ? false : "source-map";

module.exports = {
	mode,
	target,
	devtool,
	entry: {
		index: "./src/index.ts",
		...entries,
	},
	output: {
		filename: "[name].bundle.js",
		path: paths.lib,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devServer: {
		static: paths.lib,
		port: 9000,
		hot: true,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		...htmlTemplates.map((template) => new HtmlWebpackPlugin(template)),
	],
};
