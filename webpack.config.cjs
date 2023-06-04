const path = require("path");

const entry = path.resolve("./", "examples");


module.exports = {
	entry: path.resolve(entry,"main"),
	output: {
		filename: "bundle.js",
		path: path.resolve(entry,"dist"),
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	mode: "development"
};
