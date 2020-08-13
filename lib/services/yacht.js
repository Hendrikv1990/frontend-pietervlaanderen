import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';
import {
	prepareMenus,
	prepareTextLabels,
	query as layoutDataQuery,
	linkFields
} from './layoutData';

export async function fetchStaticPaths() {
	const {allYachts: {edges}} = await fetchGql(gql(`query {${queryAllAvailablePages}}`));

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

//due to the limitation this request doesnt work
export async function fetchYachtPageWithLayoutData(yachtUid, context = null) {
	const {yacht, allMenus, textlabel} = await fetchGql(
		gql(`query ($yachtUid: String!, $lang: String!) {
			${queryYacht}
			${layoutDataQuery}
		}`),
		{
			yachtUid
		},
		context
	);

	return {
		yacht,
		menus: prepareMenus(allMenus),
		textLabels: prepareTextLabels(textlabel)
	};
}

export async function fetchYachtBasicInfo(yachtUid, context = null) {
	const {yacht} = await fetchGql(
		gql(`query ($yachtUid: String!, $lang: String!) {
			${queryYacht}
		}`),
		{
			yachtUid
		},
		context
	);

	return {
		yacht
	};
}

// due to limitations in request length we need to split request :(
export async function fetchYachtAdditionalInfo(yachtUid, context = null) {
	const {yacht} = await fetchGql(
		gql(`query ($yachtUid: String!, $lang: String!) {
			${queryYachtAdditions}
		}`),
		{
			yachtUid
		},
		context
	);

	return {
		yacht
	};
}

export async function fetchAllYachtForPropulsionPage(yachtUIds, context = null) {
	const {allYachts: {edges}} = await fetchGql(
		gql(`query ($yachtUIds: [String!], $lang: String!) {
			${queryAllYachtsDataForPropulsion}
		}`),
		{
			yachtUIds
		},
		context
	);

	return edges.map(({node}) => node);
}

export async function fetchAllYachtForSolarPage(yachtUIds, context = null) {
	const {allYachts: {edges}} = await fetchGql(
		gql(`query ($yachtUIds: [String!], $lang: String!) {
			${queryAllYachtsDataForSolar}
		}`),
		{
			yachtUIds
		},
		context
	);

	return edges.map(({node}) => node);
}

export const queryYacht = `yacht(uid: $yachtUid, lang: $lang) {
	title,
	hero_promo,
	hero_image,
	technical_specs_title,
	propulsion_title,
	propulsion_image,
	propulsion_button_link {${linkFields}},
	propulsion_button_link_label,
	solar_title,
	solar_image,
	solar_button_link {${linkFields}},
	solar_button_link_label,
	interior_title,
	interior_image,
	interior_button_link {${linkFields}},
	interior_button_link_label,
	exterior_title,
	exterior_image,
	exterior_button_link {${linkFields}},
	exterior_button_link_label,
	virtual_tour_title,
	virtual_tour_image,
	virtual_button_link {${linkFields}},
	virtual_button_link_label,
	virtual_tour_360_imgs {
		virtual_tour_360_img,
		virtual_tour_360_img_title,
		virtual_tour_360_img_labels
	},
	group_review_slide {
		title,
		reviewer,
		review
	},
	seo_title,
	seo_meta_description,
	group_videos {
		embed_video
	},
	video_mobile_promo_header,
	video_mobile_promo_sub,
	_meta {
		id,
		uid,
		type
	}
}`;

export const queryYachtAdditions = `yacht(uid: $yachtUid, lang: $lang) {
	technical_specs_button_link {${linkFields}},
	technical_specs_button_link_label,
	technical_specs_image,
	group_technical_specs_perspective_slides {
		image,
		option
	},
	technical_specs_slider_title,
	group_technical_specs_slides {
		image,
		title
	},
	dimensions_specs {
		dimensions_characteristic_title,
		dimensions_imperial_value,
		dimensions_metric_value
	},
	accommodation_spec {
		accommodation_characteristic_title,
		accommodation_imperial_value,
		accommodation_metric_value
	},

	tanks_spec {
		tank_characteristic_title,
		tank_imperial_value,
		tank_metric_value
	},

	press_tests_group {
		press_test_title,
		press_test_img,
		press_test_date,
		press_test_announce,
		press_test_link {${linkFields}}
	}

	propulsion_quote_title,
	propulsion_quote_body,
	group_engine_technical_slides {
		image,
		title,
		description,
		manufacture_logo {
			...on _ImageLink {
				name,
				url,
				size,
				width,
				height
			}
		}
	},
	hybrid_title,
	hybrid_description,
	propulsion_how_it_works_video,
	group_hybrid_technical_slides {
		image,
		title,
		caption_1 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		}
		subtitle_1,
		description_1,
		caption_2 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}

		},
		subtitle_2,
		description_2,
		caption_3 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		},
		subtitle_3,
		description_3
	},
	electric_title,
	electric_description,
	group_electric_technical_slides {
		image,
		title,
		caption_1 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		}
		description_1,
		caption_2 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}

		}
		description_2,
		caption_3 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		}
		description_3
	},
	propulsion_customised_proposal,
	group_solar_technical_slides {
		image,
		option,
		title,
		description,
		caption_1 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		},
		subtitle_1,
		description_1,
		caption_2 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		},
		subtitle_2,
		description_2,
		caption_3 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		},
		subtitle_3,
		description_3,
		caption_4 {
			_linkType,
			...on Technical_caption {
				icon,
				_linkType
			}
		},
		subtitle_4,
		description_4
	},
	interior_gallery_title,
	interior_gallery_description,
	group_interior_image_slides {
		image,
		title
	},
	group_interior_feature_image_blocks {
		icon,
		image,
		title,
		caption
	},
	exterior_gallery_title,
	group_exterior_image_slides {
		image,
		title
	},
	group_exterior_feature_image_blocks {
		icon,
		image,
		title,
		caption
	}
}`;

export const queryAllAvailablePages = `allYachts {
	edges {
		node {
			_meta {
				uid,
				lang
			}
		}
	}
}`;

export const queryAllYachtsDataForSolar = `allYachts (uid_in: $yachtUIds, lang: $lang) {
	edges {
		node {
			title,
			group_solar_technical_slides {
				image,
				option,
				title,
				description,
				caption_1 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_1,
				description_1,
				caption_2 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_2,
				description_2,
				caption_3 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_3,
				description_3,
				caption_4 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_4,
				description_4
			},
			_meta {
				uid,
				lang
			}
		}
	}
}`;

export const queryAllYachtsDataForPropulsion = `allYachts (uid_in: $yachtUIds, lang: $lang) {
	edges {
		node {
			title,
			group_hybrid_technical_slides {
				image,
				title,
				caption_1 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				}
				subtitle_1,
				description_1,
				caption_2 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_2,
				description_2,
				caption_3 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				},
				subtitle_3,
				description_3
			},

			group_electric_technical_slides {
				image,
				title,
				caption_1 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				}
				description_1,
				caption_2 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}

				}
				description_2,
				caption_3 {
					_linkType,
					...on Technical_caption {
						icon,
						_linkType
					}
				}
				description_3
			},

			_meta {
				uid,
				lang
			}
		}
	}
}
`;