import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export async function fetchAllBlogPosts(context = null) {
	const {allBlog_posts} = await fetchGql(
		gql(`query ($lang: String!) {
			${queryAllBlogPosts}
		}`),
		{},
		context
	);

	return preparePosts(allBlog_posts);
}

export async function fetchBlogPostByUID(blogUID, context = null) {
	const {blog_post} = await fetchGql(
		gql(`query ($lang: String!, $blogUID: String!) {
			${queryBlogPostByUID}
		}`),
		{
			blogUID
		},
		context
	);

	return blog_post;
}

export async function fetchStaticPaths() {
	const {allBlog_posts: {edges}} = await fetchGql(gql(`query {${queryAllAvailablePosts}}`));

	const paths = [];
	for (const {node} of edges) {
		paths.push({
			params: {
				lang: getLocaleByPrismic(node._meta.lang),
				slug: node._meta.uid
			}
		});
	}

	return paths;
}

export const queryBlogPostByUID = `blog_post(uid: $blogUID, lang: $lang) {
	title,
	image,
	date,
	short_text,
	full_text,
	seo_title,
	seo_meta_description,
	_meta {
		uid,
		lang
	}
}`;

export const queryAllAvailablePosts = `allBlog_posts {
	edges {
		node {
			_meta {
				uid,
				lang,
				lastPublicationDate
			}
		}
	}
}`;

export const queryAllBlogPosts = `allBlog_posts(lang: $lang, sortBy: date_DESC) {
	edges {
		node {
			title,
			image,
			date,
			short_text,
			full_text,
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