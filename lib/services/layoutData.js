import _omit from 'lodash/omit';

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

...on _ExternalLink {
	url
}`;

export const query = `allMenus(lang: $lang) {
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
}

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
	}
}
`;

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