import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';

const UID = 'propulsion';

export async function fetchPropulsionPage(context = {}) {
	const {propulsion} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);

	return propulsion;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {propulsion} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of propulsion._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `propulsion(uid: "${UID}", lang: $lang) {
	header_title,
	header_subtitle,
	header_image,
	quote_title,
	quote_body,
	how_it_works_video,
	hybrid_technology_title,
	hybrid_technology_body,
	electric_technology_title,
	electric_technology_body,
	customised_proposal,
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

export const queryAlternateLangs = `propulsion(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		}
	}
}`;