import PropTypes from 'prop-types';
import {fullScreeSlidePropTypes, coverBlock} from './covers';

export const homePagePropType = () => PropTypes.shape({
	slider_name_in_scroll_menu: PropTypes.string.isRequired,

	group_slides: PropTypes.arrayOf(
		fullScreeSlidePropTypes()
	).isRequired,

	group_sections: PropTypes.arrayOf(
		coverBlock()
	).isRequired,

	seo_title: PropTypes.string.isRequired,
	seo_meta_description: PropTypes.string.isRequired,

	_meta: PropTypes.shape({
		id: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired
});
