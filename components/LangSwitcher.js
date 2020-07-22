import {locales} from '../prismic-configuration';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import {LocaleContext} from './Locale';

export default function LangSwitcher() {
	const router = useRouter();

	function onClick(code, e) {
		e.preventDefault();

		const query = Object.assign({}, router.query, {
			lang: code
		});

		let asPath = router.pathname;
		for (const key of Object.keys(query)) {
			asPath = asPath.replace(`[${key}]`, query[key]);
		}

		router.push(router.pathname, asPath);
	}

	return (
		<LocaleContext.Consumer>
			{({locale}) => (
				Object.keys(locales).map((item, i) => (
					<a href="#"
						 key={i}
						 className={clsx({active: item == locale})}
						 onClick={onClick.bind(this, item)}
					>{locales[item].title}</a>
				))
			)}
		</LocaleContext.Consumer>
	);
}