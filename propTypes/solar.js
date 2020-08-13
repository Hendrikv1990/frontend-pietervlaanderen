import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const solarPagePropType = () => PropTypes.shape({
	header_title: PropTypes.array,
	header_subtitle: PropTypes.array,
	header_image: imagePropType(),
	yachts_menu: PropTypes.arrayOf(
		PropTypes.shape({
			_meta: PropTypes.object
		})
	)
});