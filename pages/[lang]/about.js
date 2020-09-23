import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import {RichText} from 'prismic-reactjs';
import MainLayout from '../../layouts/Main';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {menusPropType} from '../../propTypes/menu';
import {fetchAboutPage, fetchStaticPaths} from '../../lib/services/aboutPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import {aboutPagePropType} from '../../propTypes/about';
import CoverWithCenteredText from '../../components/covers/CoverWithCenteredText';
import StoryTimeline from '../../components/pages/about/Timeline';
import AboutOurIdentity from '../../components/pages/about/OurIdentity';
import EnvironmentBenefits from '../../components/pages/about/EnvironmentBenefits';
import AboutComfortSection from '../../components/pages/about/AboutComfort';
import MotherlandSection from '../../components/pages/about/MotherlandSection';
import OpenShipyard from '../../components/pages/about/OpenShipyard';
import MosaicSection from '../../components/sections/MosaicSection';
import VideosSection from '../../components/sections/Videos';
import LowCover from '../../components/covers/LowCover';
import ScrollNav from '../../components/ScrollNav';
import Footer from '../../components/Footer';

export default function AboutPage({aboutPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const {keys: navKeys, scrollNavLinks} = makeScrollNavLinks(aboutPage, textLabels);

	return (
		<>
			<Head>
				{!_isEmpty(aboutPage.seo_title) &&
				<title>{aboutPage.seo_title}</title>
				}
				{!_isEmpty(aboutPage.seo_meta_description) &&
				<meta name={'Description'} content={aboutPage.seo_meta_description} />
				}
			</Head>
			<MainLayout>
				{'ourDream' in navKeys &&
					<CoverWithCenteredText blockIndex={navKeys.ourDream.sectionKey}
																 block={{
																		image: aboutPage.header_image,
																		title: aboutPage.header_title,
																		text: aboutPage.header_description
																	}}
					/>}

				{'timeline' in navKeys &&
					<StoryTimeline aboutPage={aboutPage}
												 blockIndex={navKeys.timeline.sectionKey}
					/>}

				{'ourIdentity' in navKeys &&
					<AboutOurIdentity aboutPage={aboutPage}
														blockIndex={navKeys.ourIdentity.sectionKey}

					/>}

				{'ourResponsibility' in navKeys &&
					<CoverWithCenteredText blockIndex={navKeys.ourResponsibility.sectionKey}
																 block={{
																	 image: aboutPage.responsible_image,
																	 title: aboutPage.responsible_title,
																	 text: aboutPage.responsible_description
																 }}
					/>}

				{'environments' in navKeys &&
					<EnvironmentBenefits blockIndex={navKeys.environments.sectionKey}
															 aboutPage={aboutPage}

					/>}

				{'comfort' in navKeys &&
					<AboutComfortSection blockIndex={navKeys.comfort.sectionKey}
															 aboutPage={aboutPage}
					/>
				}

				{'motherland' in navKeys &&
					<MotherlandSection blockIndex={navKeys.motherland.sectionKey}
														 aboutPage={aboutPage}
					/>
				}

				{'openShipyard' in navKeys &&
					<OpenShipyard blockIndex={navKeys.openShipyard.sectionKey}
												aboutPage={aboutPage}
					/>
				}

				{'production' in navKeys &&
					<MosaicSection blockIndex={navKeys.production.sectionKey}
												 listNumber={'01'}
												 title={aboutPage.production_title}
												 grid={aboutPage.group_production_blocks}
					/>
				}

				{'details' in navKeys &&
					<MosaicSection blockIndex={navKeys.details.sectionKey}
												 listNumber={'02'}
												 title={aboutPage.details_title}
												 grid={aboutPage.group_detail_blocks}
					/>
				}

				{'video' in navKeys &&
					<VideosSection blockIndex={navKeys.details.sectionKey}
												 title={aboutPage.video_title}
												 video={aboutPage.video}
					/>
				}

				<LowCover block={{title: textLabels.looking_for_a_new_boat,
													text: textLabels.looking_for_a_new_boat_subtitle,
													link: textLabels.get_in_touch_link,
													link_label: textLabels.get_in_touch_label
												}}
				/>

				{scrollNavLinks.length && <ScrollNav links={scrollNavLinks} />}

				<Footer />
			</MainLayout>
		</>
	);
}

function makeScrollNavLinks(aboutPage, textLabels) {
	const keys = {};

	console.log(textLabels);

	if (!_isEmpty(aboutPage.header_title) && !_isEmpty(aboutPage.header_image)) {
		keys.ourDream = {
			sectionKey: 1,
			title: textLabels.our_dream_nav_label
		};
	}

	if (!_isEmpty(aboutPage.story_title) && !_isEmpty(aboutPage.story_image)) {
		keys.timeline = {
			sectionKey: 2,
			title: textLabels.timeline
		};
	}

	if (!_isEmpty(aboutPage.identity_title) && !_isEmpty(aboutPage.group_values)) {
		keys.ourIdentity = {
			sectionKey: 3,
			title: textLabels.identity_title_nav_label
		};
	}

	if (!_isEmpty(aboutPage.responsible_image) && !_isEmpty(aboutPage.responsible_title)) {
		keys.ourResponsibility = {
			sectionKey: 4,
			title: textLabels.responsible_title_nav_label || RichText.asText(aboutPage.responsible_title)
		};
	}

	if (!_isEmpty(aboutPage.environment_title) && !_isEmpty(aboutPage.group_environment_specifications)) {
		keys.environments = {
			sectionKey: 5,
			title: textLabels.responsible_title_nav_label
		};
	}

	if (!_isEmpty(aboutPage.comfort_title) && !_isEmpty(aboutPage.comfort_cover_image)) {
		keys.comfort = {
			sectionKey: 6,
			title: textLabels.comfort_title_nav_label || RichText.asText(aboutPage.comfort_title)
		};
	}

	if (!_isEmpty(aboutPage.made_cover_image) && !_isEmpty(aboutPage.made_title)) {
		keys.motherland = {
			sectionKey: 7,
			title: textLabels.made_in_nav_label
		};
	}

	if (!_isEmpty(aboutPage.shipyard_title) && !_isEmpty(aboutPage.group_shipyard_image_slides)) {
		keys.openShipyard = {
			sectionKey: null,
			title: null
		};
	}

	if (!_isEmpty(aboutPage.production_title) && !_isEmpty(aboutPage.group_production_blocks)) {
		keys.production = {
			sectionKey: null,
			title: null
		};
	}

	if (!_isEmpty(aboutPage.details_title) && !_isEmpty(aboutPage.group_detail_blocks)) {
		keys.details = {
			sectionKey: null,
			title: null
		};
	}

	if (!_isEmpty(aboutPage.video_title) && !_isEmpty(aboutPage.video)) {
		keys.video = {
			sectionKey: null,
			title: null
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

AboutPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	aboutPage: aboutPagePropType().isRequired,
};

export async function getStaticProps(context) {
	const aboutPage = await fetchAboutPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			aboutPage,
			menus,
			textLabels
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}