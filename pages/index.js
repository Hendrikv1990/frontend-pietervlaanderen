import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {getInitialLocale} from '../lib/i18n';

export default function Index() {
	const router = useRouter();

	useEffect(() => {
		router.replace('/[lang]', `/${getInitialLocale()}`);
	}, []);// eslint-disable-line

	return (
		<Head>
			<meta name="robots" content="noindex, nofollow" />
		</Head>
	);
}