import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'blog';

export async function fetchBlogPage(context = {}) {
	const {blog_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return blog_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {blog_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of blog_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const queryAlternateLangs = `blog_page(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		},
		lastPublicationDate
	}
}`;

export const query = `blog_page(uid: "${UID}", lang: $lang) {
	title,
	sub_title,

	seo_title,
	seo_meta_description,

	_meta {
		id,
		uid,
		type
	}
}`;