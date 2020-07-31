import {gql} from '@apollo/client';
import {fetchGql} from '../prismicHelpers';
import {
	query as layoutDataQuery,
	prepareMenus,
	prepareTextLabels,
	linkFields
} from './layoutData';
import {getLocaleByPrismic} from '../i18n';

export const UID = 'home-page';

export async function fetchHomePage(context = {}) {
	const {home_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return home_page;
}

export async function fetchHomePageWithLayoutData(context = null) {
	const {home_page, allMenus, textlabel} = await fetchGql(
		gql(`query ($lang: String!) {
			${query}
			${layoutDataQuery}
		}`),
		{},
		context
	);

	return {
		homePage: home_page,
		menus: prepareMenus(allMenus),
		textLabels: prepareTextLabels(textlabel)
	};
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {home_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of home_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `home_page(uid: "${UID}", lang: $lang) {
	slider_name_in_scroll_menu,
	group_slides {
		image,
		title,
		link {${linkFields}},
		link_label
	},

	group_sections {
		image,
		title,
		text,
		link {${linkFields}},
		link_label,
		block_type,
		name_in_scroll_menu
	},

	seo_title,
	seo_meta_description,

	_meta {
		id,
		uid,
		type
	}
}`;

export const queryAlternateLangs = `home_page(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		}
	}
}`;