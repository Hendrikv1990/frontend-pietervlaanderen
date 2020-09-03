import {fetchGql} from '../prismicHelpers';
import {gql} from '@apollo/client';
import {queryAllAvailablePages as allYachts} from './yacht';
import {queryAlternateLangs as homePage} from './homePage';
import {queryAlternateLangs as aboutPage} from './aboutPage';
import {queryAlternateLangs as blogPage} from './blogPage';
import {queryAllAvailablePosts as blogPosts} from './blogPost';
import {queryAlternateLangs as charterPage} from './charterPage'
import {queryAlternateLangs as contactsPage} from './contactsPage'
import {queryAlternateLangs as dealersPage} from './dealers'
import {queryAllAvailablePages as jobPositionPage} from './jobPositionPage'
import {queryAlternateLangs as jobsPage} from './jobsPage'
import {queryAlternateLangs as propulsionPage} from './propulsion';
import {queryAlternateLangs as solarPage} from './solar';

export async function fetchSitemapData() {
	const result = await fetchGql(
		gql(`query {${query}}`)
	);

	return result;
}

const query = `
${allYachts}
${homePage}
${aboutPage}
${blogPage}
${blogPosts}
${charterPage}
${contactsPage}
${dealersPage}
${jobPositionPage}
${jobsPage}
${propulsionPage}
${solarPage}
`;

