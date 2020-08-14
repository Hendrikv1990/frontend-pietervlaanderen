import '../styles/styles.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css';
import 'photo-sphere-viewer/dist/plugins/markers.css';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import 'mapbox-gl/dist/mapbox-gl.css';

import PropTypes from 'prop-types';
import {LocaleProvider} from '../components/Locale';
import makeStore from '../redux/index';
import {Provider as ReduxProvider} from 'react-redux';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import 'animate.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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