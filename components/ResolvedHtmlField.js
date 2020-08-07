import {RichText} from 'prismic-reactjs';
import PropTypes from 'prop-types';
import {serializeHyperlink} from '../lib/prismicHelpers';

export default function ResolvedHtmlField({content}) {
	if (!Array.isArray(content))
		return null;

	return (<RichText
		render={content}
		serializeHyperlink={serializeHyperlink}
	/>);
}

ResolvedHtmlField.propTypes = {
	content: PropTypes.array
};