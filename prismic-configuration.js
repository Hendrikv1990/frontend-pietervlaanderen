import {getLocaleByPrismic} from './lib/i18n';

export const REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME;

export const apiEndpoint = `https://${REPOSITORY_NAME}.prismic.io/api/v2`;
export const accessToken = process.env.PRISMIC_API_TOKEN || '';

export const linkResolver = function(doc) {
	if (doc.type === 'page') {
		const locale = getLocaleByPrismic(doc.lang);

		if (doc.uid == 'homepage')
			return `/${locale}`;

		return `/${locale}/${doc.uid}`;
	}

	return '/';
};

export const hrefResolver = (doc) => {
	if (doc.type === 'page') {

		let link = '/[lang]';
		if (doc.uid != 'homepage') {
			link += `/${doc.uid}`;
		}

		return link;
	}

	return '/';
};

export const locales = {
	en: {
		isDefault: true,
		prismicLocale: 'en-us',
		title: 'English'
	},
	// de: {
	// 	prismicLocale: 'de-de',
	// 	title: 'German'
	// },
	ru: {
		prismicLocale: 'ru',
		title: 'Рус'
	}
};