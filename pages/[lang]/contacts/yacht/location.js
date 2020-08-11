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
import {createGetStr} from '../../../../lib/utils';
import HintAboutLocationForm from '../../../../components/pages/contacts/HintAboutLocationForm';
import {useTranslation} from '../../../../components/Locale';
import {useRouter} from 'next/router';
import parseContactsQueryParams from '../../../../lib/contactsQueryParams';
import SubscriptionForm from '../../../../components/pages/contacts/SubscriptionForm';
import ProgressBar from '../../../../components/pages/contacts/ProgressBar';

export default function ContactsYachtLocationPage({contactsPage, menus, textLabels}) {
	const router = useRouter();
	const {locale} = useTranslation();
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	const [queryParams, setQueryParams] = useState({});
	useEffect(() => {
		setQueryParams(parseContactsQueryParams());
	}, []);

	function onFormSubmit(values) {
		const as = `/${locale}/contacts/yacht/your-contacts?${createGetStr({
			models: queryParams.models,
			...values
		})}`;
		router.push('/[lang]/contacts/yacht/your-contacts', as);
	}

	return (
		<>
			<Head>
				<title>{textLabels.hint_about_your_location}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<MainLayout isWhite={true} extraClasses={'contacts-page-yacht hint-about-location'}>
				<TopNarrowCoverWithGradient>
					<div className={'container'}>
						<div className={'show_md'}>
							<ProgressBar steps={4} current={3} />
						</div>
						<h1 className={'head'}>{textLabels.hint_about_your_location}</h1>
					</div>
				</TopNarrowCoverWithGradient>
				<div className={'container'}>
					<HintAboutLocationForm queryParams={queryParams}
																 onSubmit={onFormSubmit}
					/>
					<h2 className={'meet-the-team'}>{textLabels.meet_the_team}</h2>
					<TeamList team={contactsPage.team} />
				</div>
				<SubscriptionForm />
			</MainLayout>
		</>
	);
}

ContactsYachtLocationPage.propTypes = {
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