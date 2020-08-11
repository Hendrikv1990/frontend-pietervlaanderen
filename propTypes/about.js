import PropTypes from 'prop-types';
import {imagePropType, linkPropType} from './common';


export const aboutPagePropType = () => PropTypes.shape({
	header_title: PropTypes.array,
	header_description: PropTypes.array,
	header_image: imagePropType(),
	story_title: PropTypes.array,
	story_description: PropTypes.array,
	story_image: PropTypes.shape({
		url: PropTypes.string,
		md: PropTypes.shape({
			url: PropTypes.string,
		}),
		xs: PropTypes.shape({
			url: PropTypes.string,
		}),
	}),
	identity_title: PropTypes.array,
	identity_description: PropTypes.array,
	identity_image: PropTypes.object,
	group_values: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.object,
			title: PropTypes.array,
			subtitle: PropTypes.array,
			description: PropTypes.array,
		})
	),
	responsible_image: imagePropType(),
	responsible_title: PropTypes.array,
	responsible_description: PropTypes.array,
	responsible_name_in_scroll_nav: PropTypes.string,
	environment_title: PropTypes.array,
	group_environment_specifications: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.object,
			description: PropTypes.array
		})
	),

	comfort_title: PropTypes.array,
	comfort_sub_title: PropTypes.array,
	comfort_description: PropTypes.array,
	comfort_name_in_scroll_menu: PropTypes.string,
	comfort_cover_image: imagePropType(),
	gravity_image: imagePropType(),

	made_title: PropTypes.array,
	made_description: PropTypes.array,
	made_cover_image: imagePropType(),
	group_made_icons: PropTypes.arrayOf(
		PropTypes.shape({
			icon: imagePropType(),
			description: PropTypes.array,
			xs_description: PropTypes.array
		})
	),

	shipyard_title: PropTypes.array,
	shipyard_description: PropTypes.array,
	shipyard_button_title: PropTypes.array,
	shipyard_button_link: linkPropType(),
	group_shipyard_image_slides: PropTypes.arrayOf(
		PropTypes.shape({
			image: imagePropType(),
			title: PropTypes.array
		})
	),

	production_title: PropTypes.array,
	group_production_blocks: PropTypes.arrayOf(
		PropTypes.shape({
			icon: imagePropType(),
			image_1: imagePropType(),
			title: PropTypes.array,
			description: PropTypes.array,
		})
	),

	details_title: PropTypes.array,
	group_detail_blocks: PropTypes.arrayOf(
		PropTypes.shape({
			icon: imagePropType(),
			image_1: imagePropType(),
			title: PropTypes.array,
			description: PropTypes.array,
		})
	),

	video_title: PropTypes.array,
	video: PropTypes.array,

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.array,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});