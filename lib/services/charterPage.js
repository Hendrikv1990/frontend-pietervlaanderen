import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'charter';

export async function fetchCharterPage(context = {}) {
	const {charters_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return charters_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {charters_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of charters_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `charters_page(uid: "${UID}", lang: $lang) {
	title,
	description,
	image,
	group_charter {
		...on Charters_pageGroup_charter {
			link {
				...on Charter {
					adress,
					phone_number,
					email,
					website,
					logo,
					country_flag,
					group_yachts {
						yacht_list,
						availability
					},
					_meta {
						id
					}
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

export const queryAlternateLangs = `charters_page(uid: "${UID}", lang: "en-us") {
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