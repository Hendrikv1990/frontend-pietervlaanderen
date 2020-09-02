import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const jobsPagePropType = () => PropTypes.shape({
	title: PropTypes.array,
	sub_title: PropTypes.array,
	header_image: imagePropType(),

	positions: PropTypes.arrayOf(
		jobPositionPropType()
	),

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});

export const jobPositionPropType = () => PropTypes.shape({
	title: PropTypes.array,
	country: PropTypes.array,
	short_description: PropTypes.array,
	full_description: PropTypes.array,
	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,
	how_to_apply: PropTypes.array,
	apply_instructions: PropTypes.array,
});