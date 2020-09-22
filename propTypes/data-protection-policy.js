import PropTypes from 'prop-types';
import {imagePropType} from './common';

export const dataProtectionPolicyPropType = () => PropTypes.shape({
	title: PropTypes.array,
	subtitle: PropTypes.array,
	full_description: PropTypes.array,

	seo_title: PropTypes.string,
	seo_meta_description: PropTypes.string,

	_meta: PropTypes.shape({
		id: PropTypes.string,
		uid: PropTypes.string
	})
});