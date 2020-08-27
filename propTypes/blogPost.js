import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const blogPostPropType = () => PropTypes.shape({
	title: PropTypes.array,
	image: imagePropType(),
	date: PropTypes.string,
	short_text: PropTypes.array,
	full_text: PropTypes.array,

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,

	_meta: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		lang: PropTypes.string.isRequired,
	}).isRequired
});

export const blogPostsPropType = () => PropTypes.arrayOf(
	blogPostPropType()
);