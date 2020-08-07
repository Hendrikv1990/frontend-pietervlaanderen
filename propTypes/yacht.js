import PropTypes from 'prop-types';
import {imagePropType, reviewPropType, linkPropType, technicalCaptionIconType} from './common';

export const yachtPagePropType = () => PropTypes.shape({
	title: PropTypes.array.isRequired,
	hero_promo: PropTypes.array.isRequired,
	hero_image: imagePropType().isRequired,
	technical_specs_title: PropTypes.array,
	technical_specs_image: imagePropType(),
	technical_specs_button_link: linkPropType(),
	technical_specs_button_link_label: PropTypes.array,
	technical_specs_slider_title: PropTypes.array,
	group_technical_specs_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: imagePropType().isRequired,
			title: PropTypes.array.isRequired
		})
	),
	group_technical_specs_perspective_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: imagePropType().isRequired,
			option: PropTypes.array.isRequired
		})
	),
	dimensions_specs: PropTypes.arrayOf(
		PropTypes.shape({
			dimensions_characteristic_title: PropTypes.string,
			dimensions_imperial_value: PropTypes.string,
			dimensions_metric_value: PropTypes.string
		})
	),
	accommodation_spec: PropTypes.arrayOf(
		PropTypes.shape({
			accommodation_characteristic_title: PropTypes.string,
			accommodation_imperial_value: PropTypes.string,
			accommodation_metric_value: PropTypes.string
		})
	),
	tanks_spec: PropTypes.arrayOf(
		PropTypes.shape({
			tank_characteristic_title: PropTypes.string,
			tank_imperial_value: PropTypes.string,
			tank_metric_value: PropTypes.string
		})
	),
	propulsion_title: PropTypes.array,
	propulsion_image: imagePropType(),
	propulsion_button_link: linkPropType(),
	propulsion_button_link_label: PropTypes.array,
	solar_title: PropTypes.array.isRequired,
	solar_image: imagePropType().isRequired,
	solar_button_link: linkPropType(),
	solar_button_link_label: PropTypes.array,
	interior_title: PropTypes.array.isRequired,
	interior_image: imagePropType().isRequired,
	interior_button_link: linkPropType(),
	interior_button_link_label: PropTypes.array,
	exterior_title: PropTypes.array.isRequired,
	exterior_image: imagePropType().isRequired,
	exterior_button_link: linkPropType(),
	exterior_button_link_label: PropTypes.array,
	virtual_tour_title: PropTypes.array,
	virtual_tour_image: imagePropType(),
	virtual_button_link: linkPropType(),
	virtual_button_link_label: PropTypes.array,
	virtual_tour_360_imgs: PropTypes.arrayOf(
		PropTypes.shape({
			virtual_tour_360_img: imagePropType().isRequired,
			virtual_tour_360_img_title: PropTypes.array.isRequired,
			virtual_tour_360_img_labels: PropTypes.array
		})
	),
	group_review_slide: PropTypes.arrayOf(
		reviewPropType()
	),
	group_videos: PropTypes.array,
	video_mobile_promo_header: PropTypes.array,
	video_mobile_promo_sub: PropTypes.array,
	press_tests_group: PropTypes.arrayOf(
		PropTypes.shape({
			press_test_title: PropTypes.array,
			press_test_img: imagePropType(),
			press_test_date: PropTypes.string,
			press_test_announce: PropTypes.array,
			press_test_link: linkPropType()
		})
	),

	propulsion_quote_title: PropTypes.array,
	propulsion_quote_body: PropTypes.array,
	group_engine_technical_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: imagePropType(),
			title: PropTypes.array,
			description: PropTypes.array,
			manufacture_logo: PropTypes.shape({
				url: PropTypes.string,
			})
		})
	),

	hybrid_title: PropTypes.array,
	hybrid_description: PropTypes.array,
	propulsion_how_it_works_video: PropTypes.array,
	group_hybrid_technical_slides: PropTypes.arrayOf(
		propulsionTechSlidePropType()
	),
	electric_title: PropTypes.array,
	electric_description: PropTypes.array,
	group_electric_technical_slides: PropTypes.arrayOf(
		propulsionTechSlidePropType()
	),
	propulsion_customised_proposal: PropTypes.array,
	group_solar_technical_slides: PropTypes.arrayOf(
		solarTechSlidePropType()
	),
	interior_gallery_title: PropTypes.array,
	interior_gallery_description: PropTypes.array,
	group_interior_image_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.object,
			title: PropTypes.array
		})
	),
	group_interior_feature_image_blocks: PropTypes.arrayOf(
		listGallerySlidePropType()
	),
	exterior_gallery_title: PropTypes.array,
	group_exterior_image_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.object,
			title: PropTypes.array
		})
	),
	group_exterior_feature_image_blocks: PropTypes.arrayOf(
		listGallerySlidePropType()
	)
});

export const listGallerySlidePropType = () => PropTypes.shape({
	icon: imagePropType(),
	image: PropTypes.shape({
		alt: PropTypes.string,
		url: PropTypes.string,
		gallery: PropTypes.shape({
			url: PropTypes.string,
			alt: PropTypes.string
		}),
		preview: PropTypes.shape({
			url: PropTypes.string,
			alt: PropTypes.string
		}),
	}),
	title: PropTypes.array,
	caption: PropTypes.array,
});

export const solarTechSlidePropType = () => PropTypes.shape({
	image: imagePropType(),
	option: PropTypes.array,
	title: PropTypes.array,
	description: PropTypes.array,
	caption_1: technicalCaptionIconType(),
	subtitle_1: PropTypes.array,
	description_1: PropTypes.array,
	caption_2: technicalCaptionIconType(),
	subtitle_2: PropTypes.array,
	description_2: PropTypes.array,
	caption_3: technicalCaptionIconType(),
	subtitle_3: PropTypes.array,
	description_3: PropTypes.array,
	caption_4: technicalCaptionIconType(),
	subtitle_4: PropTypes.array,
	description_4: PropTypes.array,
});

export const propulsionTechSlidePropType = () => PropTypes.shape({
	image: imagePropType(),
	title: PropTypes.array,
	caption_1: technicalCaptionIconType(),
	subtitle_1: PropTypes.array,
	description_1: PropTypes.array,
	caption_2: technicalCaptionIconType(),
	subtitle_2: PropTypes.array,
	description_2: PropTypes.array,
	caption_3: technicalCaptionIconType(),
	subtitle_3: PropTypes.array,
	description_3: PropTypes.array,
});