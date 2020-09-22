import {useEffect, useState} from 'react';
import {textLabelsPropType} from '../../../../propTypes/textLabels';
import {menusPropType} from '../../../../propTypes/menu';
import {contactsPagePropType} from '../../../../propTypes/contacts';
import {fetchContactsPage, fetchStaticPaths} from '../../../../lib/services/contactsPage';
import {fetchLayoutData} from '../../../../lib/services/layoutData';
import Head from 'next/head';
import MainLayout from '../../../../layouts/Main';
import TopNarrowCoverWithGradient from '../../../../components/covers/TopNarrowWithGradient';
import {useAppData} from '../../../../hooks/appData';
import TeamList from '../../../../components/lists/Team';
import AboutYouForm from '../../../../components/pages/contacts/AboutYouForm';
import parseContactsQueryParams from '../../../../lib/contactsQueryParams';
import SubscriptionForm from '../../../../components/pages/contacts/SubscriptionForm';
import ProgressBar from '../../../../components/pages/contacts/ProgressBar';

export default function ContactsYachtYourContactsPage({contactsPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const [queryParams, setQueryParams] = useState({});
	useEffect(() => setQueryParams(parseContactsQueryParams()), []);

	return (
		<>
			<Head>
				<title>{textLabels.little_bit_about_you}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<MainLayout isWhite={true} extraClasses={'contacts-page-yacht about-you'}>
				<TopNarrowCoverWithGradient>
					<div className={'container'}>
						<div className={'show_md'}>
							<ProgressBar steps={4} current={4} />
						</div>
						<h1 className={'head'}>{textLabels.little_bit_about_you}</h1>
					</div>
				</TopNarrowCoverWithGradient>
				<div className={'container'}>
					<AboutYouForm queryParams={queryParams}
												models={contactsPage.models}
					/>
					<h2 className={'meet-the-team'}>{textLabels.meet_the_team}</h2>
					<TeamList team={contactsPage.team} />
				</div>
				<SubscriptionForm />
			</MainLayout>
		</>
	);
}

ContactsYachtYourContactsPage.propTypes = {
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