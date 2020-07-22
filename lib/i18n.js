import {locales} from '../prismic-configuration';
import {isLocalstorageSupported} from './utils';

export function getDefaultLocale() {
	for (const locale of Object.keys(locales)) {
		if (locales[locale].isDefault)
			return locale;
	}

	throw new Error('Cant find default locale');
}

export function getInitialLocale() {
	if (isLocalstorageSupported()) {
		const localSetting = localStorage.getItem('locale');
		if (localSetting && localSetting in locales)
			return localSetting;
	}

	const [browserSetting] = String(navigator.language).toLowerCase().split('-');
	if (browserSetting in locales)
		return browserSetting;

	return getDefaultLocale();
}

export function getLocaleByPrismic(prismicLocale) {
	for (const locale of Object.keys(locales)) {
		if (locales[locale].prismicLocale == prismicLocale)
			return locale;
	}
}