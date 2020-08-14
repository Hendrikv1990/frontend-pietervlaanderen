const webpack = require('webpack');
const withImages = require('next-images');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;// eslint-disable-line

module.exports = withImages({
	webpack: (config) => {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.PRISMIC_REPOSITORY_NAME': `'${process.env.PRISMIC_REPOSITORY_NAME}'`,
				'process.env.FORM_APN': `'${process.env.FORM_APN}'`,
				'process.env.MAPBOX_TOKEN': `'${process.env.MAPBOX_TOKEN}'`
			})
		);

		// config.plugins.push(
		// 	new BundleAnalyzerPlugin({
		// 		analyzerMode: 'static'
		// 	})
		// );

		return config;
	}
});