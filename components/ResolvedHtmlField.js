import {RichText} from 'prismic-reactjs';
import PropTypes from 'prop-types';
import {serializeHyperlink} from '../lib/prismicHelpers';

export default function ResolvedHtmlField({content}) {
	return (<RichText
		render={content}
		serializeHyperlink={serializeHyperlink}
	/>);
}

ResolvedHtmlField.propTypes = {
	content: PropTypes.array.isRequired
};