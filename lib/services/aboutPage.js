import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';
import {linkFields} from './layoutData';

export const UID = 'about';

export async function fetchAboutPage(context = {}) {
	const {about_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);
	return about_page;
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {about_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of about_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `about_page(uid: "${UID}", lang: $lang) {
	header_title,
	header_description,
	header_image,
	story_title,
	story_description,
	story_image,
	identity_title,
	identity_description,
	identity_image,
	group_values {
		icon,
		title,
		subtitle,
		description
	},
	responsible_image,
	responsible_title,
	responsible_description,
	responsible_name_in_scroll_nav,
	environment_title,
	group_environment_specifications {
		icon,
		description
	},

	comfort_title,
	comfort_sub_title,
	comfort_description,
	comfort_name_in_scroll_menu,
	comfort_cover_image,
	gravity_image,

	made_title,
	made_description,
	made_cover_image,
	group_made_icons {
		icon,
		description,
		xs_description
	},

	shipyard_title,
	shipyard_description,
	shipyard_button_title,
	shipyard_button_link {${linkFields}},
	group_shipyard_image_slides {
		image,
		title
	},

	production_title,
	group_production_blocks {
		icon,
		image_1,
		title,
		description
	},

	details_title,
	group_detail_blocks {
		icon,
		image_1,
		title,
		description
	},

	video_title,
	video,

	seo_title,
	seo_meta_description,

	_meta {
		id,
		uid,
		type
	}
}`;

export const queryAlternateLangs = `about_page(uid: "${UID}", lang: "en-us") {
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