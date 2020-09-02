import Prismic from 'prismic-javascript';
import {
	apiEndpoint,
	accessToken,
	hrefResolver,
	linkResolver,
	REPOSITORY_NAME, locales
} from '../prismic-configuration';
import Link from 'next/link';
import {PrismicLink} from 'apollo-link-prismic';
import {ApolloClient, InMemoryCache} from '@apollo/client';

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
	let dataForResolver;

	if (element.data?.link_type == 'Web') {
		return (
			<a href={element.data.url}>{children}</a>
		);
	}

	if (element.data.__typename && element.data._meta) {
		dataForResolver = element.data;
	} else {
		dataForResolver = {
			__typename: element.data.type,
			_meta: {
				uid: element.data.uid,
				lang: element.data.lang
			}
		};
	}

	return (
		<Link
			key={element.data.id || index}
			href={hrefResolver(dataForResolver)}
			as={linkResolver(dataForResolver)}
		>
			<a>{children}</a>
		</Link>
	);
}

export const apolloClient = new ApolloClient({
	link: PrismicLink({
		uri: `https://${REPOSITORY_NAME}.prismic.io/graphql`,
		accessToken: accessToken,
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
		},
	}
});

export async function fetchGql(query, variables = {}, context = null) {
	const queryContext = {}, defaultVariables = {};
	if (context) {
		if (context.previewData?.ref) {
			queryContext.headers = {
				'Prismic-ref': encodeURIComponent(context.previewData.ref)
			};
		}

		if (context.params?.lang) {
			defaultVariables.lang = locales[context.params.lang].prismicLocale;
		}
	}

	variables = Object.assign(defaultVariables, variables);

	try {
		const {data} = await apolloClient.query({
			query,
			variables,
			context: queryContext
		});

		return data;
	} catch (e) {
		console.error('Error in graph QL:', getGqlString(query));

		throw e;
	}
}

function getGqlString(doc) {
	return doc.loc && doc.loc.source.body;
}