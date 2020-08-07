import PropTypes from 'prop-types';
import {imagePropType, linkPropType} from './common';

export const fullScreeSlidePropTypes = () => PropTypes.shape({
	image: imagePropType().isRequired,
	title: PropTypes.array,
	link: linkPropType(),
	link_label: PropTypes.array,
	__typename: PropTypes.string.isRequired,
});

export const coverBlock = () => PropTypes.shape({
	image: imagePropType(),
	title: PropTypes.array,
	text: PropTypes.array,
	link: linkPropType(),
	link_label: PropTypes.array,
	block_type: PropTypes.string,
	name_in_scroll_menu: PropTypes.string
});