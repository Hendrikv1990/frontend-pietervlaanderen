import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'data-protection-policy';

export async function fetchDataProtectionPolicyPage(context = {}) {
	const {data_protection_policy} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return data_protection_policy;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {data_protection_policy} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of data_protection_policy._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `data_protection_policy(uid: "${UID}", lang: $lang) {
	title,
	subtitle,
	full_description,
	seo_title,
	seo_description,
	_meta {
		id,
		uid,
		type
	}
}`;


export const queryAlternateLangs = `data_protection_policy(uid: "${UID}", lang: "en-us") {
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