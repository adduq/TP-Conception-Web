// vue.config.js
module.exports = {
	lintOnSave: false,
	entry: [
		"webpack-dev-server/client?http://0.0.0.0:8000",
		"webpack/hot/only-dev-server",
		"./src",
	],
	devServer: {
		hot: true,
		hotOnly: true,
		disableHostCheck: true,
		historyApiFallback: true,
		// public: '0.0.0.0:8000',
		port: 8000,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
		watchOptions: {
			poll: 1000,
			ignored: "/app/node_modules/",
		},
	},
};
