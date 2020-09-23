import {useAppData} from '../../hooks/appData';
import Head from 'next/head';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../layouts/Main';
import {jobsPagePropType} from '../../propTypes/jobs';
import {menusPropType} from '../../propTypes/menu';
import {textLabelsPropType} from '../../propTypes/textLabels';
import {fetchStaticPaths, fetchJobsPage} from '../../lib/services/jobsPage';
import {fetchLayoutData} from '../../lib/services/layoutData';
import JobsList from '../../components/pages/jobs/JobsList';
import SubscriptionForm from '../../components/pages/contacts/SubscriptionForm';
import CoverNarrow from '../../components/covers/CoverNarrow';
import Footer from '../../components/Footer';

export default function JobsPage({jobsPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				{!_isEmpty(jobsPage.seo_title) &&
				<title>{jobsPage.seo_title}</title>
				}
				{!_isEmpty(jobsPage.seo_meta_description) &&
				<meta name={'Description'} content={jobsPage.seo_meta_description} />
				}
			</Head>
			<MainLayout>
				<CoverNarrow block={{
					image: jobsPage.header_image,
					title: jobsPage.title,
					text: jobsPage.sub_title,
				}} />
				<JobsList positions={jobsPage.positions} />
				<SubscriptionForm />

				<Footer />
			</MainLayout>
		</>
	);
}

JobsPage.propTypes = {
	jobsPage: jobsPagePropType().isRequired,
	menus: menusPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
};

export async function getStaticProps(context) {
	const jobsPage = await fetchJobsPage(context);
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			jobsPage,
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