import Head from 'next/head';
import {fetchContactsPage, fetchStaticPaths} from '../../lib/services/contactsPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import MainLayout from '../../layouts/Main';
import {contactsPagePropType} from '../../propTypes/contacts';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {menusPropType} from '../../propTypes/menu';
import {useAppData} from '../../hooks/appData';
import {RichText} from 'prismic-reactjs';
import _isEmpty from 'lodash/isEmpty';
import TopNarrowCoverWithGradient from '../../components/covers/TopNarrowWithGradient';
import TeamList from '../../components/lists/Team';
import MainOfficeForm from '../../components/pages/contacts/MainOfficeForm';
import NextLink from 'next/link';
import {useTranslation} from '../../components/Locale';
import {scrollToElement} from '../../lib/scrollToElement';
import SubscriptionForm from '../../components/pages/contacts/SubscriptionForm';

export default function ContactsPage({contactsPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	const {locale} = useTranslation();
	setAppData(textLabels, menus);

	const teamBeforeForm = contactsPage.team.filter(({position_in_list}) => position_in_list == 'Before the form');
	const teamAfterForm = contactsPage.team.filter(({position_in_list}) => position_in_list == 'After the form');

	const scrollToMainOfficeForm = (e) => {
		e.preventDefault();
		scrollToElement('.main-office-form');
	};

	return (
		<>
			<Head>
				{!_isEmpty(contactsPage.seo_title) &&
				<title>{RichText.asText(contactsPage.seo_title)}</title>
				}
				{!_isEmpty(contactsPage.seo_meta_description) &&
				<meta name={'Description'} content={RichText.asText(contactsPage.seo_meta_description)} />
				}
			</Head>
			<MainLayout isWhite={true} extraClasses={'contacts-page'}>
				<TopNarrowCoverWithGradient>
					<div className={'container'}>
						<h1 className={'head'}>{textLabels.how_can_we_help}</h1>
						<div className={'btns-row'}>
							<NextLink href='/[lang]/contacts/yacht' as={`/${locale}/contacts/yacht`}>
								<a className="btn btn_border_stretched">
									{textLabels.interested_in_a_new_boat}
								</a>
							</NextLink>
							<a href={'#'}
								 className={'btn btn_border_stretched'}
								 onClick={scrollToMainOfficeForm}
							>
								{textLabels.looking_for_assistance}
							</a>
							<a href={'#'}
								 className={'btn btn_border_stretched'}
								 onClick={scrollToMainOfficeForm}
							>
								{textLabels.i_m_a_greenline_owner}
							</a>
						</div>
					</div>
				</TopNarrowCoverWithGradient>
				<div className={'container'}>
					<h2 className={'meet-the-team'}>{textLabels.meet_the_team}</h2>
					<TeamList team={teamBeforeForm} className={'hide_md'} />
					<TeamList team={contactsPage.team} className={'hide_up_lg'} />
					<MainOfficeForm title={textLabels.main_office} />
					<TeamList team={teamAfterForm} className={'hide_md'} />
				</div>
				<SubscriptionForm />
			</MainLayout>
		</>
	);
}

ContactsPage.propTypes = {
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