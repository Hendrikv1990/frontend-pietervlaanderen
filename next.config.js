const webpack = require('webpack');
const withImages = require('next-images');

module.exports = withImages({
	webpack: (config) => {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.PRISMIC_REPOSITORY_NAME': `'${process.env.PRISMIC_REPOSITORY_NAME}'`
			})
		);

		return config;
	}
});