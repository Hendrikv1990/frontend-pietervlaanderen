import PropTypes from 'prop-types';
import {RichText} from 'prismic-reactjs';

export default function AsText({value}) {
	let sanitizedValue = Array.isArray(value) ? value : [];

	return (
		<>{RichText.asText(sanitizedValue)}</>
	);
}

AsText.propTypes = {
	value: PropTypes.array
};