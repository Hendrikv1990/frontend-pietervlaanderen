import PropTypes from 'prop-types';

export const contactsPagePropType = () => PropTypes.shape({
	team: PropTypes.arrayOf(
		contactTeamPropType()
	),
	models: PropTypes.arrayOf(
		contactModelsPropType()
	),

	seo_title: PropTypes.array,
	seo_meta_description: PropTypes.array,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});

export const contactModelsPropType = () => PropTypes.shape({
	image: PropTypes.shape({
		url: PropTypes.string,
		alt: PropTypes.string,
		small: PropTypes.shape({
			url: PropTypes.string,
		})
	}),
	title: PropTypes.array
});

export const contactTeamPropType = () => PropTypes.shape({
	photo: PropTypes.shape({
		alt: PropTypes.string,
		url: PropTypes.string,
		small: PropTypes.shape({
			url: PropTypes.string,
		}),
	}),
	role: PropTypes.string,
	name: PropTypes.string,
	phone: PropTypes.string,
	position_in_list: PropTypes.string,
});