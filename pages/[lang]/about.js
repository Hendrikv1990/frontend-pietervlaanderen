import {useDispatch} from 'react-redux';
import Head from 'next/head';
import MainLayout from '../../layouts/Main';
import ResolvedLink from '../../components/ResolvedLink';
import {RichText} from 'prismic-reactjs';
import {fetchHomePageWithLayoutData} from '../../lib/services/homePage';
import {useAppData} from '../../hooks/appData';

export default function Index(props) {
	console.log('income props:', Object.keys(props));
	const {homePage, menus, textLabels} = props;

	const {setAppData} = useAppData();
	setAppData(textLabels);

	return (
		<>
			<Head>
				<title>ABOUT!!!</title>
				{/*<meta name={'Description'} content={homePage.seo_meta_description} />*/}
			</Head>
			<MainLayout>
				<nav>
					<ul data-wio-id={menus['main-menu']._meta.id}>
						{menus['main-menu'].menu_links.map((item, i) =>
							<li key={i}>
								<ResolvedLink link={item.link}>{RichText.asText(item.label)}</ResolvedLink>
							</li>
						)}
					</ul>
				</nav>
				<main>
					about page!
				</main>
			</MainLayout>
		</>
	);
}

export async function getStaticProps(context) {
	const {homePage, menus, textLabels} = await fetchHomePageWithLayoutData(context);

	return {
		props: {
			homePage,
			menus,
			textLabels
		}
	};
}

export function getStaticPaths() {
	return {
		paths: [
			{ params: { lang: 'en' } },
			// { params: { lang: 'ru' } },
		],
		fallback: false
	};
}