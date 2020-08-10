import queryString from 'query-string';
import _omit from 'lodash/omit';

export default function parseContactsQueryParams(){
	const parsedQuery = queryString.parse(window.location.search);
	const params = Object.assign(_omit(parsedQuery, ['models[]']), {
		models: Array.isArray(parsedQuery['models[]']) ? parsedQuery['models[]'] : []
	});

	return params;
}