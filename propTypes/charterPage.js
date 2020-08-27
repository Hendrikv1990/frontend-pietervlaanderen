import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const charterPagePropType = () => PropTypes.shape({
	title: PropTypes.array,
	description: PropTypes.array,
	image: imagePropType(),

	group_charter: PropTypes.arrayOf(
		PropTypes.shape({
			link: charterSpotPropType()
		})
	),

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});

export const charterSpotPropType = () => PropTypes.shape({
	adress: PropTypes.array,
	phone_number: PropTypes.array,
	email: PropTypes.array,
	website: PropTypes.array,
	logo: imagePropType(),
	country_flag: imagePropType(),
	group_yachts: PropTypes.arrayOf(
		PropTypes.shape({
			yacht_list: PropTypes.string,
			availability: PropTypes.number
		})
	)
});