import PropTypes from 'prop-types';

export const blogPagePropType = () => PropTypes.shape({
	title: PropTypes.array,
	sub_title: PropTypes.array,

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});