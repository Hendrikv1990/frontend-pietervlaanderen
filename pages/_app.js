import '../styles/main.scss';
import PropTypes from 'prop-types';
import {LocaleProvider} from '../components/Locale';

export default function App({Component, pageProps, router}) {
	const lang = router.query.lang || undefined;

	return (
		<LocaleProvider ssLang={lang}>
			<Component {...pageProps} />
		</LocaleProvider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.object,
	router: PropTypes.object
};