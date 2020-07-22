import {useEffect, createContext, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {locales} from '../prismic-configuration';
import {getDefaultLocale} from '../lib/i18n';
import {isLocalstorageSupported} from '../lib/utils';

const strings = {
	de: require('../locales/de/translation.json'),
	en: require('../locales/en/translation.json'),
	ru: require('../locales/ru/translation.json'),
};

const defaultLocale = getDefaultLocale();
export const LocaleContext = createContext({
	locale: null
});

/**
 *
 * @param children
 * @param ssLang - lang detected on server side
 * @returns {*}
 * @constructor
 */
export function LocaleProvider({children, ssLang}) {
	const {query} = useRouter();
	const [locale, setLocale] = useState(ssLang || defaultLocale);

	useEffect(() => {
		if (isLocalstorageSupported() && locale !== localStorage.getItem('locale')) {
			localStorage.setItem('locale', locale);
		}
	}, [locale]);

	useEffect(() => {
		if (typeof query.lang === 'string' && (query.lang in locales) && locale !== query.lang) {
			setLocale(query.lang);
		}
	}, [query.lang, locale]);

	return (
		<LocaleContext.Provider
			value={{locale: locale}}
		>
			{children}
		</LocaleContext.Provider>
	);
}

LocaleProvider.propTypes = {
	children: PropTypes.node,
	ssLang: PropTypes.string
};

export function useTranslation() {
	const {locale} = useContext(LocaleContext);

	function t(key) {
		if (!strings[locale][key]) {
			console.warn(`Translation '${key}' for locale '${locale}' not found.`);
		}
		return strings[locale][key] || strings[defaultLocale][key] || key;
	}

	return {
		t,
		locale
	};
}