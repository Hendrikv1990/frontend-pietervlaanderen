import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';
import {queryHowToApply} from './jobsPage';

export async function fetchJobPositionPage(jobUid, context = null) {
	const {job_position_page, jobs_page} = await fetchGql(
		gql(`query ($jobUid: String!, $lang: String!) {
			${queryPositionPage},
			${queryHowToApply}
		}`),
		{
			jobUid
		},
		context
	);

	return Object.assign(job_position_page, jobs_page);
}

export async function fetchStaticPaths() {
	const {allJob_position_pages: {edges}} = await fetchGql(gql(`query {${queryAllAvailablePages}}`));

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

export const queryPositionPage = `job_position_page(uid: $jobUid, lang: $lang) {
	title,
	country,
	short_description,
	full_description,
	seo_title,
	seo_meta_description
}`;

export const queryAllAvailablePages = `allJob_position_pages {
	edges {
		node {
			_meta {
				uid,
				lang
			}
		}
	}
}`;