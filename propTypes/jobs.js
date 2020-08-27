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
	title1: PropTypes.array,
	country: PropTypes.array,
	description: PropTypes.array,
});