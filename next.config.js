const webpack = require('webpack');
const withImages = require('next-images');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;// eslint-disable-line

module.exports = withImages({
	webpack: (config) => {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.PRISMIC_REPOSITORY_NAME': `'${process.env.PRISMIC_REPOSITORY_NAME}'`,
				'process.env.FORM_APN': `'${process.env.FORM_APN}'`,
				'process.env.MAPBOX_TOKEN': `'${process.env.MAPBOX_TOKEN}'`,
				'process.env.GOOGLE_TAG_MANAGER_ID': JSON.stringify(process.env.GOOGLE_TAG_MANAGER_ID)
			})
		);

		// config.plugins.push(
		// 	new BundleAnalyzerPlugin({
		// 		analyzerMode: 'static'
		// 	})
		// );

		return config;
	},

	redirects: async () => {
		return [
			{
				source: '/some-old-yacht',
				destination: '/en/yacht/45-fly',
				permanent: true,
			},
		];
	},
});