import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import {menusPropType} from '../../propTypes/menu';
import {textLabelsPropType} from '../../propTypes/textLabels';
import MainLayout from '../../layouts/Main';
import {charterPagePropType} from '../../propTypes/charterPage';
import {fetchCharterPage, fetchStaticPaths} from '../../lib/services/charterPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import CoverNarrow from '../../components/covers/CoverNarrow';
import CharterSpotsList from '../../components/pages/charter/SpotsList';
import LowCover from '../../components/covers/LowCover';
import Footer from '../../components/Footer';

export default function CharterPage({charterPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const spots = charterPage.group_charter.map(({link}) => link);

	return (
		<>
			<Head>
				{!_isEmpty(charterPage.seo_title) &&
				<title>{charterPage.seo_title}</title>
				}
				{!_isEmpty(charterPage.seo_meta_description) &&
				<meta name={'Description'} content={charterPage.seo_meta_description} />
				}
			</Head>
			<MainLayout>
				<CoverNarrow block={{
					image: charterPage.image,
					title: charterPage.title,
					text: charterPage.description,
				}} />
				<CharterSpotsList spots={spots} />
				<LowCover block={{title: textLabels.looking_for_a_new_boat,
					text: textLabels.looking_for_a_new_boat_subtitle,
					link: textLabels.get_in_touch_link,
					link_label: textLabels.get_in_touch_label
				}}
				/>

				<Footer />
			</MainLayout>
		</>
	);
}

CharterPage.propTypes = {
	menus: menusPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
	charterPage: charterPagePropType().isRequired
};

export async function getStaticProps(context) {
	const charterPage = await fetchCharterPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			menus,
			textLabels,
			charterPage
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}