import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {getLocaleByPrismic} from '../i18n';
import _isEmpty from 'lodash/isEmpty';
import _trim from 'lodash/trim';

const UID = 'dealers';

export async function fetchDealersPage(context = {}) {
	const {dealers_page} = await fetchGql(
		gql(`query ($lang: String!) {${query}}`),
		{},
		context
	);

	const dealersTree = [];
	dealers_page.dealers.forEach((row, dealerIndex) => {
		let continentIndex = dealersTree.findIndex(
			({continentTitle}) => continentTitle.toLowerCase() === _trim(String(row.continent).toLowerCase())
		);
		if (continentIndex === -1) {
			dealersTree.push({
				continentTitle: _trim(String(row.continent)),
				countries: []
			});
			continentIndex = dealersTree.length - 1;
		}

		const continent = dealersTree[continentIndex];
		let countryIndex = continent.countries.findIndex(
			({countryTitle}) => countryTitle.toLowerCase() === _trim(String(row.country).toLowerCase())
		);
		if (countryIndex === -1) {
			continent.countries.push({
				countryTitle: _trim(String(row.country)),
				hasStates: false
			});
			countryIndex = continent.countries.length - 1;
		}

		const country = continent.countries[countryIndex];
		let offices;
		if (!_isEmpty(row.state) && _trim(row.state) !== '') {
			country.hasStates = true;
			if (!country.states)
				country.states = [];

			let stateIndex = country.states.findIndex(
				({stateTitle}) => stateTitle.toLowerCase() === _trim(String(row.state))
			);
			if (stateIndex === -1) {
				country.states.push({
					stateTitle: _trim(String(row.state)),
					offices: []
				});
				stateIndex = country.states.length - 1;
			}

			offices = country.states[stateIndex].offices;
		} else {
			if (!country.offices)
				country.offices = [];

			offices = country.offices;
		}

		offices.push({
			title: row.title,
			address: row.address,
			email: row.email,
			dealerIndex
		});
	});

	return {
		dealersPage: dealers_page,
		dealersTree: dealersTree
	};
}

export async function fetchStaticPaths() {
	const paths = [{params: {lang: 'en'}}];
	const {dealers_page} = await fetchGql(gql(`query {${queryAlternateLangs}}`));

	for (const row of dealers_page._meta.alternateLanguages) {
		paths.push({
			params: {lang: getLocaleByPrismic(row.lang)}
		});
	}

	return paths;
}

export const query = `dealers_page(uid: "${UID}", lang: $lang) {
	dealers {
		continent,
		country,
		state,
		title,
		address,
		email,
		point
	},
	mobile_header,
	your_country_not_in_the_list,
	preset_in_countries,
	seo_title,
	seo_meta_description
}`;

export const queryAlternateLangs = `dealers_page(uid: "${UID}", lang: "en-us") {
	_meta {
		alternateLanguages {
			id,
			uid,
			type,
			lang
		}
	}
}`;