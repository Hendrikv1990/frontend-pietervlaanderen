import {useAppData} from '../../../hooks/appData';
import Head from 'next/head';
import {RichText} from 'prismic-reactjs';
import _isEmpty from 'lodash/isEmpty';
import MainLayout from '../../../layouts/Main';
import {jobPositionPropType} from '../../../propTypes/jobs';
import {menusPropType} from '../../../propTypes/menu';
import {textLabelsPropType} from '../../../propTypes/textLabels';
import {fetchStaticPaths, fetchJobPositionPage} from '../../../lib/services/jobPositionPage';
import {fetchLayoutData} from '../../../lib/services/layoutData';
import TopNarrowSection from '../../../components/covers/TopNarrowSection';
import AsText from '../../../components/AsText';
import ResolvedHtmlField from '../../../components/ResolvedHtmlField';

export default function JobPositionPage({jobPositionPage, menus, textLabels}) {
	const {setAppData} = useAppData();
	setAppData(textLabels, menus);

	return (
		<>
			<Head>
				<title>{jobPositionPage.seo_title || RichText.asText(jobPositionPage.title)}</title>
				{!_isEmpty(jobPositionPage.seo_meta_description) &&
				<meta name={'Description'} content={jobPositionPage.seo_meta_description} />
				}
			</Head>
			<MainLayout isWhite={true}>
				<TopNarrowSection title={jobPositionPage.title}
													subTitle={jobPositionPage.country}
													className={'for-job-page'}
				/>
				<section className={'job-position-text'}>
					<div className="container">
						<div className="rich-text">
							<ResolvedHtmlField content={jobPositionPage.full_description} />
						</div>
					</div>
				</section>
				<section className={'job-how-to-apply'}>
					<div className="container">
						<h3 className={'how-to-title'}>
							<AsText value={jobPositionPage.how_to_apply} />
						</h3>
						<div className={'instructions no-last-margin'}>
							<ResolvedHtmlField content={jobPositionPage.apply_instructions} />
						</div>
					</div>
				</section>
			</MainLayout>
		</>
	);
}

JobPositionPage.propTypes = {
	jobPositionPage: jobPositionPropType().isRequired,
	menus: menusPropType().isRequired,
	textLabels: textLabelsPropType().isRequired,
};

export async function getStaticProps(context) {
	const jobPositionPage = await fetchJobPositionPage(context.params.slug, context)
	const {menus, textLabels} = await fetchLayoutData(context);

	return {
		props: {
			jobPositionPage,
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