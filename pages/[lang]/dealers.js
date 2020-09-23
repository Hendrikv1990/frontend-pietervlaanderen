import {textLabelsPropType} from '../../propTypes/textLabels';
import {menusPropType} from '../../propTypes/menu';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import {RichText} from 'prismic-reactjs';
import {dealersPagePropType} from '../../propTypes/dealers';
import MainLayout from '../../layouts/Main';
import {fetchDealersPage, fetchStaticPaths} from '../../lib/services/dealers';
import {fetchLayoutData} from '../../lib/services/layoutData';
import {useAppData} from '../../hooks/appData';
import PropTypes from 'prop-types';
import DealersMapSection from '../../components/pages/dealers/MapSection';
import _trim from 'lodash/trim';
import _uniq from 'lodash/uniq';
import AsText from '../../components/AsText';
import Footer from '../../components/Footer';


export default function DealersPage({dealersPage, dealersTree, textLabels, menus}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const countries = _uniq(dealersPage.dealers.map(({country}) => _trim(String(country))));

	return (
		<>
			<Head>
				{!_isEmpty(dealersPage.seo_title) &&
				<title>{dealersPage.seo_title}</title>
				}
				{!_isEmpty(dealersPage.seo_meta_description) &&
				<meta name={'Description'} content={RichText.asText(dealersPage.seo_meta_description)} />
				}
			</Head>
			<MainLayout isWhite={true} topLineExtraClasses={'top-line_map'}>
				<section className="cover cover_narrow_sm show_md">
					<div className="cover__wrapper">
						<div className="cover__content">
							<div className="container flex flex_column flex_c_c">
								<h2 className="cover__title cover__title_dark">
									<AsText value={dealersPage.mobile_header} />
								</h2>
								<div className="cover__subtitle cover__subtitle_dark cover__subtitle_roundhand">
									{dealersPage.preset_in_countries.replace('{number}', countries.length)}
								</div>
							</div>
						</div>
					</div>
				</section>
				<DealersMapSection dealersTree={dealersTree}
													 dealersPage={dealersPage}
				/>

				<Footer />
			</MainLayout>
		</>
	);
}

DealersPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	dealersPage: dealersPagePropType().isRequired,
	dealersTree: PropTypes.array.isRequired
};

export async function getStaticProps(context) {
	const {dealersPage, dealersTree} = await fetchDealersPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			menus,
			textLabels,
			dealersPage,
			dealersTree
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}