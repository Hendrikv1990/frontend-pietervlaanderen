import Prismic from 'prismic-javascript';
import {apiEndpoint, accessToken, hrefResolver, linkResolver} from '../prismic-configuration';
import Link from 'next/link';

export const Client = (req = null) => (
	Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
);

const createClientOptions = (req = null, prismicAccessToken = null) => {
	const reqOption = req ? { req } : {};
	const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {};

	return {
		...reqOption,
		...accessTokenOption,
	};
};

export function serializeHyperlink(type, element, content, children, index) {
	return (
		<Link
			key={element.data.id}
			href={hrefResolver(element.data)}
			as={linkResolver(element.data)}
		>
			<a>{children}</a>
		</Link>
	);
}