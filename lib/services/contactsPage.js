import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'contacts';

export async function fetchContactsPage(context = {}) {
	const {contact_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return contact_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {contact_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of contact_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `contact_page(uid: "${UID}", lang: $lang) {
	team {
		photo,
		role,
		name,
		phone,
		position_in_list
	},

	models {
		image,
		title
	},

	seo_title,
	seo_meta_description,

	_meta {
		id,
		uid,
		type
	}
}`;

export const queryAlternateLangs = `contact_page(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		}
	}
}`;