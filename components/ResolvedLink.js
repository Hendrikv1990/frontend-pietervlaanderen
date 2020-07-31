import {linkResolver, hrefResolver} from '../prismic-configuration';
import PropTypes from 'prop-types';
import {linkPropType} from '../propTypes/common';
import NextLink from 'next/link';

export default function ResolvedLink(props) {
	const {link, aAttrs, children} = props;

	const defaultLink = <a href="#" {...aAttrs}>{children}</a>;
	if (!link)
		return defaultLink

	switch (link._linkType) {
		case 'Link.document':
			return LinkDocument(props);

		case 'Link.web':
			return (
				<a href={link.url} {...aAttrs} target={'_blank'} rel={'noreferrer'}>
					{children}
				</a>
			);

		case 'Link.image':
			return (
				<a href={link.url} {...aAttrs}>
					{children}
				</a>
			);

		default:
			return defaultLink;
	}
}

export function LinkDocument({link, children, aAttrs}) {
	return (
		<NextLink as={linkResolver(link)} href={hrefResolver(link)}>
			<a {...aAttrs}>{children}</a>
		</NextLink>
	);
}

const componentPropTypes = {
	children: PropTypes.node.isRequired,
	link: linkPropType().isRequired,
	aAttrs: PropTypes.object
};
ResolvedLink.propTypes = componentPropTypes;
LinkDocument.propTypes = componentPropTypes;