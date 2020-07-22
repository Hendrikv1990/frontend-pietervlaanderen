const webpack = require('webpack');

module.exports = {
	webpack: (config) => {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.PRISMIC_REPOSITORY_NAME': `'${process.env.PRISMIC_REPOSITORY_NAME}'`
			})
		);

		return config;
	}
};