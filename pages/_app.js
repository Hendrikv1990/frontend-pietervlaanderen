import '../styles/styles.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import PropTypes from 'prop-types';
import {LocaleProvider} from '../components/Locale';
import makeStore from '../redux/index';
import {Provider as ReduxProvider} from 'react-redux';

export default function App({Component, pageProps, router}) {
	const lang = router.query.lang || undefined;
	const store = makeStore();

	return (
		<LocaleProvider ssLang={lang}>
			<ReduxProvider store={store}>
				<Component {...pageProps} />
			</ReduxProvider>
		</LocaleProvider>
	);
}

App.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.object,
	router: PropTypes.object
};