import MainLayout from '../../layouts/Main';
import Head from 'next/head';
import {fetchHomePage, fetchStaticPaths} from '../../lib/services/homePage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import {useAppData} from '../../hooks/appData';
import FullScreenSlider from '../../components/covers/FullScreenSlider';
import CoverWithBtn from '../../components/covers/CoverWithBtn';
import LowCover from '../../components/covers/LowCover';
import ScrollNav from '../../components/ScrollNav';
import ReactFullpage from '@fullpage/react-fullpage';


export default function Index({homePage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const {group_slides, group_sections, seo_title, seo_meta_description} = homePage;
	const scrollNavLinks = makeScrollNavLinks(homePage);

	return (
		<>
			<Head>
				<title>{seo_title}</title>
				<meta name={'Description'} content={seo_meta_description} />
			</Head>
			<MainLayout extraClasses={'home-page'}>
				<FullScreenSlider slides={group_slides}
													showDownArrow={true}
													blockIndex={0}
				/>

				{group_sections.map((block, i) => {
					const blockIndex = i + 1;

					if (block.block_type == 'cover with button') {
						let showDownArrow = (i < group_sections.length - 2) ? true : false;

						return (
							<CoverWithBtn key={i}
														block={block}
														showDownArrow={showDownArrow}
														blockIndex={blockIndex}
							/>
						);
					}
					// else if (block.block_type == 'low-cover') {
					// 	return (
					// 		<LowCover key={i}
					// 							block={block}
					// 							blockIndex={blockIndex}
					// 		/>
					// 	);
					// }
				})}

				<LowCover block={{title: textLabels.looking_for_a_new_boat,
					text: textLabels.looking_for_a_new_boat_subtitle,
					link: textLabels.get_in_touch_link,
					link_label: textLabels.get_in_touch_label
				}}
				/>

				<ScrollNav links={scrollNavLinks} />
			</MainLayout>
		</>
	);
}

function makeScrollNavLinks(homePage) {
	const scrollNavLinks = [
		{
			sectionKey: 0,
			title: homePage.slider_name_in_scroll_menu
		}
	];

	homePage.group_sections.forEach((block, i) => {
		if (block.name_in_scroll_menu) {
			scrollNavLinks.push({
				sectionKey: i + 1,
				title: block.name_in_scroll_menu
			});
		}
	});

	return scrollNavLinks;
}

import {textLabelsPropType} from '../../propTypes/textLabels';
import {homePagePropType} from '../../propTypes/homePage';
import {menusPropType} from '../../propTypes/menu';

Index.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	homePage: homePagePropType().isRequired,
	menus: menusPropType().isRequired
};

export async function getStaticProps(context) {
	const homePage = await fetchHomePage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			homePage,
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