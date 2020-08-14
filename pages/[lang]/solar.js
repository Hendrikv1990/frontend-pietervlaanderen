import {useState} from 'react';
import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import {RichText} from 'prismic-reactjs';
import MainLayout from '../../layouts/Main';
import CoverNarrow from '../../components/covers/CoverNarrow';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {menusPropType} from '../../propTypes/menu';
import {solarPagePropType} from '../../propTypes/solar';
import PropTypes from 'prop-types';
import {fetchSolarPage, fetchStaticPaths} from '../../lib/services/solar';
import {fetchAllYachtForSolarPage} from '../../lib/services/yacht';
import {fetchLayoutData} from '../../lib/services/layoutData';
import EnjoyResponsibleBoating from '../../components/pages/propulsion/EnjoyResponsibleBoating';
import SolarBenefitsSlider from '../../components/pages/yacht/solar/BenefitsSlider';
import AsText from '../../components/AsText';
import clsx from 'clsx';
import {Swiper, SwiperSlide} from 'swiper/react';

export default function SolarPage({solarPage, menus, textLabels, yachtsData}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const firstYachtUId = solarPage.yachts_menu[0]?.yacht._meta.uid;
	const [activeYacht, setActiveYacht] = useState(firstYachtUId);

	return (
		<>
			<Head>
				{!_isEmpty(solarPage.seo_title) &&
				<title>{solarPage.seo_title}</title>
				}
				{!_isEmpty(solarPage.seo_meta_description) &&
				<meta name={'Description'} content={RichText.asText(solarPage.seo_meta_description)} />
				}
			</Head>
			<MainLayout extraClasses={'solar-page'}>
				<CoverNarrow block={{
					image: solarPage.header_image,
					title: solarPage.header_title,
					text: solarPage.header_subtitle,
				}} />

				<section className="section section_solar">
					<div className="container">
						{activeYacht &&
						<SolarBenefitsSlider slides={yachtsData[activeYacht].group_solar_technical_slides}
																 afterTitleInsertion={<YachtSwitcher menu={solarPage.yachts_menu}
																																		 yachtsData={yachtsData}
																																		 activeYacht={activeYacht}
																																		 setActiveYacht={setActiveYacht}
																											 />}
																 optionsTabsClasses={'tabs__tabs_switch'}
						/>
						}
					</div>
				</section>

				<EnjoyResponsibleBoating />
			</MainLayout>
		</>
	);
}

SolarPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	solarPage: solarPagePropType().isRequired,
	yachtsData: PropTypes.object.isRequired
};

function YachtSwitcher({menu, yachtsData, activeYacht, setActiveYacht}) {
	return (
		<div className="section__menu flex flex_fe_c flex_md_column flex_md_fs-fs">
			<div className="top-menu">
				<Swiper
					slidesPerView={'auto'}
					grabCursor={true}
					watchOverflow={true}
					spaceBetween={47}
					breakpoints={{
						576: {spaceBetween: 47}
					}}
				>
				{menu.map(({yacht: {_meta}}, i) => (
					<SwiperSlide key={i}>
						<div className="top-menu__item">
							<a href="#"
								 className={clsx('top-menu__link top-menu__link_gray', {active: _meta.uid === activeYacht})}
								 onClick={(e) => {e.preventDefault();setActiveYacht(_meta.uid);}}
							>
								<AsText value={yachtsData[_meta.uid].title} />
							</a>
						</div>
					</SwiperSlide>
				))}
				</Swiper>
			</div>
		</div>
	);
}

YachtSwitcher.propTypes = {
	menu: PropTypes.array.isRequired,
	yachtsData: PropTypes.object.isRequired,
	activeYacht: PropTypes.string,
	setActiveYacht: PropTypes.func.isRequired
};

export async function getStaticProps(context) {
	const solarPage = await fetchSolarPage(context);

	const yachtUIds = solarPage.yachts_menu.map(({yacht: {_meta}}) => _meta.uid);
	const yachts = await fetchAllYachtForSolarPage(yachtUIds, context);
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
			solarPage,
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