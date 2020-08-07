import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const postPropType = () => PropTypes.shape({
	title: PropTypes.array.isRequired,
	coverimage: imagePropType().isRequired,
	date: PropTypes.string.isRequired,
	short_description: PropTypes.array.isRequired,
	content: PropTypes.array.isRequired,
	_meta: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		lang: PropTypes.string.isRequired,
	}).isRequired
});

export const postsPropType = () => PropTypes.arrayOf(
	postPropType()
);