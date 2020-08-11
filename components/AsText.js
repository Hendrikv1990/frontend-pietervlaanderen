import PropTypes from 'prop-types';
import {RichText} from 'prismic-reactjs';
import _isString from 'lodash/isString';

export default function AsText({value}) {
	if (_isString(value))
		return (<>{value}</>);

	let sanitizedValue = Array.isArray(value) ? value : [];

	return (
		<>{RichText.asText(sanitizedValue)}</>
	);
}

AsText.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.array, PropTypes.string
	])
};