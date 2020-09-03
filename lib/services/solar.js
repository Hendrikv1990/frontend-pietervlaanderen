import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

const UID = 'solar';

export async function fetchSolarPage(context = {}) {
	const {solar_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);

	return solar_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {solar_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of solar_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `solar_page(uid: "${UID}", lang: $lang) {
	header_title,
	header_subtitle,
	header_image,
	seo_title,
	seo_meta_description,
	yachts_menu {
		yacht {
			...on Yacht {
				_meta {
					uid,
					lang
				}
			}
		}
	}
}`;

export const queryAlternateLangs = `solar_page(uid: "${UID}", lang: "en-us") {
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