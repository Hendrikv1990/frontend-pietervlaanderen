import PropTypes from 'prop-types';

export const linkPropType = () => PropTypes.shape({
	__typename: PropTypes.string.isRequired,
	_linkType: PropTypes.string.isRequired,
	url: PropTypes.string,
	_meta: PropTypes.shape({
		uid: PropTypes.string.isRequired,
		lang: PropTypes.string.isRequired
	})
});

export const singleImagePropType = () => PropTypes.shape({
	dimensions: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number
	}).isRequired,
	url: PropTypes.string.isRequired,
});

export const imagePropType = () => PropTypes.shape({
	dimensions: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number
	}).isRequired,
	url: PropTypes.string.isRequired,
	md: singleImagePropType(),
	sm: singleImagePropType(),
	xs: singleImagePropType()
});