// vue.config.js
var merge = require("webpack-merge");

module.exports = {
	lintOnSave: false,
	devServer: {
		hot: true,
		hotOnly: true,
		disableHostCheck: true,
		historyApiFallback: true,
		public: "0.0.0.0:8000",
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
	configureWebpack: (config) => {
		merge(config, { VUE_APP_AXIOS_URL: process.env.VUE_APP_AXIOS_URL });
	},
};
