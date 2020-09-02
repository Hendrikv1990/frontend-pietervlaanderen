import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'jobs';

export async function fetchJobsPage(context = {}) {
	const {jobs_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return jobs_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {jobs_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of jobs_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `jobs_page(uid: "${UID}", lang: $lang) {
	title,
	sub_title,
	header_image,
	positions {
		position {
			...on Job_position_page {
				title,
				country,
				short_description,
				_meta {
					uid
				}
			}
		}
	},
	seo_title,
	seo_meta_description,

	_meta {
		id,
		uid,
		type
	}
}`;

export const queryAlternateLangs = `jobs_page(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		}
	}
}`;

export const queryHowToApply = `jobs_page(uid: "${UID}", lang: $lang) {
	how_to_apply,
	apply_instructions
}`;