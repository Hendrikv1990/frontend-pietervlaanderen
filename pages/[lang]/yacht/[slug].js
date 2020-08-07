import {
	fetchYachtPageWithLayoutData,
	fetchYachtAdditionalInfo,
	fetchStaticPaths
} from '../../../lib/services/yacht';
import {textLabelsPropType} from '../../../propTypes/textLabels';
import {yachtPagePropType} from '../../../propTypes/yacht';
import {menusPropType} from '../../../propTypes/menu';
import {useAppData} from '../../../hooks/appData';
import Head from 'next/head';
import MainLayout from '../../../layouts/Main';
import {RichText} from 'prismic-reactjs';
import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import {isRichEmpty} from '../../../lib/utils';

import YachtCover from '../../../components/covers/YachtCover';
import YachtTechnicalSpecifications from '../../../components/pages/yacht/TechnicalSpecifications';
import YachtPropulsion from '../../../components/pages/yacht/Propulsion';
import YachtPowerManagement from '../../../components/pages/yacht/PowerManagement';
import YachtInterior from '../../../components/pages/yacht/Interior';
import YachtExterior from '../../../components/pages/yacht/Exterior';
import YachtVirtualTourSection from '../../../components/pages/yacht/VirtualTourSection';
import ReviewsSlider from '../../../components/ReviewsSlider';
import YachtVideos from '../../../components/pages/yacht/Videos';
import YachtPosts from '../../../components/pages/yacht/Posts';
import ScrollNav from '../../../components/ScrollNav';

export default function YachtPage({yacht, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const {
		seo_title,
		seo_meta_description,
		title,
		hero_promo,
		hero_image
	} = yacht;

	const scrollNavLinks = makeScrollNavLinks(yacht, textLabels);

	return (
		<>
			<Head>
				{seo_title && <title>{seo_title}</title>}
				{seo_meta_description && <meta name={'Description'} content={seo_meta_description} />}
			</Head>
			<MainLayout extraClasses={'yacht-page'}>
				<YachtCover block={{
											image: hero_image,
											title: title,
											text: hero_promo,
										}}
										blockIndex={0}
										showDownArrow={true}
				/>
				{Array.isArray(yacht.technical_specs_title)
					&& yacht.technical_specs_title.length
					&& <YachtTechnicalSpecifications blockIndex={1}
																					 yacht={yacht} />
				}
				<YachtPropulsion blockIndex={2}
												 yacht={yacht}
				/>
				<YachtPowerManagement blockIndex={3}
															yacht={yacht}
				/>
				{!isRichEmpty(yacht.interior_title) &&
				<YachtInterior blockIndex={4}
											 yacht={yacht}
				/>
				}
				{!isRichEmpty(yacht.exterior_title) &&
				<YachtExterior blockIndex={5}
											 yacht={yacht}
				/>
				}
				{!isRichEmpty(yacht.virtual_tour_title) && !_isEmpty(yacht.virtual_tour_360_imgs) &&
				<YachtVirtualTourSection blockIndex={6} yacht={yacht} />
				}
				{Array.isArray(yacht.group_review_slide)
					&& yacht.group_review_slide.length
					&& <ReviewsSlider reviews={yacht.group_review_slide}
														blockIndex={7} />
				}
				{Array.isArray(yacht.press_tests_group)
					&& yacht.press_tests_group.length
					&& <YachtPosts yacht={yacht}
												 blockIndex={8} />
				}
				{isVideoExists(yacht)
				&& <YachtVideos yacht={yacht}
												blockIndex={9} />
				}
				{scrollNavLinks.length && <ScrollNav links={scrollNavLinks} />}
			</MainLayout>
		</>
	);
}

YachtPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	yacht: yachtPagePropType().isRequired
};

function makeScrollNavLinks(yacht, textLabels) {
	const scrollNavLinks = [];
	const keys = {
		technical_specs_title: 1,
		propulsion_title: 2,
		solar_title: 3,
		interior_title: 4,
		exterior_title: 5,
		virtual_tour_title: 6,
	};

	for (const key of Object.keys(keys)) {
		if (yacht[key]) {
			scrollNavLinks.push({
				sectionKey: keys[key],
				title: Array.isArray(yacht[key]) ? RichText.asText(yacht[key]) : yacht[key]
			});
		}
	}

	if (yacht.group_review_slide) {
		scrollNavLinks.push({
			sectionKey: 7,
			title: textLabels.reviews_label
		});
	}

	if (Array.isArray(yacht.press_tests_group) && yacht.press_tests_group.length) {
		scrollNavLinks.push({
			sectionKey: 8,
			title: textLabels.press_tests_label
		});
	}

	if (isVideoExists(yacht)) {
		scrollNavLinks.push({
			sectionKey: 9,
			title: textLabels.videos_label
		});
	}

	return scrollNavLinks;
}

function isVideoExists(yacht) {
	if (Array.isArray(yacht.group_videos)) {
		const existsVideo = yacht.group_videos.find((item) => Array.isArray(item.embed_video));

		return existsVideo ? true : false;
	}

	return false;
}

export async function getStaticProps(context) {
	const {yacht, menus, textLabels} = await fetchYachtPageWithLayoutData(context.params.slug, context);

	//we need to split yacht request due to the GET limits
	const {yacht: yachtAdditions} = await fetchYachtAdditionalInfo(context.params.slug, context);
	Object.assign(yacht, _omit(yachtAdditions, ['__typename']));

	return {
		props: {
			yacht,
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