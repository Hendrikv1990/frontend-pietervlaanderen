import {textLabelsPropType} from '../../../propTypes/textLabels';
import {menusPropType} from '../../../propTypes/menu';
import {contactsPagePropType} from '../../../propTypes/contacts';
import {fetchContactsPage, fetchStaticPaths} from '../../../lib/services/contactsPage';
import {fetchLayoutData} from '../../../lib/services/layoutData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../../layouts/Main';
import TopNarrowCoverWithGradient from '../../../components/covers/TopNarrowWithGradient';
import {useAppData} from '../../../hooks/appData';
import ModelsForm from '../../../components/pages/contacts/ModelsForm';
import TeamList from '../../../components/lists/Team';

export default function ContactsYachtPage({contactsPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				<title>{textLabels.which_model_suits_you_best}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<MainLayout isWhite={true} extraClasses={'contacts-page-yacht'}>
				<TopNarrowCoverWithGradient>
					<div className={'container'}>
						<h1 className={'head'}>{textLabels.which_model_suits_you_best}</h1>
					</div>
				</TopNarrowCoverWithGradient>
				{!_isEmpty(contactsPage.models) &&
				<ModelsForm models={contactsPage.models} />
				}
				<div className={'container'}>
					<h2 className={'meet-the-team'}>{textLabels.meet_the_team}</h2>
					<TeamList team={contactsPage.team} />
				</div>
			</MainLayout>
		</>
	);
}

ContactsYachtPage.propTypes = {
	textLabels: textLabelsPropType().isRequired,
	menus: menusPropType().isRequired,
	contactsPage: contactsPagePropType().isRequired,
};

export async function getStaticProps(context) {
	const contactsPage = await fetchContactsPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			contactsPage,
			menus,
			textLabels
		}
	};
}

export async function getStaticPaths() {
	return {
		paths: await fetchStaticPaths(),
		fallback: false
	};
}