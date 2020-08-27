import PropTypes from 'prop-types';

export const dealersPagePropType = () => PropTypes.shape({
	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.array,
	mobile_header: PropTypes.array,
	dealers: PropTypes.arrayOf(
		PropTypes.shape({
			continent: PropTypes.string,
			country: PropTypes.string,
			state: PropTypes.string,
			title: PropTypes.array,
			address: PropTypes.array,
			email: PropTypes.string,
			point: PropTypes.shape({
				latitude: PropTypes.number,
				longitude: PropTypes.number
			})
		})
	),
	your_country_not_in_the_list: PropTypes.array,
	preset_in_countries: PropTypes.string
});