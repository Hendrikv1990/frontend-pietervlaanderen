import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';

export async function fetchAllPostsRelatedToYacht(yachtId, context = null) {
	const {allPosts} = await fetchGql(
		gql(`query ($yachtId: String!, $lang: String!) {
			${queryAllPostsRelatedToYacht}
		}`),
		{
			yachtId
		},
		context
	);

	return preparePosts(allPosts);
}

export const queryAllPostsRelatedToYacht = `
allPosts(where: {related_yachts: $yachtId}, lang: $lang, sortBy: date_DESC) {
	edges {
		node {
			title,
			coverimage,
			date,
			short_description,
			content,
			_meta {
				uid,
				lang
			}
		}
	}
}`;

export function preparePosts(allPosts) {
	return allPosts.edges.map(({node}) => node);
}