import PropTypes from 'prop-types';
import {useAppData} from '../../hooks/appData';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {menusPropType} from '../../propTypes/menu';
import {fetchLayoutData} from '../../lib/services/layoutData';
import {fetchPropulsionPage, fetchStaticPaths} from '../../lib/services/propulsion';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import {RichText} from 'prismic-reactjs';
import MainLayout from '../../layouts/Main';
import {propulsionPagePropType} from '../../propTypes/propulsion';
import {fetchAllYachtForPropulsionPage} from '../../lib/services/yacht';
import CoverNarrow from '../../components/covers/CoverNarrow';
import PropulsionHybridSection from '../../components/pages/propulsion/HybridSection';
import PropulsionElectricSection from '../../components/pages/propulsion/ElectricSection';
import ScrollNav from '../../components/ScrollNav';
import EnjoyResponsibleBoating from '../../components/pages/propulsion/EnjoyResponsibleBoating';
import Footer from '../../components/Footer';


export default function PropulsionPage({propulsionPage, menus, textLabels, yachtsData}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const {keys: navKeys, scrollNavLinks} = makeScrollNavLinks(propulsionPage, textLabels);

	return (
		<>
			<Head>
				{!_isEmpty(propulsionPage.seo_title) &&
				<title>{propulsionPage.seo_title}</title>
				}
				{!_isEmpty(propulsionPage.seo_meta_description) &&
				<meta name={'Description'} content={RichText.asText(propulsionPage.seo_meta_description)} />
				}
			</Head>
			<MainLayout extraClasses={'propulsion-page'}>
				<CoverNarrow block={{
					image: propulsionPage.header_image,
					title: propulsionPage.header_title,
					text: propulsionPage.header_subtitle,
				}} />
				{'hybrid' in navKeys &&
					<PropulsionHybridSection
						blockIndex={navKeys.hybrid.sectionKey}
						propulsionPage={propulsionPage}
						yachtsData={yachtsData}
					/>
				}

				{'electric' in navKeys &&
					<PropulsionElectricSection
						blockIndex={navKeys.electric.sectionKey}
						propulsionPage={propulsionPage}
						yachtsData={yachtsData}
					/>
				}

				<EnjoyResponsibleBoating />

				{scrollNavLinks.length && <ScrollNav links={scrollNavLinks} />}

				<Footer />
			</MainLayout>
		</>
	);
}

function makeScrollNavLinks(propulsionPage, textLabels) {
	const keys = {};

	if (!_isEmpty(propulsionPage.hybrid_technology_title) && !_isEmpty(propulsionPage.yachts_menu)) {
		keys.hybrid = {
			sectionKey: 1,
			title: textLabels.hybrid
		};
	}

	if (!_isEmpty(propulsionPage.electric_technology_title) && !_isEmpty(propulsionPage.yachts_menu)) {
		keys.electric = {
			sectionKey: 2,
			title: textLabels.electric
		};
	}

	const scrollNavLinks = Object.keys(keys)
		.filter((key) => keys[key].title)
		.map((key) => keys[key]);

	return {
		keys,
		scrollNavLinks
	};
}

PropulsionPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	propulsionPage: propulsionPagePropType().isRequired,
	yachtsData: PropTypes.object.isRequired
};

export async function getStaticProps(context) {
	const propulsionPage = await fetchPropulsionPage(context);

	const yachtUIds = propulsionPage.yachts_menu.map(({yacht: {_meta}}) => _meta.uid);
	const yachts = await fetchAllYachtForPropulsionPage(yachtUIds, context);
	const yachtsData = {};

	yachtUIds.forEach((itemUId) => {
		const yacht = yachts.find(({_meta: {uid}}) => itemUId === uid);

		if (yacht) {
			yachtsData[itemUId] = yacht;
		}
	});

	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			propulsionPage,
			menus,
			textLabels,
			yachtsData
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}