// import queryString from 'query-string';
// import _omit from 'lodash/omit';
import formUrlDecoded from 'form-urldecoded';

export default function parseContactsQueryParams(){
	const parsedQuery = formUrlDecoded(window.location.search);
	// const params = Object.assign(_omit(parsedQuery, ['models[]']), {
	// const params = Object.assign(_omit(parsedQuery, ['models[]']), {
	// 	models: Array.isArray(parsedQuery['models[]']) ? parsedQuery['models[]'] : []
	// });

	return parsedQuery;
}