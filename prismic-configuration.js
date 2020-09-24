import {getLocaleByPrismic} from './lib/i18n';

export const REPOSITORY_NAME = process.env.PRISMIC_REPOSITORY_NAME;

export const apiEndpoint = `https://${REPOSITORY_NAME}.prismic.io/api/v2`;
export const accessToken = process.env.PRISMIC_API_TOKEN || '';

export const linkResolver = function(doc) {
	const type = String(doc.__typename).toLowerCase();
	const locale = (doc._meta?.lang) ? getLocaleByPrismic(doc._meta.lang) : null;

	if (type == 'yacht') {
		return `/${locale}/yacht/${doc._meta.uid}`;
	} else if (type == 'home_page') {
		return `/${locale}`;
	} else if (type == 'blog_post') {
		return `/${locale}/blog/${doc._meta.uid}`;
	} else if (type == 'job_position_page') {
		return '/${locale}/jobs/${doc._meta.uid}';
	} else if (/_page$/.test(type) || type == 'propulsion' || type == 'data_protection_policy') {
		return `/${locale}/${doc._meta.uid}`;
	}

	return '/';
};

export const hrefResolver = (doc) => {
	const type = String(doc.__typename).toLowerCase();

	if (type == 'yacht') {
		return '/[lang]/yacht/[slug]';
	} else if (type == 'home_page') {
		return '/[lang]';
	} else if (type == 'blog_post') {
		return '/[lang]/blog/[slug]';
	} else if (type == 'job_position_page') {
		return '/[lang]/jobs/[slug]';
	} else if (/_page$/.test(type) || type == 'propulsion' || type == 'data_protection_policy') {
		return `/[lang]/${doc._meta.uid}`;
	}

	return '/';
};

export const locales = {
	en: {
		isDefault: true,
		prismicLocale: 'en-us',
		title: 'English'
	},
	de: {
		prismicLocale: 'de-de',
		title: 'German'
	},
	es: {
		prismicLocale: 'es-es',
		title: 'Spanish'
	},
	fr: {
		prismicLocale: 'fr-fr',
		title: 'French'
	},
	sl: {
		prismicLocale: 'sl',
		title: 'Slovenian'
	},
	it: {
		prismicLocale: 'it-it',
		title: 'Italian'
	}
};