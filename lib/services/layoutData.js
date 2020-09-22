import _omit from 'lodash/omit';
import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';

export async function fetchLayoutData(context = null) {
	const {allMenus} = await fetchGql(
		gql(`query ($lang: String!) {${allMenusQuery}}`),
		{},
		context
	);

	const {textlabel} = await fetchGql(
		gql(`query ($lang: String!) {
			${textLabel1Query}
		}`),
		{},
		context
	);

	const {textlabel: textlabel2} = await fetchGql(
		gql(`query ($lang: String!) {
			${textLabel2Query}
		}`),
		{},
		context
	);

	Object.assign(textlabel, textlabel2);

	return {
		menus: prepareMenus(allMenus),
		textLabels: prepareTextLabels(textlabel)
	};
}

export const linkFields = `
__typename,
_linkType,

...on _FileLink{
	name,
	url,
	size
},

...on Charters_page {
	_meta {
		uid,
		lang
	}
},

...on Yacht {
	_meta {
		uid,
		lang
	}
},

...on About_page {
	_meta {
		uid,
		lang
	}
},

...on Home_page {
	_meta {
		uid,
		lang
	}
},

...on Contact_page {
	_meta {
		uid,
		lang
	}
},

...on Propulsion {
	_meta {
		uid,
		lang
	}
},

...on Solar_page {
	_meta {
		uid,
		lang
	}
},

...on Dealers_page {
	_meta {
		uid,
		lang
	}
},

...on Jobs_page {
	_meta {
		uid,
		lang
	}
},

...on Blog_page {
	_meta {
		uid,
		lang
	}
},

...on Blog_post {
	_meta {
		uid,
		lang
	}
},

...on Job_position_page {
	_meta {
		uid,
		lang
	}
},

...on _ExternalLink {
	url
}`;

export const allMenusQuery = `allMenus(lang: $lang) {
  edges {
    node {
      menu_links {
        icon,
        label,
        link {
           ${linkFields}
        }
      },

      _meta {
				id,
        uid,
        type
      }
    }
  }
}`;

export const textLabel1Query = `
textlabel(uid: "text-labels", lang: $lang) {
	address,
	address_label,
	all_our_models_available_as,
	footer_contacts_header,
	footer_contacts_text,
	send_message,
	send_a_message_link {
		${linkFields}
	},
	find_your_distributor,
	find_distributor_link {
		${linkFields}
	},
	contact,
	address_with_phone,
	phone_label,
	phone,
	other_contacts,
	other_contacts_link {
		${linkFields}
	},
	copyright,
	terms_of_use_label,
	terms_of_use_link {
		${linkFields}
	},
	privacy_label,
	privacy_link {
		${linkFields}
	},
	models_label,
	download_brochure_label,
	download_brochure_link {
		${linkFields}
	},
	discover_more_label,
	discover_label,
	videos_label,
	get_in_touch_label,
	get_in_touch_link {
		${linkFields}
	},
	press_tests_label,
	read_more_label,
	reviews_label,
	imperial_label,
	metric_label,
	check_propulsion_option_label
}
`;

export const textLabel2Query = `textlabel(uid: "text-labels", lang: $lang) {
	how_can_we_help,
	interested_in_a_new_boat,
	looking_for_assistance,
	i_m_a_greenline_owner,
	meet_the_team,
	main_office,
	submit,
	stay_up_to_date,
	name,
	email,
	i_agree_with,
	subscribe,
	what_is_your_name,
	what_is_your_email_address,
	what_is_your_phone_number,
	whats_your_country_of_residence,
	how_can_we_help_you,
	which_model_suits_you_best,
	back,
	next,
	hint_about_your_location,
	what_is_your_navigation_area,
	little_bit_about_you,
	your_message,
	message_was_sent,
	send_message_to,
	added_to_newsletter,
	timeline,
	our_dream_nav_label,
	identity_title_nav_label,
  responsible_title_nav_label,
  comfort_title_nav_label,
  made_in_nav_label,
	looking_for_a_new_boat,
	looking_for_a_new_boat_subtitle,
	close,
	hybrid,
	electric,
	enjoy_responsible_boating,
	solar,
	cancel,
	load_more,
	previous_article,
	next_article,
	apply,
	cv,
	how_it_works_watch_video,
	in_partnership_with,
	contact_us_label,
	contact_us_link {
		${linkFields}
	},
	details_label,
	gdpr_checkbox
}`;

export function prepareMenus(allMenus) {
	const menus = {};

	for (const {node} of allMenus.edges) {
		menus[node._meta.uid] = {
			menu_links: node.menu_links,
			_meta: node._meta
		};
	}

	return menus;
}

export function prepareTextLabels(textLabels) {
	return _omit(textLabels, ['__typename']);
}