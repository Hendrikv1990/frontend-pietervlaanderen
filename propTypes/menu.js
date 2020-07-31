import PropTypes from 'prop-types';
import {linkPropType} from './common';

export const menuPropType = () => PropTypes.shape({
	menu_links: PropTypes.arrayOf(PropTypes.shape({
		icon: PropTypes.object,
		label: PropTypes.array,
		link: linkPropType()
	})).isRequired,
	_meta: PropTypes.shape({
		id: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired
	}).isRequired
});

export const menusPropType = () => PropTypes.shape({
	'secondary-menu': menuPropType().isRequired,
	'social-menu': menuPropType().isRequired,
	'main-menu': menuPropType().isRequired
});

